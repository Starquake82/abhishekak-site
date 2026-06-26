import type { Metadata } from 'next'
import { Fraunces, Geist, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import Cursor from '@/components/Cursor'
import Preloader from '@/components/Preloader'
import { PreloaderProvider } from '@/components/PreloaderContext'

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Abhishek Anil Kininge — Sr. BA & BI Hybrid',
  description:
    '15 years of structured diagnosis across government analytics, BFSI, and specialty ingredients. BA/BI hybrid based in Pune.',
  keywords: ['business analyst', 'BI analyst', 'power BI', 'data analytics', 'Pune'],
  openGraph: {
    title: 'Abhishek Anil Kininge — Sr. BA & BI Hybrid',
    description: '15 years of structured diagnosis. BA/BI hybrid. Pune, India.',
    url: 'https://abhishekak.site',
    siteName: 'abhishekak.site',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Anil Kininge',
    description: 'Sr. BA & BI Hybrid · Pune · 15 years',
  },
  metadataBase: new URL('https://abhishekak.site'),
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <PreloaderProvider>
          <LenisProvider>
            <Cursor />
            <Preloader />
            {children}
          </LenisProvider>
        </PreloaderProvider>
      </body>
    </html>
  )
}
