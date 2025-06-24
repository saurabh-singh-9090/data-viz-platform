import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigation from './components/Layout/Navigation';
import Dashboard from './pages/Dashboard';
import SlideOver from './components/UI/SlideOver';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('charging-stations');

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-[#161618]">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="ml-16 mt-16">
          {activeTab === 'charging-stations' && <Dashboard />}
          {activeTab === 'fleet-sizing' && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-white">Fleet Sizing</h1>
              <p className="text-gray-400 mt-2">Fleet sizing content coming soon...</p>
            </div>
          )}
          {activeTab === 'parking' && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-white">Parking</h1>
              <p className="text-gray-400 mt-2">Parking content coming soon...</p>
            </div>
          )}
        </div>

        {/* Slide Over Panel */}
        <SlideOver />
      </div>
    </Provider>
  );
}

export default App;
