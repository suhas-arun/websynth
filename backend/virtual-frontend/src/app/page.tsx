'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <Card 
        className="absolute bg-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-300" 
        style={{ 
          left: '246px', 
          top: '230px', 
          height: '303px', 
          width: '394px' 
        }}
      >
        <CardHeader>
          <CardTitle className="text-primary">Adorable Cats</CardTitle>
          <CardDescription>Discover the world of cute and cuddly feline friends</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Learn about different cat breeds, their personalities, and care tips.</p>
          <Button className="w-full hover:bg-primary/90">Learn More</Button>
        </CardContent>
      </Card>

      <Card 
        className="absolute bg-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-300" 
        style={{ 
          left: '769px', 
          top: '234px', 
          height: '297px', 
          width: '416px' 
        }}
      >
        <CardHeader>
          <CardTitle className="text-primary">Lovable Dogs</CardTitle>
          <CardDescription>Explore the wonderful world of canine companions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Discover various dog breeds, training techniques, and pet care.</p>
          <Button className="w-full hover:bg-primary/90">Learn More</Button>
        </CardContent>
      </Card>
    </div>
  );
}