"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSideBar from "@/components/page/DashboardLayoutSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for authentication data
        const token = localStorage.getItem('authToken');
        const userString = localStorage.getItem('user');
        
        if (!token || !userString) {
          // No token or user data, redirect to login
          router.replace('/auth/signin');
          return;
        }
        
        // Validate user data
        const userData = JSON.parse(userString);
        if (!userData || !userData.id || !userData.email) {
          // Invalid user data format
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          router.replace('/auth/signin');
          return;
        }
        
        // Auth validation passed
        setIsLoading(false);
      } catch (error) {
        console.error('Auth validation error:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.replace('/auth/signin');
      }
    };
    
    checkAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying your credentials...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show the dashboard with sidebar
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      <DashboardSideBar />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}