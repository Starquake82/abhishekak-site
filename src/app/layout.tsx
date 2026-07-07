import type { Metadata } from 'next'
import { Fraunces, Geist, JetBrains_Mono, Anton } from 'next/font/google'
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

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Abhishek Kininge — Independent BA & BI Consultant',
  description:
    'Independent BA & BI Consultant · 15+ years across government analytics (₹855L project), BFSI & manufacturing · Power BI, process improvement, AI-augmented delivery · Pune, India · open to remote.',
  keywords: [
    'business analyst', 'BI consultant', 'Power BI consultant India',
    'business analyst Pune', 'process improvement consultant',
    'AI-augmented delivery', 'BA consultant remote', 'data analytics consultant',
    'requirements elicitation', 'Power BI dashboard', 'independent consultant',
  ],
  openGraph: {
    title: 'Abhishek Kininge — Independent BA & BI Consultant',
    description:
      'Independent BA & BI Consultant · 15+ years across government analytics (₹855L project), BFSI & manufacturing · Power BI, process improvement, AI-augmented delivery · Pune, India · open to remote.',
    url: 'https://abhishekak.site',
    siteName: 'abhishekak.site',
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Kininge — BA & BI Consultant',
    description: 'BA · BI · AI-augmented delivery · 15+ years · Pune, India · open to remote',
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
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable} ${anton.variable}`}
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
