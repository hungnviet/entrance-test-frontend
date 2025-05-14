'use client'
import { cn } from "@/lib/utils";

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { subDays, isAfter, isBefore , format } from "date-fns";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


import { DateRange } from "@/types/dashboard";

export function DateRangeSelection({ dateRange, setDateRange,} : {dateRange:  DateRange ; setDateRange: React.Dispatch<React.SetStateAction< DateRange >>}) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [tempSelectedDate, setTempSelectedDate] = useState<Date | undefined>();
    const [selectionStep, setSelectionStep] = useState<"start" | "end">("start");
    const [timeRangeMode, setTimeRangeMode] = useState("30d");
    

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
    
    return(
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
    )
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
