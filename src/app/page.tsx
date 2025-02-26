'use client';

import SignatureGrid from "~/components/SignatureGrid";
import NameInput from "~/components/NameInput";
import { useState } from "react";

export default function HomePage() {
  const [images, setImages] = useState<string[]>([]);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] text-gray-800">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <h1 className="text-5xl font-semibold font-dynapuff tracking-tight text-gray-800 sm:text-[5rem]">
          Signa<span className="text-[#8B4513]">Gen</span>-ai
          <span className="blink">.</span>
        </h1>
        <h2 className="text-2xl font-dynapuff tracking-tight text-gray-800 sm:text-[2rem]">
          Generate your new signature today!
        </h2>
        <NameInput setImages={setImages} />
        <SignatureGrid images={images} />
      </div>
    </main>
  );
}

