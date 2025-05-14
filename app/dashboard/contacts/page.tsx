"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  const contacts = [
    {
      id: "1",
      name: "Adobe",
      icon: "A",
      color: "bg-red-100 text-red-800",
      email: "contact@adobe.com",
      phone: "+1 408-536-6000",
      stage: "Lead",
      tags: ["Software", "Technology", "Creativity"],
    },
    {
      id: "2",
      name: "Airbnb",
      icon: "A",
      color: "bg-red-100 text-red-800",
      email: "press@airbnb.com",
      phone: "+1 415-800-5959",
      stage: "Lead",
      tags: ["Internet", "B2C", "Web Services & Apps"],
    },
    {
      id: "3",
      name: "Amazon",
      icon: "A",
      color: "bg-gray-100 text-gray-800",
      email: "contact@amazon.com",
      phone: "+1 206-266-1000",
      stage: "Lead",
      tags: ["Technology", "E-commerce", "Cloud Computing"],
    },
    {
      id: "4",
      name: "AMD",
      icon: "A",
      color: "bg-gray-100 text-gray-800",
      email: "info@amd.com",
      phone: "+1 408-749-4000",
      stage: "Lead",
      tags: ["Technology", "Semiconductors", "Hardware"],
    },
    {
      id: "5",
      name: "Apple",
      icon: "A",
      color: "bg-gray-100 text-gray-800",
      email: "contact@apple.com",
      phone: "+1 408-996-1010",
      stage: "Lead",
      tags: ["Technology", "B2C", "IT & Services"],
    }
  ];
  
  const handleSelectAll = () => {
    if (selectedRows.length === contacts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(contacts.map(contact => contact.id));
    }
  };
  
  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Contacts</h1>
          <button className="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </button>
        </div>
        <Button>Add contact</Button>
      </header>
      
      {/* Tabs */}
      <div className="flex border-b">
        <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
          All
        </TabButton>
        <TabButton active={activeTab === "people"} onClick={() => setActiveTab("people")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          People
        </TabButton>
        <TabButton active={activeTab === "companies"} onClick={() => setActiveTab("companies")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" /><path d="M12 3v6" /></svg>
          Companies
        </TabButton>
        <TabButton active={activeTab === "tags"} onClick={() => setActiveTab("tags")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></svg>
          Tags
        </TabButton>
      </div>
      
      {/* Search */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <Input 
          placeholder="Search by name or email..." 
          className="pl-10 bg-white dark:bg-gray-800"
        />
      </div>
      
      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-4 py-3">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedRows.length === contacts.length && contacts.length > 0}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center">
                    Name
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center">
                    Email
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center">
                    Phone
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center">
                    Stage
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center">
                    Tags
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                  </div>
                </th>
                <th className="px-4 py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedRows.includes(contact.id)}
                      onChange={() => handleSelectRow(contact.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium", contact.color)}>
                        {contact.icon}
                      </div>
                      <span className="ml-2 font-medium">{contact.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{contact.email}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{contact.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-600 dark:text-gray-400">{contact.stage}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                      {contact.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          +{contact.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-gray-400 hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="p-1 text-sm border rounded">
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
            </select>
            <span className="text-sm text-gray-500">rows per page</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Page 1 of 1</span>
            <div className="flex">
              <PaginationButton disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
              </PaginationButton>
              <PaginationButton disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </PaginationButton>
              <PaginationButton disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </PaginationButton>
              <PaginationButton disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
              </PaginationButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center px-6 py-2 text-sm",
        active 
          ? "border-b-2 border-black dark:border-white text-black dark:text-white" 
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      )}
    >
      {children}
    </button>
  );
}

function PaginationButton({ 
  children, 
  disabled 
}: { 
  children: React.ReactNode; 
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "p-1 border",
        disabled 
          ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" 
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      )}
    >
      {children}
    </button>
  );
}