'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const handleAccordionChange = (value: string) => {
    setActiveAccordion(value === activeAccordion ? null : value);
  };

  return (
    <div className="justify-center items-center flex h-screen">
      <a>Demo</a>
    </div>
  );
}