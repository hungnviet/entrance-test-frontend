'use client'

import { useState, useMemo } from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { SampleData } from "@/data/sampleData";

import { format,  parseISO, isWithinInterval} from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip,  } from "@/components/ui/chart";

import { DateRange } from "@/types/dashboard";


export function ChartDisplay({dateRange}: {dateRange: DateRange}) {
    return(
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
    )
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

