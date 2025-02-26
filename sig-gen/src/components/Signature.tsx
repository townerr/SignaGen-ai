import React from "react";
import Image from "next/image";
interface SignatureProps {
  image: string;
}

export default function Signature({ image }: SignatureProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <Image src={image} alt="Signature" className="w-full h-auto" />
    </div>
  );
} 