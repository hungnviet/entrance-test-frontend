export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface ChartDataPoint {
  date: string;
  quantity: number;
  formattedDate?: string;
}

export interface ChartData {
  people: ChartDataPoint[];
  companies: ChartDataPoint[];
}

export interface Contact {
  name: string;
  icon: string;
  type: "person" | "company";
  visits: number;
  active?: boolean;
}

export interface dateRecord {
    date: string;
    quantity: number;
}

export interface DashboardData {
  people: dateRecord[];
  companies: dateRecord[];
}

export interface Contact { 
    name: string; 
    icon: string; 
    type: "person" | "company";
    visits: number;
}