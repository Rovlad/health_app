import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
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
      {!isMobile && (
        <Navigation 
          activeView={activeView}
          onViewChange={setActiveView}
          userRole={userRole}
        />
      )}
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
