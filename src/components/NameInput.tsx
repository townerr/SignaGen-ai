'use client';

import React, { useState } from 'react';
import {type Prediction } from 'replicate';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface NameInputProps {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function NameInput({ setImages }: NameInputProps) {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const generateSignatures = async (name: string) => {
    try {
      setLoading(true);
      setProgress(0);

      // Create a prediction and get the result
      const newPrediction = await createPrediction(name);
      
      // Get image from prediction after it's done being created
      const finalPrediction = await getImageFromPrediction(newPrediction);
      
      // If success add to images array
      if (finalPrediction?.status === "succeeded") {
        const image = finalPrediction.output as string;
        setImages((prev) => [...prev, image]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error generating signatures:", error);
      return false;
    }
  };

  const createPrediction = async (name: string): Promise<Prediction> => {
    const response = await fetch('/api/predictions', {
      method: 'POST',
      body: JSON.stringify({ prompt: `You are a calligraphy artist. Choose a random style to create a handwritten signature for someones full name. Make sure there is a white background with only the signature with black font color. Create a signature for the name: ${name}` }),
    });

    // Set initial prediction data and return it
    const data = await response.json() as Prediction;
    setPrediction(data);
    return data;
  }

  const getImageFromPrediction = async (initialPrediction: Prediction): Promise<Prediction> => {
    let currentPrediction = initialPrediction;
    
    while (currentPrediction?.status !== "succeeded" && currentPrediction?.status !== "failed") {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + currentPrediction?.id, { cache: 'no-store' });
      
      if (response.status !== 200) {
        const data = await response.json() as Prediction;
        console.log("ERROR: ", data.error as string);
        throw new Error(data.error as string);
      }
      
      const data = await response.json() as Prediction;
      console.log({ data });
      currentPrediction = data;
      setPrediction(data);
      
      // Update progress based on prediction status (optional enhancement)
      if (data.status === "processing") {
        setProgress(50); // Set to halfway when processing
      }
    }
    
    // Set progress to 100% when complete
    if (currentPrediction.status === "succeeded") {
      setProgress(100);
    }
    
    return currentPrediction;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
      setLoading(true);
      setImages([]); // Clear previous images
      
      // Generate 6 signatures sequentially
      let successCount = 0;
      for (let i = 0; i < 6; i++) {
        try {
          const success = await generateSignatures(name.trim());
          if (success) {
            successCount++;
          }
          // Update overall progress (each signature is ~16.7% of total progress)
          setProgress(Math.round(((i + 1) / 6) * 100));
        } catch (error) {
          console.error(`Error generating signature ${i+1}:`, error);
        }
      }
      
      setLoading(false);
      setTimeout(() => setSubmitted(false), 2000);
      
      if (successCount === 0) {
        console.error("Failed to generate any signatures");
      }
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