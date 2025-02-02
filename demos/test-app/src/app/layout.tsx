'use client';
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class">
          <nav className="bg-green-500 h-16 w-[1095px] mx-auto flex items-center">
            <Link 
              href="/" 
              className="text-primary-foreground px-4 py-2 hover:bg-green-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/hackathons" 
              className="text-primary-foreground px-4 py-2 hover:bg-green-600 transition-colors"
            >
              Hackathons
            </Link>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}