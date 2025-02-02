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
      <body>
        <ThemeProvider attribute="class">
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
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}