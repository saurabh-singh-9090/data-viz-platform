import React, { useState } from 'react';
import { 
  HiHome, 
  HiChartBar, 
  HiCog, 
  HiBell, 
  HiUser,
  HiSearch,
  HiMenu
} from 'react-icons/hi';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarItems = [
    { id: 'home', icon: HiHome, label: 'Home' },
    { id: 'alerts', icon: HiBell, label: 'Alerts' },
    { id: 'analytics', icon: HiChartBar, label: 'Analytics' },
    { id: 'settings', icon: HiCog, label: 'Settings' },
  ];

  const topNavItems = [
    { id: 'charging-stations', label: 'Charging Stations', active: activeTab === 'charging-stations' },
    { id: 'fleet-sizing', label: 'Fleet Sizing', active: activeTab === 'fleet-sizing' },
    { id: 'parking', label: 'Parking', active: activeTab === 'parking' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-16 bg-[#0E0D0D] border-r border-gray-700 flex flex-col items-center py-4 z-40 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <button 
          onClick={toggleSidebar}
          className="p-3 text-gray-400 hover:text-white mb-6"
        >
          <HiMenu className="w-6 h-6" />
        </button>
        
        <nav className="flex flex-col space-y-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="p-3 text-gray-400 hover:text-white hover:bg-[#525252] rounded-lg transition-colors"
                title={item.label}
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          })}
        </nav>
        
        <div className="mt-auto">
          <button className="p-3 text-gray-400 hover:text-white hover:bg-[#525252] rounded-lg transition-colors">
            <HiUser className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Top Navigation */}
      <div className={`fixed top-0 right-0 h-16 bg-[#0E0D0D] border-b border-gray-700 flex items-center justify-between px-6 z-30 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'left-16' : 'left-0'
      }`}>
        {/* Hamburger menu for when sidebar is hidden */}
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-400 hover:text-white mr-4"
          >
            <HiMenu className="w-6 h-6" />
          </button>
        )}

        <div className="flex items-center space-x-6">
          <nav className="flex space-x-1">
            {topNavItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  item.active
                    ? 'bg-[#242424] text-white'
                    : 'text-white hover:bg-[#242424]'
                }`}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-[#0E0D0D] border border-white rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation; 