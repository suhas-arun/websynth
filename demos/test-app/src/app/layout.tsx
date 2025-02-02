'use client';
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/providers/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class">
          <header className="w-full">
            <nav className="flex justify-center items-center space-x-4 p-4 bg-primary text-primary-foreground">
              <Link href="/" className="hover:underline">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link href="/cats" className="hover:underline">
                <Button variant="ghost">Cats</Button>
              </Link>
              <Link href="/dogs" className="hover:underline">
                <Button variant="ghost">Dogs</Button>
              </Link>
              <Link href="/marvin" className="hover:underline">
                <Button variant="ghost">Marvin Cheese</Button>
              </Link>
            </nav>
          </header>
          
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          
          <footer className="w-full bg-secondary text-secondary-foreground p-4 text-center">
            © {new Date().getFullYear()} Animal Lovers App. All rights reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}