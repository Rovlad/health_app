import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import TodayView from './TodayView';
import HealthDashboard from './HealthDashboard';
import CoachingHub from './CoachingHub';
import ChallengesView from './ChallengesView';
import CommunityView from './CommunityView';
import LibraryView from './LibraryView';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [activeView, setActiveView] = useState('today');
  const [userRole, setUserRole] = useState<'employee' | 'coach' | 'admin'>('employee');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'today':
        return <TodayView />;
      case 'dashboard':
        return <HealthDashboard />;
      case 'coaching':
        return <CoachingHub />;
      case 'challenges':
        return <ChallengesView />;
      case 'community':
        return <CommunityView />;
      case 'library':
        return <LibraryView />;
      default:
        return <TodayView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Navigation */}
      {!isMobile && (
        <Navigation 
          activeView={activeView}
          onViewChange={setActiveView}
          userRole={userRole}
        />
      )}

      {/* Mobile Navigation Overlay */}
      {isMobile && mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out">
            <Navigation 
              activeView={activeView}
              onViewChange={(view) => {
                setActiveView(view);
                setMobileMenuOpen(false);
              }}
              userRole={userRole}
            />
          </div>
        </>
      )}
      
      <main className="flex-1 overflow-auto touch-pan-y">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs">H</span>
                </div>
                <h1 className="text-lg font-bold text-gray-900">HealthManager</h1>
              </div>
              <div className="w-10" />
            </div>
          </div>
        )}
        
        <div className={`max-w-6xl mx-auto ${isMobile ? 'p-4' : 'p-6'}`}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
