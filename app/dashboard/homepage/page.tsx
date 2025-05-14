"use client";


import { useState } from "react";
import { subDays } from "date-fns";
import { DateRange } from "@/types/dashboard";

import DashboardHomepageComponents from "@/components/page/DasboardHomepage";

export default function DashboardPage() {
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: subDays(new Date(), 30),
        endDate: new Date()
    });
   

    
  
  return (
    <div className="">
        
      <DashboardHomepageComponents.Header />
      <DashboardHomepageComponents.DateRangeSelection 
            dateRange={dateRange} 
            setDateRange={setDateRange}
        />
        
      <DashboardHomepageComponents.ChartDisplay
            dateRange={dateRange}
        />
       
      <DashboardHomepageComponents.ContactLists />
        
    </div>
  );
}










