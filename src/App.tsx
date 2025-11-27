import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage onEnterDashboard={() => setCurrentView('dashboard')} />
      ) : (
        <Dashboard onBackToHome={() => setCurrentView('landing')} />
      )}
    </>
  );
}
