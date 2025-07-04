import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Dot,
} from 'recharts';
import { HiArrowUp, HiQuestionMarkCircle } from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { selectChartData } from '../../store/slices/dashboardSlice';
import { showTooltip, hideTooltip } from '../../store/slices/uiSlice';
import type { DataPoint } from '../../types';

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: DataPoint;
  onMouseEnter?: (data: DataPoint, x: number, y: number) => void;
  onMouseLeave?: () => void;
}

// Memoized CustomDot component
const CustomDot = React.memo<CustomDotProps>(({ cx, cy, payload, onMouseEnter, onMouseLeave }) => {
  if (!cx || !cy || !payload) return null;

  const isHighlighted = payload.metadata?.aboveTarget;

  return (
    <Dot
      cx={cx}
      cy={cy}
      r={4}
      fill={isHighlighted ? "#C9FF3B" : "#C9FF3B"}
      stroke="#C9FF3B"
      strokeWidth={2}
      className="cursor-pointer hover:r-6 transition-all duration-200"
      onMouseEnter={() => onMouseEnter?.(payload, cx, cy)}
      onMouseLeave={onMouseLeave}
    />
  );
});

CustomDot.displayName = 'CustomDot';

// Memoized tooltip component
const ChartTooltip = React.memo<{
  tooltip: {
    x: number;
    y: number;
    content: {
      title: string;
      value: string;
      description: string;
      metadata?: { showArrow?: boolean };
    };
  };
  tooltipRef: React.RefObject<HTMLDivElement | null>;
}>(({ tooltip, tooltipRef }) => (
  <div
    ref={tooltipRef}
    className="absolute z-50 bg-[#2A2D2F] rounded-lg p-4 shadow-xl border border-gray-600 min-w-[200px]"
    style={{
      left: tooltip.x - 100,
      top: tooltip.y - 80,
      pointerEvents: 'auto',
    }}
  >
    {/* Header with value and info icon */}
    <div className="flex items-start justify-between mb-3">
      <div className="text-white text-2xl font-bold">{tooltip.content.value}</div>
      <HiQuestionMarkCircle className="w-5 h-5 text-gray-400 mt-1" />
    </div>
    
    {/* Percentage with arrow */}
    {tooltip.content.metadata?.showArrow && (
      <div className="flex items-center text-[#C9FF3B]">
        <HiArrowUp className="w-4 h-4 mr-1 border border-[#C9FF3B] rounded-full p-[2px] bg-[#525252]" />
        <span className="text-sm">
          {tooltip.content.description}
        </span>
      </div>
    )}
    
    {/* Title */}
    <div className="text-gray-300 text-sm mt-2">
      {tooltip.content.title}
    </div>
  </div>
));

ChartTooltip.displayName = 'ChartTooltip';

const InteractiveChart: React.FC = () => {
  const dispatch = useAppDispatch();
  // Use memoized selector for better performance
  const chartData = useAppSelector(selectChartData);
  const { tooltip, isTooltipVisible } = useAppSelector((state) => state.ui);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Memoize chart configuration
  const chartConfig = useMemo(() => ({
    margin: { top: 20, right: 30, left: 40, bottom: 40 },
    yAxisDomain: [0, 100000],
    yAxisTicks: [20000, 40000, 60000, 80000, 100000],
  }), []);

  // Memoize Y-axis formatter
  const formatYAxis = useCallback((value: number) => {
    return `$${(value / 1000).toFixed(0)}K`;
  }, []);

  // Memoize July index calculation
  const julyIndex = useMemo(() => 
    chartData.findIndex(point => point.date === 'Jul'), 
    [chartData]
  );

  // Memoized dot mouse enter handler
  const handleDotMouseEnter = useCallback((data: DataPoint, x: number, y: number) => {
    // Calculate percentage above target or use a baseline
    let percentageText = '';
    if (data.metadata?.aboveTarget && data.metadata?.target) {
      const percentage = ((data.value - data.metadata.target) / data.metadata.target * 100).toFixed(1);
      percentageText = `${percentage}% above target`;
    } else {
      // For data points without specific target, calculate percentage above a baseline (e.g., 30k)
      const baseline = 30000;
      if (data.value > baseline) {
        const percentage = ((data.value - baseline) / baseline * 100).toFixed(1);
        percentageText = `${percentage}% above baseline`;
      } else {
        percentageText = `${((baseline - data.value) / baseline * 100).toFixed(1)}% below baseline`;
      }
    }

    const tooltipContent = {
      title: data.label,
      value: `$${(data.value / 1000).toFixed(1)}k`,
      description: percentageText,
      metadata: { ...data.metadata, showArrow: true },
    };

    dispatch(showTooltip({
      x,
      y: y - 60,
      content: tooltipContent,
    }));
  }, [dispatch]);

  const handleDotMouseLeave = useCallback(() => {
    dispatch(hideTooltip());
  }, [dispatch]);

  // Memoized dot renderer
  const renderCustomDot = useCallback((props: { cx?: number; cy?: number; payload?: DataPoint }) => (
    <CustomDot
      {...props}
      onMouseEnter={handleDotMouseEnter}
      onMouseLeave={handleDotMouseLeave}
    />
  ), [handleDotMouseEnter, handleDotMouseLeave]);

  // Handle click outside tooltip to hide it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isTooltipVisible &&
        tooltipRef.current &&
        chartRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !chartRef.current.contains(event.target as Node)
      ) {
        dispatch(hideTooltip());
      }
    };

    if (isTooltipVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTooltipVisible, dispatch]);

  return (
    <div ref={chartRef} className="relative w-full h-full focus:outline-none" tabIndex={-1}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={chartConfig.margin}
        >
          <CartesianGrid strokeDasharray="1 1" stroke="#404040" horizontal={true} vertical={false} />
          
          {/* Vertical reference line at July */}
          {julyIndex >= 0 && (
            <ReferenceLine 
              x="Jul"
              stroke="#C9FF3B" 
              strokeDasharray="2 2"
              strokeWidth={1}
            />
          )}
          
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            interval={0}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            tickFormatter={formatYAxis}
            domain={chartConfig.yAxisDomain}
            ticks={chartConfig.yAxisTicks}
          />
          
          {/* Background bars */}
          <Bar
            dataKey="value"
            fill="#404040"
            fillOpacity={0.3}
            radius={[0, 0, 0, 0]}
          />
          
          {/* Main line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#C9FF3B"
            strokeWidth={3}
            dot={renderCustomDot}
            activeDot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Custom Tooltip */}
      {isTooltipVisible && tooltip && (
        <ChartTooltip tooltip={tooltip} tooltipRef={tooltipRef} />
      )}
    </div>
  );
};

export default React.memo(InteractiveChart); 