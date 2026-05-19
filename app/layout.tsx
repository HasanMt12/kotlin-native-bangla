import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'কটলিন শেখার প্ল্যাটফর্ম | Kotlin Learning Platform',
  description: 'বাংলায় Kotlin প্রোগ্রামিং শিখুন - Step by step tutorials, problems, solutions',
 
  icons: {
    icon: [
      {
        url: '/HasanMahmud-dark.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/HasanMahmud-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/HasanMahmud.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
