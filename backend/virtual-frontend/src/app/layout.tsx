import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <nav className="w-full bg-background border-b">
          <div className="container mx-auto px-4 py-4 flex justify-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/events">Events</Link>
            </Button>
          </div>
        </nav>
        <main className="flex-grow container mx-auto px-4">
          <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}