"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Import Material Icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
      </header>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <aside className="w-full lg:w-64 space-y-1">
          <SettingsLink 
            href="/dashboard/settings" 
            icon={<PersonOutlineIcon fontSize="small" />}
            active={pathname === "/dashboard/settings"}
          >
            Profile
          </SettingsLink>
          <SettingsLink 
            href="/dashboard/settings/security" 
            icon={<LockOutlinedIcon fontSize="small" />}
            active={pathname === "/dashboard/settings/security"}
          >
            Security
          </SettingsLink>
          <SettingsLink 
            href="/dashboard/settings/notifications" 
            icon={<NotificationsNoneOutlinedIcon fontSize="small" />}
            active={pathname === "/dashboard/settings/notifications"}
          >
            Notifications
          </SettingsLink>
          
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Organization
            </h3>
            <SettingsLink 
              href="/dashboard/settings/information" 
              icon={<LinkOutlinedIcon fontSize="small" />}
              active={pathname === "/dashboard/settings/information"}
            >
              Information
            </SettingsLink>
            <SettingsLink 
              href="/dashboard/settings/members" 
              icon={<PeopleOutlineOutlinedIcon fontSize="small" />}
              active={pathname === "/dashboard/settings/members"}
            >
              Members
            </SettingsLink>
            <SettingsLink 
              href="/dashboard/settings/billing" 
              icon={<CreditCardOutlinedIcon fontSize="small" />}
              active={pathname === "/dashboard/settings/billing"}
            >
              Billing
            </SettingsLink>
            <SettingsLink 
              href="/dashboard/settings/developers" 
              icon={<CodeOutlinedIcon fontSize="small" />}
              active={pathname === "/dashboard/settings/developers"}
            >
              Developers
            </SettingsLink>
          </div>
        </aside>
        
        {/* Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

function SettingsLink({ 
  href, 
  icon, 
  children,
  active,
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm rounded-md",
        active 
          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white" 
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}