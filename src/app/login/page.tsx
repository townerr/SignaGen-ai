"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { authClient } from "~/utils/auth-client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if there's a tab parameter in the URL
    const tabParam = searchParams.get("tab")
    if (tabParam === "register") {
      setActiveTab("register")
    }
  }, [searchParams])

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/"
      }, {
        onRequest: (ctx) => {
          setIsLoading(true)
        },
        onSuccess: (ctx) => {
          router.push("/")
          router.refresh()
        },
        onError: (ctx) => {
          setError(ctx.error.message || "An unexpected error occurred. Please try again.")
          setIsLoading(false)
          return
        }
      })
    } catch (error: any) {
      setError(error?.message || "An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const image = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image,
        callbackURL: "/"
      },{
        onRequest: (ctx) => {
          setIsLoading(true)
        },
        onSuccess: (ctx) => {
            router.push("/")
            router.refresh()
        },
        onError: (ctx) => {
          setError(ctx.error.message || "An unexpected error occurred. Please try again.")
          setIsLoading(false)
          return
        }
      })
    } catch (error: any) {
      setError(error?.message || "An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f0e5] p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 bg-[#e6ccb2]">
          <TabsTrigger 
            value="login" 
            className="font-dynapuff data-[state=active]:bg-[#8B4513] data-[state=active]:text-white"
          >
            Login
          </TabsTrigger>
          <TabsTrigger 
            value="register" 
            className="font-dynapuff data-[state=active]:bg-[#8B4513] data-[state=active]:text-white"
          >
            Register
          </TabsTrigger>
        </TabsList>
        
        {/* Login Tab */}
        <TabsContent value="login">
          <Card className="border-[#8B4513] shadow-lg">
            <CardHeader className="bg-[#8B4513] text-white rounded-t-lg">
              <CardTitle className="text-2xl font-dynapuff text-center">Welcome Back!</CardTitle>
              <CardDescription className="text-white/80 text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-dynapuff">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="border-[#8B4513]/30 focus:border-[#8B4513] focus:ring-[#8B4513]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-dynapuff">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-[#8B4513]/30 focus:border-[#8B4513] focus:ring-[#8B4513]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#8B4513] hover:bg-[#6B3003] text-white font-dynapuff hover:scale-105 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
              <Link href="#" className="text-[#8B4513] hover:underline font-dynapuff">
                Forgot your password?
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Register Tab */}
        <TabsContent value="register">
          <Card className="border-[#8B4513] shadow-lg">
            <CardHeader className="bg-[#8B4513] text-white rounded-t-lg">
              <CardTitle className="text-2xl font-dynapuff text-center">Create Account</CardTitle>
              <CardDescription className="text-white/80 text-center">
                Register to start creating signatures
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-dynapuff">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="border-[#8B4513]/30 focus:border-[#8B4513] focus:ring-[#8B4513]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="font-dynapuff">Email</Label>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="border-[#8B4513]/30 focus:border-[#8B4513] focus:ring-[#8B4513]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="font-dynapuff">Password</Label>
                  <Input
                    id="register-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-[#8B4513]/30 focus:border-[#8B4513] focus:ring-[#8B4513]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-dynapuff">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-[#8B4513]/30 focus:border-[#8B4513] focus:ring-[#8B4513]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#8B4513] hover:bg-[#6B3003] text-white font-dynapuff hover:scale-105 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
              <p className="text-muted-foreground">
                By registering, you agree to our <Link href="#" className="text-[#8B4513] hover:underline font-dynapuff">Terms of Service</Link>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
