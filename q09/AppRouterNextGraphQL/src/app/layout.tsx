import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloWrapper } from '../../lib/apollo-wrapper'

export const metadata: Metadata = {
  title: 'GraphQL next app',
  description: 'An app to show how to use GraphQL with Next.js and app directory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>  
      </body>
    </html>
  )
}
