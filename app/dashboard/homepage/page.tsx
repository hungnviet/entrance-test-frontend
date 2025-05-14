"use client";


import { useState, useMemo,useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, subDays, isAfter, isBefore , parseISO, isWithinInterval} from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import InfoIcon from '@mui/icons-material/InfoOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


import { SampleData } from "@/data/sampleData";
import { DateRange } from "@/types/dashboard";



export default function DashboardPage() {
    const [timeRangeMode, setTimeRangeMode] = useState("30d");
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: subDays(new Date(), 30),
        endDate: new Date()
    });
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [tempSelectedDate, setTempSelectedDate] = useState<Date | undefined>();
    const [selectionStep, setSelectionStep] = useState<"start" | "end">("start");

    useEffect(() => {
        if (timeRangeMode === "custom") {
            setIsCalendarOpen(true);
            return;
        }
        
        const endDate = new Date();
        let startDate;
        
        switch (timeRangeMode) {
        case "1d":
            startDate = subDays(endDate, 1);
            break;
        case "3d":
            startDate = subDays(endDate, 3);
            break;
        case "7d":
            startDate = subDays(endDate, 7);
            break;
        default: // "30d"
            startDate = subDays(endDate, 30);
            break;
        }
        
        setDateRange({ startDate, endDate });
        setIsCalendarOpen(false);
    }, [timeRangeMode]);

    // Format date range for display
    const formattedDateRange = `${format(dateRange.startDate, "MMM d, yyyy")} - ${format(dateRange.endDate, "MMM d, yyyy")}`;

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return;

        if (selectionStep === "start") {
        setTempSelectedDate(date);
        setSelectionStep("end");
        } else {
       
        const startDate = isBefore(tempSelectedDate!, date) ? tempSelectedDate! : date;
        const endDate = isAfter(date, tempSelectedDate!) ? date : tempSelectedDate!;
        
        setDateRange({ startDate, endDate });
        setTempSelectedDate(undefined);
        setSelectionStep("start");
        setIsCalendarOpen(false);
        }
    };

    const handleCalendarOpen = () => {
        if (timeRangeMode !== "custom") {
        setTimeRangeMode("custom");
        } else {
        setIsCalendarOpen(!isCalendarOpen);
        }
    };
  
  return (
    <div className="">
        <header className="flex items-center justify-between border-b-1 p-4">
            <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-semibold">Overview</h1>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <InfoIcon fontSize="small" />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-black text-white rounded-md p-2">
                        <p className="text-xs p-0">Lead and contact engagement metrics</p>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div className="flex items-center gap-4">
                <a 
                    href="https://github.com" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GitHubIcon fontSize="small" />
                </a>
                <a 
                    href="https://twitter.com" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <TwitterIcon fontSize="small" />
                </a>
            </div>
        </header>
      
        <div className="flex items-center gap-4 p-4">
            <TimeRangeButton active={timeRangeMode === "1d"} onClick={() => setTimeRangeMode("1d")}>1d</TimeRangeButton>
            <TimeRangeButton active={timeRangeMode === "3d"} onClick={() => setTimeRangeMode("3d")}>3d</TimeRangeButton>
            <TimeRangeButton active={timeRangeMode === "7d"} onClick={() => setTimeRangeMode("7d")}>7d</TimeRangeButton>
            <TimeRangeButton active={timeRangeMode === "30d"} onClick={() => setTimeRangeMode("30d")}>30d</TimeRangeButton>
            <TimeRangeButton active={timeRangeMode === "custom"} onClick={() => setTimeRangeMode("custom")}>Custom</TimeRangeButton>
            
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                    <Button 
                    variant="outline" 
                    onClick={handleCalendarOpen}
                    className={cn(
                        "ml-4 flex items-center gap-2 border p-2 rounded-md",
                        timeRangeMode === "custom" && "border-black dark:border-white"
                    )}
                    >
                    <CalendarTodayIcon fontSize="small" />
                    <span className="text-sm">
                        {formattedDateRange}
                        {selectionStep === "end" && tempSelectedDate && " (Select end date)"}
                    </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                    mode="single"
                    selected={tempSelectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    />
                    <div className="p-3 border-t">
                    <p className="text-sm text-gray-500">
                        {selectionStep === "start" ? 
                        "Select start date" : 
                        `Start date: ${tempSelectedDate ? format(tempSelectedDate, "MMM d, yyyy") : ""} - Now select end date`
                        }
                    </p>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
      
        <div className="grid grid-cols-1 gap-6 p-4">
            <Card>
                <CardContent>
                    <LeadGenerationChart 
                        data={SampleData} 
                        show="people" 
                        dateRange={dateRange}
                    />
                </CardContent>
            </Card>
        </div>
        
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
    </div>
  );
}

function TimeRangeButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={cn(
        'hover:bg-gray-100 hover:cursor-pointer stroke-non p-2 border-0  ',
        active ? 'text-black border-b-2 border-black rounded-none ' : 'text-gray-400 '
      )}
    >
      {children}
    </Button>
  );
}



function ContactList({ 
  contacts 
}: { 
  contacts: { 
    name: string; 
    icon: string; 
    type: "person" | "company";
    visits: number;
  }[] 
}) {
    const [activeContact, setActiveContact] = useState<boolean>(false);
  return (
    <div className="space-y-1" >
      {contacts.map((contact, index) => (
        <div 
          key={index} 
          className={cn(
            "flex items-center justify-between py-3 px-2 rounded-md transition-colors",
            "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer",
          )}
        >
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
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">{contact.visits}</span>
            {activeContact && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            )}
          </div>
        </div>
      ))}
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


function LeadGenerationChart({ 
  data,
  show: initialShow,
  dateRange
}: { 
  data: typeof SampleData;
  show: "people" | "companies";
  dateRange: DateRange;
}) {
  const [show, setShow] = useState<"people" | "companies">(initialShow);
  
  // Filter data based on date range
  const filteredData = useMemo(() => {
    return data[show].filter(item => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { 
        start: dateRange.startDate, 
        end: dateRange.endDate 
      });
    });
  }, [data, show, dateRange]);

  // Format dates for display
  const formattedData = useMemo(() => {
    return filteredData.map(item => ({
      ...item,
      formattedDate: format(parseISO(item.date), "MMM d")
    }));
  }, [filteredData]);

  // Calculate totals
  const totals = useMemo(() => {
    const peopleTotal = data.people
      .filter(item => {
        const itemDate = parseISO(item.date);
        return isWithinInterval(itemDate, { 
          start: dateRange.startDate, 
          end: dateRange.endDate 
        });
      })
      .reduce((sum, item) => sum + item.quantity, 0);
      
    const companiesTotal = data.companies
      .filter(item => {
        const itemDate = parseISO(item.date);
        return isWithinInterval(itemDate, { 
          start: dateRange.startDate, 
          end: dateRange.endDate 
        });
      })
      .reduce((sum, item) => sum + item.quantity, 0);
      
    return { people: peopleTotal, companies: companiesTotal };
  }, [data, dateRange]);

  // Card configuration for the chart
  const chartConfig = {
    people: {
      label: "People",
      color: "hsl(16, 100%, 65%)", // coral/orange color
    },
    companies: {
      label: "Companies",
      color: "hsl(221.2 83.2% 53.3%)", // blue-500
    },
  };

  // Custom tooltip component to match the design
  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-black p-3 shadow-lg rounded-lg">
          <div className="font-medium">{label}, 2025</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 bg-[#f97161] rounded-sm"></div>
            <span>{show === "people" ? "Contacts" : "Companies"}</span>
            <span className="ml-auto font-medium">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Header with title and metrics */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Lead generation</h3>
          <p className="text-sm text-gray-500">New contacts added to the pool.</p>
        </div>
        
        <div className="flex">
          <div 
            className={cn(
              "px-8 py-4 text-center cursor-pointer border-r",
              show === "people" ? "bg-gray-50" : ""
            )}
            onClick={() => setShow("people")}
          >
            <div className="text-sm text-gray-500">People</div>
            <div className="text-3xl font-bold">{totals.people}</div>
          </div>
          <div 
            className={cn(
              "px-8 py-4 text-center cursor-pointer",
              show === "companies" ? "bg-gray-50" : ""
            )}
            onClick={() => setShow("companies")}
          >
            <div className="text-sm text-gray-500">Companies</div>
            <div className="text-3xl font-bold">{totals.companies}</div>
          </div>
        </div>
      </div>
      
      {/* Chart container */}
      <div className="border rounded-lg p-4">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={formattedData} accessibilityLayer barGap={0} barSize={32}>
            <CartesianGrid 
              vertical={false} 
              horizontal={true}
              stroke="#e0e0e0"
              strokeDasharray="4"
            />
            <XAxis
              dataKey="formattedDate"
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={{ fill: 'transparent' }}
              content={<CustomTooltipContent />}
            />
            <Bar 
              dataKey="quantity" 
              name={show === "people" ? "People" : "Companies"}
              fill={show === "people" ? "#f97161" : "#4285f4"}
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}





