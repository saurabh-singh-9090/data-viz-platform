export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Variable {
  id: string;
  name: string;
  category: string;
  description: string;
  type: 'numeric' | 'categorical' | 'boolean';
  unit?: string;
  active: boolean;
}

export interface DataPoint {
  id: string;
  date: string;
  value: number;
  label: string;
  metadata?: Record<string, any>;
}

export interface ChartData {
  data: DataPoint[];
  selectedVariables: Variable[];
  timeRange: {
    start: string;
    end: string;
  };
}

export interface KPICard {
  id: string;
  title: string;
  value: string | number;
  description: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    percentage: number;
  };
}

export interface TooltipData {
  x: number;
  y: number;
  content: {
    title: string;
    value: string;
    description: string;
    metadata?: Record<string, any>;
  };
}

export interface SlideOverState {
  isOpen: boolean;
  type: 'variables' | 'details' | null;
  data?: any;
} 