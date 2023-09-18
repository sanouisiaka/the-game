import NextAuth, { SessionStrategy } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_SECRET as string
    })
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    async session({ session, token }:any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.id_token = token.id_token

      return session
    },
    async jwt({ token, account }: any) {
      console.log('token')
      console.log(token)
      console.log('account');
      console.log(account);
      if(account){
        token.id_token = account.id_token
      }

      return token;


    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


// export default async function auth(req: NextApiRequest, res: NextApiResponse, authOptions) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, {
//   })
// }