import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import '@/styles/globals.css'
import { Poppins } from 'next/font/google'
import { AuthProvider } from '@/contexts/auth/AuthContext'
import { Toaster } from '@/components/ui/toaster'
import GoogleTranslate from '@/components/common/GoogleTranslate'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Gyan Sanchar',
  description: 'Find college and course information in India',
}

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

          {children}
          <Toaster />

        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
