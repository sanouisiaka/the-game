import NextAuth, { SessionStrategy } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions = {
  secret: process.env.NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_SECRET as string
    })
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


// export default async function auth(req: NextApiRequest, res: NextApiResponse, authOptions) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, {
//   })
// }