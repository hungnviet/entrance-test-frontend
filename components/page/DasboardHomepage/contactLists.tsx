'use client'
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ArrowRightIcon } from "@radix-ui/react-icons";

import { Contact } from "@/types/dashboard";

export default function ContactLists(){
    return(
        <div className="grid grid-cols-2 gap-6 p-4">
                    <Card className="rounded-lg shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold">Most visited contacts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ContactList 
                                contacts={[
                                    { name: "Salesforce", icon: "Sf", type: "company", visits: 0 },
                                    { name: "Vivian Casey", icon: "VC", type: "person", visits: 0,  },
                                    { name: "Olivia Weber", icon: "OW", type: "person", visits: 0 },
                                    { name: "Dropbox", icon: "Db", type: "company", visits: 0 },
                                    { name: "Airbnb", icon: "Ab", type: "company", visits: 0 },
                                    { name: "Broadcom", icon: "Bc", type: "company", visits: 0 }
                                ]}
                            />
                        </CardContent>
                    </Card>
                    
                    <Card className="rounded-lg shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold">Least visited contacts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ContactList 
                                contacts={[
                                    { name: "Salesforce", icon: "Sf", type: "company", visits: 0 },
                                    { name: "Vivian Casey", icon: "VC", type: "person", visits: 0 },
                                    { name: "Olivia Weber", icon: "OW", type: "person", visits: 0 },
                                    { name: "Dropbox", icon: "Db", type: "company", visits: 0 },
                                    { name: "Airbnb", icon: "Ab", type: "company", visits: 0 },
                                    { name: "Broadcom", icon: "Bc", type: "company", visits: 0 }
                                ]}
                            />
                        </CardContent>
                    </Card>
                </div>
    )
}

function ContactList({ 
  contacts 
}: { 
  contacts:  Contact[] 
}) {
  return (
    <div className="space-y-1" >
      {contacts.map((contact, index) => (
        <ContactListItem 
          key={index} 
          contact={contact}
        />
      ))}
    </div>
  );
}

function ContactListItem({ contact }: { contact: Contact }) {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleClick = () => {
        alert(`Clicked on ${contact.name}`);
    };
  return (
    <div className="flex items-center justify-between py-3 px-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onAbort={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex items-center gap-3">
        {contact.type === "person" ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
            {contact.icon}
          </div>
        ) : (
          <CompanyLogo company={contact.name} />
        )}
        <span className="font-medium">{contact.name}</span>
      </div>
      {isHovered? <ArrowRightIcon/> :  <span className="text-gray-500">{ contact.visits}</span>}
     
    </div>
  );
}

 


// Helper component for company logos
function CompanyLogo({ company }: { company: string }) {
  // Map company names to appropriate colors
  const logoStyles: Record<string, { bg: string, icon: React.ReactNode }> = {
    "Salesforce": {
      bg: "bg-blue-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" className="w-4 h-4">
          <path d="M14,10.5a2,2,0,0,0,2-2v-1a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v1a2,2,0,0,0,2,2Z"/>
        </svg>
      )
    },
    "Dropbox": {
      bg: "bg-blue-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0061FF" strokeWidth="2" className="w-4 h-4">
          <path d="M12 5l4 3-4 3-4-3 4-3zM8 8l-4 3 4 3 4-3-4-3zM16 8l-4 3 4 3 4-3-4-3zM8 14l4 3 4-3-4-3-4 3z"/>
        </svg>
      )
    },
    "Airbnb": {
      bg: "bg-red-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FF5A5F" strokeWidth="2" className="w-4 h-4">
          <path d="M12,17.5C10.15,16.16 8.69,15.14 8.11,14.2C7.65,13.56 7.41,12.99 7.41,12.5C7.41,11.39 8.38,10.5 9.5,10.5C10.24,10.5 11,10.94 11.33,11.68L12,12.93L12.67,11.68C13,10.94 13.76,10.5 14.5,10.5A2.06,2.06 0 0,1 16.5,12.5C16.5,13 16.25,13.56 15.89,14.2C15.31,15.11 13.85,16.16 12,17.5M12,21.04C17.25,16.22 20,12.89 20,9.5C20,7.5 19.2,5.8 17.89,4.68C16.59,3.56 14.92,3 13,3C11.81,3 10.65,3.23 9.5,3.66C8.36,4.1 7.37,4.74 6.5,5.5C5.64,6.26 4.94,7.17 4.5,8.23C4.06,9.29 3.84,10.43 3.84,11.5C3.84,12.85 4.3,14.37 5.23,16.05C6.16,17.73 7.63,19.5 9.65,21.35L12,23.39L14.35,21.35C14.65,21.07 14.97,20.78 15.31,20.47L12,17.5Z" />
        </svg>
      )
    },
    "Broadcom": {
      bg: "bg-red-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#CA0016" strokeWidth="2" className="w-4 h-4">
          <rect x="3" y="8" width="18" height="8" rx="2" />
        </svg>
      )
    },
    // Default fallback
    "default": {
      bg: "bg-gray-100",
      icon: company.charAt(0)
    }
  };

  // Use the company's style or fallback to default
  const style = logoStyles[company] || logoStyles["default"];

  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${style.bg}`}>
      {typeof style.icon === "string" ? style.icon : style.icon}
    </div>
  );
}
