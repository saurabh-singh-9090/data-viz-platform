import React, { useState, useEffect } from 'react';
import { 
  HiHome, 
  HiChartBar, 
  HiCog, 
  HiBell, 
  HiSearch,
  HiMenu,
  HiLogout
} from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, signOut } = useAuth();

  // Check if we're on mobile/tablet
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  const toggleMobileSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const getUserDisplayName = () => {
    return user?.displayName || user?.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  // Desktop sidebar (always visible on desktop)
  const DesktopSidebar = () => (
    <div className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-16 md:bg-[#0E0D0D] md:border-r md:border-gray-700 md:flex md:flex-col md:items-center md:py-4 md:z-40">
      <div className="p-3 text-gray-400 mb-6">
        <HiMenu className="w-6 h-6" />
      </div>
      
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
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-3 text-gray-400 hover:text-white hover:bg-[#525252] rounded-lg transition-colors flex items-center justify-center"
            title={getUserDisplayName()}
          >
            <div className="w-6 h-6 bg-[#C9FF3B] rounded-full flex items-center justify-center text-black text-sm font-semibold">
              {getUserInitials()}
            </div>
          </button>
          
          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute bottom-full left-full ml-2 mb-2 w-48 bg-[#242424] border border-gray-600 rounded-lg shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-600">
                <p className="text-sm font-medium text-white">{getUserDisplayName()}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#5A5A5A] hover:text-white transition-colors"
              >
                <HiLogout className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile sidebar (toggleable overlay)
  const MobileSidebar = () => (
    <>
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileSidebarOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-[#0E0D0D] border-r border-gray-700 p-4 transform transition-transform duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold">Menu</h2>
              <button onClick={() => setIsMobileSidebarOpen(false)} className="text-gray-400 hover:text-white">
                <HiMenu className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:text-white hover:bg-[#525252] rounded-lg transition-colors"
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            
            <div className="mt-8 pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-3 p-3">
                <div className="w-8 h-8 bg-[#C9FF3B] rounded-full flex items-center justify-center text-black text-sm font-semibold">
                  {getUserInitials()}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{getUserDisplayName()}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:bg-[#5A5A5A] hover:text-white rounded-lg transition-colors"
              >
                <HiLogout className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Top Navigation */}
      <div className="fixed top-0 left-0 md:left-16 right-0 h-16 bg-[#0E0D0D] border-b border-gray-700 flex items-center justify-between px-4 md:px-6 z-30">
        {/* Mobile hamburger menu */}
        <button 
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 text-gray-400 hover:text-white"
        >
          <HiMenu className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-2 md:space-x-6 flex-1 md:flex-initial">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
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

          {/* Mobile Navigation - Horizontal scroll */}
          <nav className="md:hidden flex space-x-2 overflow-x-auto scrollbar-hide flex-1 px-2">
            {topNavItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
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
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search - Hidden on small mobile, shown on larger screens */}
          <div className="hidden sm:block relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-[#0E0D0D] border border-white rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-32 md:w-auto"
            />
          </div>
          
          {/* Search icon for mobile */}
          <button className="sm:hidden p-2 text-gray-400 hover:text-white">
            <HiSearch className="w-5 h-5" />
          </button>

          {/* User Avatar in Top Nav (for mobile) */}
          <div className="md:hidden relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 text-gray-400 hover:text-white hover:bg-[#525252] rounded-lg transition-colors flex items-center justify-center"
              title={getUserDisplayName()}
            >
              <div className="w-6 h-6 bg-[#C9FF3B] rounded-full flex items-center justify-center text-black text-sm font-semibold">
                {getUserInitials()}
              </div>
            </button>
            
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#242424] border border-gray-600 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-600">
                  <p className="text-sm font-medium text-white">{getUserDisplayName()}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#5A5A5A] hover:text-white transition-colors"
                >
                  <HiLogout className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay to close user menu when clicking outside */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};

export default Navigation; 