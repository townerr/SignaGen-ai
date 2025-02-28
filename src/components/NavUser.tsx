"use client"

import { authClient } from '~/utils/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "~/components/ui/dropdown-menu"
import Link from 'next/link'

const NavUser = () => {
    const { data } = authClient.useSession();

    return (
        <nav className="w-full bg-[#8B4513] shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo and brand name */}
                <div className="flex items-center">
                    <Link href="/" className="text-white text-2xl font-dynapuff hover:scale-105 transition-all">
                        SignaGen
                    </Link>
                </div>

                {/* User authentication section */}
                <div className="flex items-center space-x-3">
                    {!data?.user ? (
                        <>
                            <Button asChild className="bg-white text-[#8B4513] rounded-xl hover:bg-white/80 hover:scale-105 transition-all font-dynapuff font-thin">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="bg-white text-[#8B4513] rounded-xl hover:bg-white/80 hover:scale-105 transition-all font-dynapuff font-thin">
                                <Link href="/login?tab=register">Register</Link>
                            </Button>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <div className="flex items-center space-x-2">
                                    <span className="text-white hidden md:inline-block">
                                        {data.user.name || 'User'}
                                    </span>
                                    <Avatar className="h-9 w-9 border-2 border-white">
                                        <AvatarImage src={data.user.image as string} alt={data.user.name || 'User'} />
                                        <AvatarFallback className="bg-[#6B3003] text-white">
                                            {data.user?.name ? data.user.name.charAt(0).toUpperCase() : 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 p-2">
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 rounded-md p-2">
                                    <Link href="/profile" className="w-full">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 rounded-md p-2">
                                    <Link href="/history" className="w-full">View History</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 rounded-md p-2">
                                    <button 
                                        onClick={async () => await authClient.signOut()} 
                                        className="w-full text-left text-red-600"
                                    >
                                        Logout
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </nav>
    )
}

export { NavUser };