import React, { useMemo } from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { useAppSelector } from '../../hooks/redux';
import { selectKPICards } from '../../store/slices/dashboardSlice';
import type { KPICard } from '../../types';

// Memoized individual KPI card component
const KPICardItem = React.memo<{ card: KPICard }>(({ card }) => (
  <div className="card p-6 flex flex-col bg-[#222324] border border-[#5A5A5A] relative h-42">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-300">{card.title}</h3>
      <button className="text-gray-400 hover:text-gray-300 transition-colors">
        <HiQuestionMarkCircle className="w-4 h-4" />
      </button>
    </div>
    
    <div className="flex-1 mb-2">
      <p className="text-xs text-gray-400 leading-relaxed">
        {card.description}
      </p>
    </div>
    
    <div className="flex justify-end items-end">
      <span className="text-2xl font-bold text-white">{card.value}</span>
    </div>
    
    {card.trend && (
      <div className="absolute bottom-6 left-6 flex items-center">
        <span className={`text-xs ${
          card.trend.direction === 'up' ? 'text-green-400' : 
          card.trend.direction === 'down' ? 'text-red-400' : 'text-gray-400'
        }`}>
          {card.trend.direction === 'up' ? '↑' : card.trend.direction === 'down' ? '↓' : '→'}
          {card.trend.percentage}%
        </span>
      </div>
    )}
  </div>
));

KPICardItem.displayName = 'KPICardItem';

const KPICards: React.FC = () => {
  // Use memoized selector for better performance
  const kpiCards = useAppSelector(selectKPICards);

  // Memoize the grid layout classes
  const gridClasses = useMemo(() => 
    "grid grid-cols-1 md:grid-cols-2 gap-4 h-full", 
    []
  );

  return (
    <div className={gridClasses}>
      {kpiCards.map((card) => (
        <KPICardItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default React.memo(KPICards); 