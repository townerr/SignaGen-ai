import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GithubLogo from '../../public/github-mark.svg';

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-8 bg-[#8B4513]">
      <div className="container mx-auto px-4 flex flex-col justify-center items-center">
        <p className="text-white text-sm">
          Made by{' '}
          <Link 
            href="https://github.com/townerr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white font-medium hover:font-bold transition-all duration-300"
          >
            Ryan Towner
          </Link>
        </p>
        <p className="text-white text-sm pt-2">
          <Link 
            href="https://github.com/townerr/SignaGen-ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-[#6d3610] font-medium underline"
          >
            <Image src={GithubLogo as string} alt="Github Logo" width={24} height={24} className="hover:scale-110 transition-all duration-300" />
          </Link>
        </p>
      </div>
    </footer>
  );
}
