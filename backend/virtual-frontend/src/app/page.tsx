"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    alert(`You entered: ${inputValue}`);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold mb-4">Shadcn React App</h1>
      <div className="flex space-x-4">
        <Input 
          type="text" 
          placeholder="Enter something..." 
          value={inputValue}
          onChange={handleInputChange}
          className="w-64"
        />
        <Button onClick={handleButtonClick}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default HomePage;