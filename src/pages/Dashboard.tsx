import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import {
  HiLightningBolt,
  HiChevronUp,
  HiChevronDown,
  HiRefresh,
  HiShare,
  HiPlus,
  HiUpload,
} from "react-icons/hi";
import { useAppDispatch } from "../hooks/redux";
import { openSlideOver } from "../store/slices/uiSlice";

// Lazy load components
const InteractiveChart = lazy(() => import("../components/Chart/InteractiveChart"));
const KPICards = lazy(() => import("../components/Dashboard/KPICards"));

// Loading component for chart and KPI cards
const ComponentLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#C9FF3B]"></div>
  </div>
);

// Memoized result cards data
const RESULT_CARDS_DATA = [
  {
    id: 'profit-config',
    text: "The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
    color: "#C9FF3B"
  },
  {
    id: 'demand-config',
    text: "The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
    color: "#B3E237"
  }
];

// Memoized ResultCard component
const ResultCard = React.memo<{ data: typeof RESULT_CARDS_DATA[0] }>(({ data }) => (
  <div className="card py-4 px-6 border-1 border-[#C8E972] min-h-14 flex justify-between items-center bg-[#161618]">
    <div className="text-sm" style={{ color: data.color }}>
      {data.text}
    </div>
    <div className="transition-colors hover:text-white" style={{ color: data.color }}>
      <span className="text-xs">•••</span>
    </div>
  </div>
));

ResultCard.displayName = 'ResultCard';

// Memoized header buttons
const HeaderButtons = React.memo<{
  onEditVariables: () => void;
  onRefresh: () => void;
  onShare: () => void;
}>(({ onEditVariables, onRefresh, onShare }) => (
  <div className="flex items-center space-x-3">
    <button 
      onClick={onRefresh}
      className="p-2 text-gray-400 hover:text-white hover:bg-[#5A5A5A] rounded-lg transition-colors border border-[#5A5A5A]"
    >
      <HiRefresh className="w-5 h-5" />
    </button>
    <button
      onClick={onEditVariables}
      className="btn-primary flex items-center space-x-2 text-sm bg-[#242424] py-2 px-2 rounded-md hover:bg-[#5A5A5A] text-white border border-[#5A5A5A]"
    >
      <span>Edit Variables</span>
    </button>
    <button 
      onClick={onShare}
      className="p-2 bg-[#242424] hover:bg-[#5A5A5A] rounded-lg transition-colors border border-[#5A5A5A]"
    >
      <HiUpload className="w-5 h-5" />
    </button>
  </div>
));

HeaderButtons.displayName = 'HeaderButtons';

// Memoized results section
const ResultsSection = React.memo<{
  isResultsExpanded: boolean;
  onToggleResults: () => void;
}>(({ isResultsExpanded, onToggleResults }) => (
  <div className="space-y-4">
    <div className="flex items-center space-x-2 justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-yellow-400">✨</span>
        <h2 className="text-lg font-semibold text-white">
          Best Scenario Results
        </h2>
      </div>
      <button 
        onClick={onToggleResults}
        className="px-2 py-1 text-[#C9FF3B] hover:text-white transition-colors hover:bg-[#525252] rounded-xl border border-[#C9FF3B]"
      >
        {isResultsExpanded ? (
          <HiChevronUp className="w-4 h-4" />
        ) : (
          <HiChevronDown className="w-4 h-4" />
        )}
      </button>
    </div>

    <div className={`space-y-3 transition-all duration-300 ease-in-out overflow-hidden ${
      isResultsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}>
      {RESULT_CARDS_DATA.map((cardData) => (
        <ResultCard key={cardData.id} data={cardData} />
      ))}
    </div>
  </div>
));

ResultsSection.displayName = 'ResultsSection';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isResultsExpanded, setIsResultsExpanded] = useState(true);

  // Memoized callbacks to prevent unnecessary re-renders
  const handleEditVariables = useCallback(() => {
    dispatch(openSlideOver({ type: "variables" }));
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    // Add refresh logic here
    console.log('Refreshing dashboard...');
  }, []);

  const handleShare = useCallback(() => {
    // Add share logic here
    console.log('Sharing dashboard...');
  }, []);

  const toggleResults = useCallback(() => {
    setIsResultsExpanded(prev => !prev);
  }, []);

  // Memoized chart options
  const chartOptions = useMemo(() => [
    'Unsatisfied Demand %',
    'Satisfied Demand %',
    'Revenue'
  ], []);

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <HiLightningBolt className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Charging Station</h1>
        </div>
        <HeaderButtons 
          onEditVariables={handleEditVariables}
          onRefresh={handleRefresh}
          onShare={handleShare}
        />
      </div>

      {/* Best Scenario Results */}
      <ResultsSection 
        isResultsExpanded={isResultsExpanded}
        onToggleResults={toggleResults}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-[25px]">
            <h3 className="text-lg font-semibold text-white">Graphs</h3>
          </div>
          <div className="rounded-lg p-8 h-96 bg-[#222324] border border-[#5A5A5A] focus:outline-none" tabIndex={-1}>
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <div className="relative">
                <select className="bg-[#3A3D3F] border border-gray-600 rounded-lg px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C9FF3B] appearance-none cursor-pointer">
                  {chartOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <HiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="h-80 focus:outline-none">
              <Suspense fallback={<ComponentLoader />}>
                <InteractiveChart />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Right Sidebar - KPI Cards */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Key Performance Indicators
            </h3>
            <button className="btn-secondary flex items-center space-x-2 text-sm bg-inherit border border-[#5A5A5A] hover:bg-[#5A5A5A]">
              <span>Variables</span>
              <HiPlus className="w-4 h-4" />
            </button>
          </div>
          <div className="h-96">
            <Suspense fallback={<ComponentLoader />}>
              <KPICards />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
