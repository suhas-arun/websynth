'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* Positioned Button */}
      <Button 
        className="absolute bg-yellow-500 hover:bg-green-500 text-black"
        style={{
          top: '222px',
          left: '258px',
          height: '207px',
          width: '239px'
        }}
      >
        Hackathon Button
      </Button>

      {/* Imperial Link Button */}
      <Link href="/imperial">
        <Button 
          className="absolute bg-primary text-primary-foreground hover:bg-primary/90"
          style={{
            top: '50px',
            right: '50px',
            height: '60px',
            width: '150px'
          }}
        >
          Go to Imperial
        </Button>
      </Link>

      {/* Positioned Accordion */}
      <Accordion 
        type="single" 
        collapsible 
        className="absolute w-[727px] h-[300px]"
        style={{
          top: '209px',
          left: '740px'
        }}
      >
        <AccordionItem value="what-are-hackathons">
          <AccordionTrigger>What are Hackathons?</AccordionTrigger>
          <AccordionContent>
            Hackathons are intensive innovation events where tech professionals collaborate to create software solutions within a limited timeframe.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="benefits">
          <AccordionTrigger>Benefits of Hackathons</AccordionTrigger>
          <AccordionContent>
            Hackathons offer networking opportunities, skill development, portfolio building, and potential job prospects.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="types">
          <AccordionTrigger>Types of Hackathons</AccordionTrigger>
          <AccordionContent>
            Includes corporate hackathons, educational hackathons, social impact hackathons, and online/virtual hackathons.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="tips">
          <AccordionTrigger>Tips for Success</AccordionTrigger>
          <AccordionContent>
            Form diverse teams, plan ahead, focus on innovation, practice pitching, and be open to learning.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}