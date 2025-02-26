'use client';

import React, { useState } from 'react';

export default function NameInput() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
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
            />
            <button
              type="submit"
              className="bg-[#8B4513] hover:bg-[#6d3610] text-white font-bold py-2 px-4 rounded-r-lg transition-colors"
            >
              Generate
            </button>
          </div>
        </div>
      </form>
      
      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mt-2 transition-opacity duration-300">
          Name submitted successfully!
        </div>
      )}
      
      <div className="text-sm text-gray-500 mt-1">
        Enter your full name to generate personalized signature designs
      </div>
    </div>
  );
} 