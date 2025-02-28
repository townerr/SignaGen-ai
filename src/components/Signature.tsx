import React, { useState } from "react";
import Image from "next/image";

interface SignatureProps {
  image: string;
}

export default function Signature({ image }: SignatureProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow max-w-[256px] max-h-[256px] cursor-pointer"
        onClick={openModal}
      >
        <Image src={image.toString()} alt="Signature" width={512} height={512} className="w-full h-auto" />
      </div>

      {/* Full size image modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-lg p-2" onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button 
              className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              onClick={closeModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Full size image */}
            <div className="h-full w-full flex items-center justify-center">
              <Image 
                src={image.toString()} 
                alt="Signature Full Size" 
                width={1024} 
                height={1024} 
                className="max-w-full max-h-[85vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 