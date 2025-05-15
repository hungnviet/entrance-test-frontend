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

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  message: string;
  code: number;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: Account;
} 

export interface Account {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SigninResponseData {
  token:string;
  user: Account
}