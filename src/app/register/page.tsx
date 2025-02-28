"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login?tab=register");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f0e5] p-4">
      <div className="text-center font-dynapuff text-[#8B4513]">
        <h1 className="text-2xl">Redirecting to registration form...</h1>
        <p className="mt-2">If you are not redirected, <a href="/login?tab=register" className="underline">click here</a>.</p>
      </div>
    </div>
  );
} 