'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface PageProps {}

export default function Home({}: PageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Simulate data loading or initialization
    const initializeComponent = async () => {
      try {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load component');
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, []);

  if (error) {
    return (
      <div 
        role="alert" 
        className="min-h-screen bg-destructive/10 text-destructive flex items-center justify-center"
      >
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-background text-foreground flex items-center justify-center"
      aria-label="WebSynth Landing Page"
    >
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "absolute top-[88px] left-[239px] w-[1144px] h-[601px] bg-primary/10 rounded-lg p-8",
          "transition-all duration-300 ease-in-out",
          isHovered ? "shadow-xl scale-[1.02]" : ""
        )}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        role="region"
        aria-describedby="websynth-description"
      >
        <div 
          className="flex flex-col space-y-6 max-w-2xl mx-auto"
          aria-live="polite"
        >
          <h1 
            className="text-5xl font-bold text-primary"
            id="websynth-title"
          >
            WebSynth
          </h1>
          <p 
            className="text-xl text-muted-foreground"
            id="websynth-description"
          >
            WebSynth is an innovative website builder that empowers creators to design stunning, responsive websites with intuitive drag-and-drop technology. Transform your digital vision into reality with our powerful, user-friendly platform.
          </p>
          <div className="flex space-x-4">
            <Button 
              variant="default" 
              size="lg"
              aria-label="Get Started with WebSynth"
              onMouseEnter={(e) => e.currentTarget.focus()}
              className="transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              aria-label="Learn More about WebSynth"
              onMouseEnter={(e) => e.currentTarget.focus()}
              className="transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Learn More
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}