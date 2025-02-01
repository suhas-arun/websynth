'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome to Our Website</h1>
        <Button variant="secondary" className="bg-orange-500 hover:bg-orange-600 text-white">
          Bin James
        </Button>
      </div>
      <Link href="/hello-sid">
        <Button>Go to Hello Sid Page</Button>
      </Link>
    </div>
  )
}