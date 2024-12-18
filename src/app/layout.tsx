import { GeistSans } from 'geist/font/sans'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import dotenv from 'dotenv'

dotenv.config()
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Reconciliation Road Challenge',
  description: 'A fresh adventure begins!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={GeistSans.className}
      style={{ colorScheme: 'light' }}
    >
      <body className="bg-background text-foreground">
        <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
        <ReactQueryProvider>
          <main className="flex min-h-screen flex-col items-center">
            {children}
            <Analytics />{' '}
          </main>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
