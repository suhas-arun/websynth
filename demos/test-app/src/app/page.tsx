'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface PageProps {}

export default function Home({}: PageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-primary"
        >
          Elevate Your Performance
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
        >
          Unleash Your Potential through Exceptional Leadership and Strategic Excellence
        </motion.p>
      </header>

      {/* Content Grid */}
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary">Michael Jordan</CardTitle>
              <CardDescription>The Greatest Basketball Player of All Time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-card-foreground">
                Michael Jordan, known as MJ, revolutionized basketball with his extraordinary skills, 
                winning six NBA championships with the Chicago Bulls. His incredible athleticism, 
                competitive spirit, and global impact made him a sports icon and cultural phenomenon.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-4"
        >
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Explore Leadership Strategy
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary/10"
          >
            Learn More About Excellence
          </Button>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-primary">
            Our Core Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To empower individuals and organizations to transcend limitations, 
            achieve unprecedented success, and create lasting impact through 
            innovative strategies and unwavering commitment to excellence.
          </p>
        </motion.div>
      </section>
    </div>
  );
}