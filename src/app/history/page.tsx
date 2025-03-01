'use client';

import { useEffect, useState } from "react";
import { authClient } from "~/utils/auth-client";
import Signature from "~/components/Signature";
import Footer from "~/components/Footer";
import { Button } from "~/components/ui/button";

interface SignatureData {
  id: string;
  userId: string;
  image: string;
}

export default function HistoryPage() {
  const { data } = authClient.useSession();
  const [signatures, setSignatures] = useState<SignatureData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (data?.user?.id) {
      fetchSignatures(data.user.id);
    }
  }, [data?.user?.id]);

  const fetchSignatures = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/predictions/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch signatures');
      }
      const data = await response.json();
      // Reverse the array to show newest items first
      setSignatures(data.reverse());
    } catch (error) {
      console.error('Error fetching signatures:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(signatures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSignatures = signatures.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!data?.user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] text-gray-800">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 flex-grow">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-800">
            Please log in to view your signature history
          </h1>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] text-gray-800">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 flex-grow">
        <h1 className="text-4xl font-semibold font-dynapuff tracking-tight text-gray-800">
          Your Signature History
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8B4513]"></div>
          </div>
        ) : signatures.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-dynapuff text-gray-700">
              You haven't created any signatures yet
            </h2>
            <p className="mt-4 text-gray-600">
              Head back to the homepage to create your first signature!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto justify-items-center w-full">
              {currentSignatures.map((signature) => (
                <Signature 
                  key={signature.id}
                  image={signature.image}
                />
              ))}
            </div>
            
            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 mt-8">
                <Button 
                  onClick={goToPreviousPage} 
                  disabled={currentPage === 1}
                  className="bg-[#8B4513] text-white hover:bg-[#6B3003] disabled:opacity-50"
                >
                  Previous
                </Button>
                <span className="text-lg font-dynapuff">
                  Page {currentPage} of {totalPages}
                </span>
                <Button 
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages}
                  className="bg-[#8B4513] text-white hover:bg-[#6B3003] disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
