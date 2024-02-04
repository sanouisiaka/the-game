import './globals.scss'
import type { Metadata } from 'next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// @ts-ignore
import { getServerSession } from 'next-auth'
import ClientProvider from '@/components/auth/client-provider'
import { config } from '@fortawesome/fontawesome-svg-core'
import ReduxProvider from '@/components/ReduxProvider'
import Header from '@/components/header';

config.autoAddCss = false



export const metadata: Metadata = {
  title: 'Bet Them All',
  description: 'Bet Them All, the new social betting app ! Join us !',
}

export default async function RootLayout({ children }: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className="h-screen min-w-full overflow-hidden">
      <body className="w-full h-full">
        <script src="https://accounts.google.com/gsi/client" async></script>
        <div className="h-1/6">
          <Header/>
        </div>
        <ClientProvider session={session}>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
