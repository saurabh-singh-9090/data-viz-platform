import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Variable, DataPoint, KPICard } from '../../types';
import type { RootState } from '../index';

interface DashboardState {
  variables: Variable[];
  selectedVariables: Variable[];
  chartData: DataPoint[];
  kpiCards: KPICard[];
  isLoading: boolean;
  error: string | null;
  timeRange: {
    start: string;
    end: string;
  };
}

const mockVariables: Variable[] = [
  {
    id: 'carbon1',
    name: 'Carbon 1',
    category: 'Variable category 1',
    description: 'Carbon emissions data',
    type: 'numeric',
    unit: 'tons',
    active: false,
  },
  {
    id: 'co2-distribution',
    name: 'Co2 Distribution',
    category: 'Variable category 1',
    description: 'But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages. Whether you\'re a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle.',
    type: 'numeric',
    unit: '%',
    active: true,
  },
  {
    id: 'fleet-sizing',
    name: 'Fleet sizing',
    category: 'Variable category 1',
    description: 'Fleet size optimization data',
    type: 'numeric',
    active: true,
  },
  {
    id: 'parking-rate',
    name: 'Parking Rate',
    category: 'Variable Category 2',
    description: 'Parking utilization rates',
    type: 'numeric',
    unit: '%',
    active: false,
  },
  {
    id: 'border-rate',
    name: 'Border Rate',
    category: 'Variable Category 2',
    description: 'Border crossing rates',
    type: 'numeric',
    unit: '%',
    active: true,
  },
  {
    id: 'request-rate',
    name: 'Request rate',
    category: 'Variable Category 2',
    description: 'Service request rates',
    type: 'numeric',
    unit: 'requests/min',
    active: true,
  },
  {
    id: 'variable1-cat2',
    name: 'Variable 1',
    category: 'Variable Category 2',
    description: 'Additional variable for category 2',
    type: 'numeric',
    active: false,
  },
  {
    id: 'variable1-cat2-2',
    name: 'Variable 1',
    category: 'Variable Category 2',
    description: 'Another variable for category 2',
    type: 'numeric',
    active: false,
  },
  {
    id: 'variable1-cat2-3',
    name: 'Variable 1',
    category: 'Variable Category 2',
    description: 'Third variable for category 2',
    type: 'numeric',
    active: true,
  },
  {
    id: 'variable1-cat3',
    name: 'Variable 1',
    category: 'Variable Category 3',
    description: 'Variable for category 3',
    type: 'numeric',
    active: false,
  },
  {
    id: 'variable1-cat3-2',
    name: 'Variable 1',
    category: 'Variable Category 3',
    description: 'Second variable for category 3',
    type: 'numeric',
    active: true,
  },
  {
    id: 'variable1-cat3-3',
    name: 'Variable 1',
    category: 'Variable Category 3',
    description: 'Third variable for category 3',
    type: 'numeric',
    active: true,
  },
];

const mockChartData: DataPoint[] = [
  { id: '1', date: 'Apr', value: 35000, label: 'April' },
  { id: '2', date: 'May\nNow', value: 45000, label: 'May' },
  { id: '3', date: 'Jun', value: 42000, label: 'June' },
  { id: '4', date: 'Jul', value: 89600, label: 'July', metadata: { target: 85000, aboveTarget: true } },
  { id: '5', date: 'Aug', value: 62000, label: 'August' },
  { id: '6', date: 'Sep', value: 35000, label: 'September' },
  { id: '7', date: 'Oct', value: 55000, label: 'October' },
];

const mockKPICards: KPICard[] = [
  {
    id: 'infrastructure',
    title: 'Infrastructure Units',
    value: '€421.07',
    description: 'This describes variable two and what the shown data means.',
  },
  {
    id: 'charging-growth',
    title: 'Charging Growth',
    value: '33.07',
    description: 'This describes variable two and what the shown data means.',
  },
  {
    id: 'localization',
    title: 'Localization change',
    value: '21.9%',
    description: 'This describes variable two and what the shown data means.',
  },
  {
    id: 'fleet-growth',
    title: 'Fleet growth',
    value: '7.03%',
    description: 'This describes variable two and what the shown data means.',
  },
];

const initialState: DashboardState = {
  variables: mockVariables,
  selectedVariables: mockVariables.filter(v => v.active),
  chartData: mockChartData,
  kpiCards: mockKPICards,
  isLoading: false,
  error: null,
  timeRange: {
    start: '2024-04-01',
    end: '2024-10-31',
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setVariables: (state, action: PayloadAction<Variable[]>) => {
      state.variables = action.payload;
    },
    toggleVariable: (state, action: PayloadAction<string>) => {
      const variableId = action.payload;
      const variable = state.variables.find(v => v.id === variableId);
      if (variable) {
        variable.active = !variable.active;
        state.selectedVariables = state.variables.filter(v => v.active);
      }
    },
    setSelectedVariables: (state, action: PayloadAction<Variable[]>) => {
      state.selectedVariables = action.payload;
      // Update active status in variables array
      state.variables.forEach(variable => {
        variable.active = action.payload.some(selected => selected.id === variable.id);
      });
    },
    setChartData: (state, action: PayloadAction<DataPoint[]>) => {
      state.chartData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      state.timeRange = action.payload;
    },
    updateKPICards: (state, action: PayloadAction<KPICard[]>) => {
      state.kpiCards = action.payload;
    },
  },
});

export const {
  setVariables,
  toggleVariable,
  setSelectedVariables,
  setChartData,
  setLoading,
  setError,
  setTimeRange,
  updateKPICards
} = dashboardSlice.actions;

// Memoized selectors for better performance
export const selectDashboard = (state: RootState) => state.dashboard;

export const selectVariables = createSelector(
  [selectDashboard],
  (dashboard) => dashboard.variables
);

export const selectActiveVariables = createSelector(
  [selectVariables],
  (variables) => variables.filter(variable => variable.active)
);

export const selectVariablesByCategory = createSelector(
  [selectVariables],
  (variables) => variables.reduce((acc, variable) => {
    if (!acc[variable.category]) {
      acc[variable.category] = [];
    }
    acc[variable.category].push(variable);
    return acc;
  }, {} as Record<string, Variable[]>)
);

export const selectChartData = createSelector(
  [selectDashboard],
  (dashboard) => dashboard.chartData
);

export const selectKPICards = createSelector(
  [selectDashboard],
  (dashboard) => dashboard.kpiCards
);

export const selectDashboardLoading = createSelector(
  [selectDashboard],
  (dashboard) => dashboard.isLoading
);

export const selectDashboardError = createSelector(
  [selectDashboard],
  (dashboard) => dashboard.error
);

export const selectTimeRange = createSelector(
  [selectDashboard],
  (dashboard) => dashboard.timeRange
);

// Complex memoized selectors
export const selectVariablesStats = createSelector(
  [selectVariables],
  (variables) => ({
    total: variables.length,
    active: variables.filter(v => v.active).length,
    byCategory: variables.reduce((acc, variable) => {
      acc[variable.category] = (acc[variable.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  })
);

export const selectChartDataWithMetadata = createSelector(
  [selectChartData],
  (chartData) => ({
    data: chartData,
    maxValue: Math.max(...chartData.map(d => d.value)),
    minValue: Math.min(...chartData.map(d => d.value)),
    averageValue: chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length,
    totalDataPoints: chartData.length
  })
);

export default dashboardSlice.reducer; 