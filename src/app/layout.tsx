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
  title: 'Abhishek Kininge — Independent BA & BI Consultant',
  description:
    'Senior BA & BI Consultant with 15 years across government analytics, BFSI, and manufacturing. Pune, India.',
  keywords: ['independent consultant', 'business analyst', 'BI consultant', 'Power BI', 'data analytics', 'Pune', 'AI-augmented delivery', 'IDDAC'],
  openGraph: {
    title: 'Abhishek Kininge — Independent BA & BI Consultant',
    description: 'Senior BA & BI Consultant with 15 years across government analytics, BFSI, and manufacturing. Pune, India.',
    url: 'https://abhishekak.site',
    siteName: 'abhishekak.site',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Kininge — Independent Consultant',
    description: 'BA · BI · AI · 15+ years · Pune, India',
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
