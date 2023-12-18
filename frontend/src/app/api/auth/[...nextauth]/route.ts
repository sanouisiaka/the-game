import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { googleRepository } from '@/rest/google.repository'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }:any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.id_token = token.id_token

      return session
    },
    async jwt({ token, account }: any) {
      if(account){
        token.id_token = account.id_token;
        token.expires_at = Math.floor(Date.now() / 1000 + account.expires_in);
        token.refresh_token = account.refresh_token;
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token
      } else {
        // https://accounts.google.com/.well-known/openid-configuration
        // We need the `token_endpoint`.
        await googleRepository.getNewToken(token.refresh_token)
          .then((res) => {
            token.id_token = res.data.id_token;
            token.expires_at = Math.floor(Date.now() / 1000 + res.data.expires_in);
          })
          .catch(() => console.log("ERR IN REFRESHING TOKEN"));

      }

      return token;


    }
  }
}

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }