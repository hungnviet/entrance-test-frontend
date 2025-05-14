"use client";

import SettingSideBar from "@/components/page/SettingSideBar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
      </header>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <SettingSideBar />
        
        {/* Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

