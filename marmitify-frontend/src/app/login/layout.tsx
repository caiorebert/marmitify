"use client"

import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { SessionProvider } from 'next-auth/react'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </body>
      </html>
    
  )
}
