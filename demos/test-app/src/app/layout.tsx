import type { Metadata } from 'next'
import Link from 'next/link'
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";

export const metadata: Metadata = {
  title: 'University Explorer',
  description: 'Explore universities with ease',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: 'University Explorer',
    description: 'Explore universities with ease',
    type: 'website'
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class">
          <nav className="w-full bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-lg font-bold hover:opacity-80 transition-opacity">
                University Explorer
              </Link>
              <div className="space-x-4">
                <Link 
                  href="/" 
                  className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}