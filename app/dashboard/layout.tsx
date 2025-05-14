"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Import Material Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddIcon from '@mui/icons-material/Add';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M7.81815 8.36373L12 0L24 24H15.2809L7.81815 8.36373Z" fill="currentColor"></path>
                <path d="M4.32142 15.3572L8.44635 24H-1.14809e-06L4.32142 15.3572Z" fill="currentColor"></path>
              </g>
            </svg>
            <span className="font-bold text-xl">Acme</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-8">
          <div className="space-y-1">
            <NavItem 
              href="/dashboard/homepage" 
              icon={<HomeOutlinedIcon fontSize="small" />} 
              isActive={pathname === "/dashboard/homepage"}
            >
              Home
            </NavItem>
            <NavItem 
              href="/dashboard/contacts" 
              icon={<PeopleOutlineOutlinedIcon fontSize="small" />} 
              isActive={pathname === "/dashboard/contacts"}
            >
              Contacts
            </NavItem>
            <NavItem 
              href="/dashboard/settings" 
              icon={<SettingsOutlinedIcon fontSize="small" />} 
              isActive={pathname.startsWith("/dashboard/settings")}
            >
              Settings
            </NavItem>
          </div>
          
          {/* Favorites */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 dark:text-gray-400">
              Favorites
            </h3>
            <div className="space-y-1">
              <FavoriteItem 
                href="#" 
                icon="A" 
                bgColor="bg-red-100 text-red-800"
              >
                Airbnb
              </FavoriteItem>
              <FavoriteItem 
                href="#" 
                icon="G" 
                bgColor="bg-blue-100 text-blue-800"
              >
                Google
              </FavoriteItem>
              <FavoriteItem 
                href="#" 
                icon="M" 
                bgColor="bg-green-100 text-green-800"
              >
                Microsoft
              </FavoriteItem>
            </div>
          </div>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <button className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white w-full">
            <AddIcon sx={{ fontSize: 16 }} className="mr-2" />
            Invite member
          </button>
          <button className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white w-full">
            <PublicOutlinedIcon sx={{ fontSize: 16 }} className="mr-2" />
            Feedback
          </button>
          <div className="flex items-center gap-3 py-2">
            <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
              H
            </div>
            <span className="font-medium text-sm">HUNG NGUYEN VIET</span>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}

// Navigation Components
function NavItem({ href, icon, children, isActive }: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md",
        isActive 
          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white" 
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

function FavoriteItem({ href, icon, children, bgColor }: {
  href: string;
  icon: string;
  children: React.ReactNode;
  bgColor: string;
}) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    >
      <div className={cn("w-6 h-6 rounded-md flex items-center justify-center", bgColor)}>
        {icon}
      </div>
      {children}
    </Link>
  );
}