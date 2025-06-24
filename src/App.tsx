import { useState, Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigation from './components/Layout/Navigation';
import SlideOver from './components/UI/SlideOver';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './index.css';

// Lazy load heavy components
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9FF3B]"></div>
  </div>
);

// Lazy load other page components for future use
const FleetSizing = lazy(() => Promise.resolve({
  default: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Fleet Sizing</h1>
      <p className="text-gray-400 mt-2">Fleet sizing content coming soon...</p>
    </div>
  )
}));

const Parking = lazy(() => Promise.resolve({
  default: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Parking</h1>
      <p className="text-gray-400 mt-2">Parking content coming soon...</p>
    </div>
  )
}));

function App() {
  const [activeTab, setActiveTab] = useState('charging-stations');

  const renderContent = () => {
    switch (activeTab) {
      case 'charging-stations':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        );
      case 'fleet-sizing':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <FleetSizing />
          </Suspense>
        );
      case 'parking':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Parking />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        );
    }
  };

  return (
    <Provider store={store}>
      <ProtectedRoute>
        <div className="min-h-screen bg-[#161618]">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Main Content */}
          <div className="ml-16 mt-16">
            {renderContent()}
          </div>

          {/* Slide Over Panel */}
          <SlideOver />
        </div>
      </ProtectedRoute>
    </Provider>
  );
}

export default App;
