'use client';
import React from 'react';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center">
      <div 
        className="absolute flex items-center justify-center text-center"
        style={{ 
          left: '250px', 
          top: '134px', 
          height: '82px', 
          width: '1053px' 
        }}
      >
        <h1 className="text-5xl font-bold text-gray-800">
          Welcome to Hackathon Central
        </h1>
      </div>

      {/* Text Body Component */}
      <div 
        className="absolute flex items-center justify-center p-6 bg-white rounded-lg shadow-md"
        style={{ 
          left: '274px', 
          top: '276px', 
          height: '423px', 
          width: '1015px' 
        }}
      >
        <p className="text-lg text-gray-700 text-left">
          Hackathons are intensive, collaborative events where innovators, 
          developers, and creators come together to solve complex challenges 
          and build groundbreaking solutions. Whether you're a seasoned 
          programmer or a passionate beginner, hackathons offer a unique 
          platform to learn, innovate, and transform ideas into reality.

          Our community provides a supportive environment where creativity 
          meets technology. Join us to network with like-minded individuals, 
          push your technical boundaries, and potentially create the next 
          big technological breakthrough.
        </p>
      </div>
    </div>
  );
}