'use client'
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { HomeButton } from "@/components/page/HomeButton";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-10 bg-white dark:bg-black">
      <HomeButton />
      <Card className="w-full max-w-sm border-gray-200 dark:border-gray-800 dark:bg-black">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold dark:text-white">Log in</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Enter your details below to sign into your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form>
            <div className="grid gap-3">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-bold dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <Input id="email" type="email" className="pl-10 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-bold dark:text-gray-300">
                    Password
                  </label>
                  <Link href="/auth/forgot-password" className="text-sm text-primary underline dark:text-blue-400">
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    className="pl-10 pr-10 dark:border-gray-700 dark:bg-gray-800 dark:text-white" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground dark:text-gray-400"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 hover:cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700">
                Log in
              </Button>
            </div>
          </form>
          
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <Separator className="dark:bg-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground dark:bg-gray-900 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full dark:border-gray-700 dark:text-white dark:hover:bg-gray-800" size="sm">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full dark:border-gray-700 dark:text-white dark:hover:bg-gray-800" size="sm">
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <rect width="20" height="20" x="4" y="4" fill="#ff5722"/>
                <rect width="20" height="20" x="24" y="4" fill="#4caf50"/>
                <rect width="20" height="20" x="4" y="24" fill="#03a9f4"/>
                <rect width="20" height="20" x="24" y="24" fill="#ffc107"/>
              </svg>
              Microsoft
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center py-4">
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary font-medium hover:underline dark:text-blue-400">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}