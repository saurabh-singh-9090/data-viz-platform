import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  HiHome, 
  HiCog, 
  HiBell, 
  HiSearch,
  HiMenu,
  HiLogout,
  HiCloudUpload,
  HiDocumentText
} from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Memoized sidebar item component
const SidebarItem = React.memo<{
  item: { id: string; icon: React.ComponentType<{ className?: string }>; label: string };
  isMobile?: boolean;
  onItemClick?: () => void;
}>(({ item, isMobile = false, onItemClick }) => {
  const Icon = item.icon;
  
  if (isMobile) {
    return (
      <button
        className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:text-white hover:bg-[#525252] rounded-lg transition-colors"
        onClick={onItemClick}
      >
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
      </button>
    );
  }

  return (
    <button
      className="p-3 text-gray-400 hover:text-white hover:bg-[#525252] rounded-lg transition-colors"
      title={item.label}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
});

SidebarItem.displayName = 'SidebarItem';

// Memoized nav item component
const NavItem = React.memo<{
  item: { id: string; label: string; active: boolean };
  onTabChange: (tab: string) => void;
}>(({ item, onTabChange }) => (
  <button
    onClick={() => onTabChange(item.id)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      item.active
        ? 'bg-[#242424] text-white'
        : 'text-gray-300 hover:text-white hover:bg-[#525252]'
    }`}
  >
    {item.label}
  </button>
));

NavItem.displayName = 'NavItem';

// Memoized user menu component
const UserMenu = React.memo<{
  showUserMenu: boolean;
  userDisplayName: string;
  userEmail: string;
  onSignOut: () => void;
}>(({ showUserMenu, userDisplayName, userEmail, onSignOut }) => {
  if (!showUserMenu) return null;

  return (
    <div className="absolute bottom-full left-full ml-2 mb-2 w-48 bg-[#242424] border border-gray-600 rounded-lg shadow-lg py-2 z-50">
      <div className="px-4 py-2 border-b border-gray-600">
        <p className="text-sm font-medium text-white">{userDisplayName}</p>
        <p className="text-xs text-gray-400">{userEmail}</p>
      </div>
      <button
        onClick={onSignOut}
        className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#5A5A5A] hover:text-white transition-colors"
      >
        <HiLogout className="w-4 h-4 mr-2" />
        Sign out
      </button>
    </div>
  );
});

UserMenu.displayName = 'UserMenu';

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, signOut } = useAuth();

  // Memoized sidebar items
  const sidebarItems = useMemo(() => [
    { id: 'home', icon: HiHome, label: 'Home' },
    { id: 'alerts', icon: HiBell, label: 'Alerts' },
    { id: 'analytics', icon: HiDocumentText, label: 'Analytics' },
    { id: 'cloud', icon: HiCloudUpload, label: 'Cloud' },
    { id: 'settings', icon: HiCog, label: 'Settings' },
  ], []);

  // Memoized top nav items
  const topNavItems = useMemo(() => [
    { id: 'charging-stations', label: 'Charging Stations', active: activeTab === 'charging-stations' },
    { id: 'fleet-sizing', label: 'Fleet Sizing', active: activeTab === 'fleet-sizing' },
    { id: 'parking', label: 'Parking', active: activeTab === 'parking' },
  ], [activeTab]);

  // Memoized user display name and initials
  const userDisplayName = useMemo(() => 
    user?.displayName || user?.email?.split('@')[0] || 'User', 
    [user?.displayName, user?.email]
  );

  const userInitials = useMemo(() => 
    userDisplayName.charAt(0).toUpperCase(), 
    [userDisplayName]
  );

  // Check if we're on mobile/tablet
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Memoized callbacks
  const toggleMobileSidebar = useCallback(() => {
    if (isMobile) {
      setIsMobileSidebarOpen(prev => !prev);
    }
  }, [isMobile]);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu(prev => !prev);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }, [signOut]);

  // Memoized desktop sidebar
  const DesktopSidebar = useMemo(() => (
    <div className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-16 md:bg-[#0E0D0D] md:border-r md:border-gray-700 md:flex md:flex-col md:items-center md:py-4 md:z-40">
      <div className="p-3 text-gray-400 mb-6">
        <HiMenu className="w-6 h-6" />
      </div>
      
      <nav className="flex flex-col space-y-4">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>
      
      <div className="mt-auto">
        <div className="relative">
          <button 
            onClick={toggleUserMenu}
            className="p-3 text-gray-400 hover:text-white hover:bg-[#525252] rounded-lg transition-colors flex items-center justify-center"
            title={userDisplayName}
          >
            <div className="w-6 h-6 bg-[#C9FF3B] rounded-full flex items-center justify-center text-black text-sm font-semibold">
              {userInitials}
            </div>
          </button>
          
          <UserMenu 
            showUserMenu={showUserMenu}
            userDisplayName={userDisplayName}
            userEmail={user?.email || ''}
            onSignOut={handleSignOut}
          />
        </div>
      </div>
    </div>
  ), [sidebarItems, toggleUserMenu, userDisplayName, userInitials, showUserMenu, user?.email, handleSignOut]);

  // Mobile sidebar component
  const MobileSidebar = useMemo(() => (
    <>
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeMobileSidebar}>
          <div className="fixed left-0 top-0 h-full w-64 bg-[#0E0D0D] border-r border-gray-700 p-4 transform transition-transform duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold">Menu</h2>
              <button onClick={closeMobileSidebar} className="text-gray-400 hover:text-white">
                <HiMenu className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <SidebarItem 
                  key={item.id} 
                  item={item} 
                  isMobile={true}
                  onItemClick={closeMobileSidebar}
                />
              ))}
            </nav>
            
            <div className="mt-8 pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-3 p-3">
                <div className="w-8 h-8 bg-[#C9FF3B] rounded-full flex items-center justify-center text-black text-sm font-semibold">
                  {userInitials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{userDisplayName}</p>
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
  ), [isMobileSidebarOpen, closeMobileSidebar, sidebarItems, userInitials, userDisplayName, user?.email, handleSignOut]);

  return (
    <>
      {/* Desktop Sidebar */}
      {DesktopSidebar}
      
      {/* Mobile Sidebar */}
      {MobileSidebar}

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
          <div className="hidden md:flex items-center space-x-2">
            {topNavItems.map((item) => (
              <NavItem key={item.id} item={item} onTabChange={onTabChange} />
            ))}
          </div>

          {/* Mobile Navigation - Dropdown */}
          <div className="md:hidden flex-1">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e.target.value)}
              className="w-full bg-[#242424] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C9FF3B]"
            >
              {topNavItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#242424] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9FF3B] w-64"
            />
          </div>
          
          {/* Mobile search button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white">
            <HiSearch className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Navigation); 