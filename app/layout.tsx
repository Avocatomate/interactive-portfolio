import type { Metadata } from 'next'
import { Syne, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-outfit',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Raymond Borja — AI Automation Specialist',
  description:
    'AI-powered interactive portfolio. Ask me anything about my automation projects, skills, and how I can help your business run on autopilot.',
  openGraph: {
    title: 'Raymond Borja — AI Automation Specialist',
    description: 'Interactive AI portfolio — built with n8n, OpenAI, and a lot of automation love.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  )
}
