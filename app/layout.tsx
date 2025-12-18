import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import '@/styles/globals.css'
import { Poppins } from 'next/font/google'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Gyan Sanchar',
  description: 'Find college and course information in India',
}

import { AuthProvider } from '@/contexts/auth/AuthContext'
// import Header from '@/components/common/Header'
// import  Footer  from '@/components/common/Footer'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo-b.png" type="image/x-icon" />
      </head>
      <body className={`${font.className}`}>
        <AuthProvider>
          {/* <Header /> */}
          {children}
          <Toaster  />
          {/* <Footer /> */}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
