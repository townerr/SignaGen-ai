'use client';

import React, { useState } from 'react';

interface NameInputProps {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function NameInput({ setImages }: NameInputProps) {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Queue system to process signature generation requests
  const generateSignatures = async (name: string) => {
    setLoading(true);
    setImages([]); // Clear previous images
    setProgress(0);
    
    const totalRequests = 1;
    const results: string[] = [];
    
    for (let i = 0; i < totalRequests; i++) {
      try {
        console.log('Generating signature for: ' + name);
        const response = await fetch('http://127.0.0.1:5000/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ name }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to generate signature (${i+1}/${totalRequests})`);
        }
        
        // Assuming the API returns the image data directly
        const imageData = await response.text();
        results.push(imageData);
        
        // Update progress
        setProgress(Math.round(((i + 1) / totalRequests) * 100));
        // Update images array as each one comes in
        setImages(current => [...current, imageData]);
      } catch (error) {
        console.error(`Error generating signature ${i+1}:`, error);
      }
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
      await generateSignatures(name.trim());
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col space-y-2">
          <div className="flex">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name (e.g. John Doe)"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              className={`${loading ? 'bg-gray-500' : 'bg-[#8B4513] hover:bg-[#6d3610]'} text-white font-bold py-2 px-4 rounded-r-lg transition-colors`}
              disabled={loading}
            >
              Generate
            </button>
          </div>
        </div>
      </form>
      
      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mt-2 transition-opacity duration-300">
          Generating signatures<span className="animate-pulse">...</span>
        </div>
      )}
      
      {loading && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#8B4513] h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="text-sm text-gray-500 mt-1">
        Enter your full name to generate personalized signature designs
      </div>
    </div>
  );
} 