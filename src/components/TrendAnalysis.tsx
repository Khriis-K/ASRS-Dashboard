import { useState } from 'react';
import { Header } from './dashboard-light/Header';
import { TrendControlBar } from './trend/TrendControlBar';
import { DeltaKPIs } from './trend/DeltaKPIs';
import { ComparisonChart } from './trend/ComparisonChart';
import { EmergingPatterns } from './trend/EmergingPatterns';

interface TrendAnalysisProps {
  onBackToHome: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TrendAnalysis({ onBackToHome, activeTab = 'trends', onTabChange }: TrendAnalysisProps) {
  const [view, setView] = useState<'factors' | 'topics'>('factors');

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <Header onBackToHome={onBackToHome} activeTab={activeTab} onTabChange={onTabChange} />

      {/* Control Bar */}
      <TrendControlBar view={view} onViewChange={setView} />

      {/* Main Content */}
      <main className="p-8">
        {/* Delta KPIs */}
        <DeltaKPIs />

        {/* Comparison Chart */}
        <div className="mb-8">
          <ComparisonChart view={view} />
        </div>

        {/* Emerging Patterns */}
        <EmergingPatterns />
      </main>
    </div>
  );
}
