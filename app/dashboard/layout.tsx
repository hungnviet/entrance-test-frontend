"use client";



import DashboardSideBar from "@/components/page/DashboardLayoutSidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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

