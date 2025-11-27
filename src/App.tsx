import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { TopicModeling } from './components/TopicModeling';
import { IncidentReport } from './components/IncidentReport';
import { TrendAnalysis } from './components/TrendAnalysis';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'topic' | 'search' | 'incident' | 'trends'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedIncidentAcn, setSelectedIncidentAcn] = useState('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      setCurrentView('dashboard');
    } else if (tab === 'topic') {
      setCurrentView('topic');
    } else if (tab === 'trends') {
      setCurrentView('trends');
    } else if (tab === 'search') {
      setCurrentView('search');
    }
  };

  const handleReportClick = (acn: string) => {
    setSelectedIncidentAcn(acn);
    setCurrentView('incident');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setActiveTab('dashboard');
  };

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage onEnterDashboard={() => {
          setCurrentView('dashboard');
          setActiveTab('dashboard');
        }} />
      ) : currentView === 'dashboard' ? (
        <Dashboard 
          onBackToHome={() => setCurrentView('landing')} 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onReportClick={handleReportClick}
        />
      ) : currentView === 'topic' ? (
        <TopicModeling 
          onBackToHome={() => setCurrentView('landing')} 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      ) : currentView === 'trends' ? (
        <TrendAnalysis
          onBackToHome={() => setCurrentView('landing')} 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      ) : currentView === 'incident' ? (
        <IncidentReport
          onBackToHome={() => setCurrentView('landing')}
          onBackToDashboard={handleBackToDashboard}
          acn={selectedIncidentAcn}
        />
      ) : (
        <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-[#002E5D] mb-4">Search Feature</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </div>
      )}
    </>
  );
}