"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsProfilePage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Profile</h2>
        <p className="text-gray-500 text-sm">
          Manage your personal profile information.
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-1">Personal details</h3>
            <p className="text-gray-500 text-sm">
              Set your name and contact information, the email address entered here is used for your login access.
            </p>
          </div>
          
          <div className="grid md:grid-cols-[1fr_300px] gap-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name<span className="text-red-500">*</span>
                </label>
                <Input id="name" defaultValue="HUNG NGUYEN VIET" />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <Input id="phone" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <div className="flex items-center gap-2">
                  <Input id="email" defaultValue="hung.nguyen100904@hcmut.edu.vn" readOnly disabled className="flex-1" />
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Save</Button>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-teal-500 flex items-center justify-center text-white text-6xl font-medium mb-4 relative">
                H
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-1">Preferences</h3>
            <p className="text-gray-500 text-sm">
              Change your preferred language and theme.
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="language" className="block text-sm font-medium mb-1">
                Language
              </label>
              <p className="text-xs text-gray-500 mb-2">
                This is the language that will be used in the application.
              </p>
              <select 
                id="language"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en-US">English (United States)</option>
                <option value="vi-VN">Vietnamese</option>
                <option value="fr-FR">French</option>
                <option value="es-ES">Spanish</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="theme" className="block text-sm font-medium mb-1">
                Theme
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Select the theme for the application.
              </p>
              <select 
                id="theme"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}