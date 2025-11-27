import { Header } from './dashboard-light/Header';
import { Sidebar } from './dashboard-light/Sidebar';
import { TimelineChart } from './dashboard-light/TimelineChart';
import { FactorsChart } from './dashboard-light/FactorsChart';
import { MapView } from './dashboard-light/MapView';
import { ReportTable } from './dashboard-light/ReportTable';

interface DashboardProps {
  onBackToHome: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onReportClick?: (acn: string) => void;
}

export function Dashboard({ onBackToHome, activeTab = 'dashboard', onTabChange, onReportClick }: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <Header onBackToHome={onBackToHome} activeTab={activeTab} onTabChange={onTabChange} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Top Row - Timeline Chart (Full Width) */}
          <div className="mb-8">
            <TimelineChart />
          </div>

          {/* Middle Row - Bar Chart & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <FactorsChart />
            <MapView />
          </div>

          {/* Bottom Row - Report Table (Full Width) */}
          <div>
            <ReportTable onReportClick={onReportClick} />
          </div>
        </main>
      </div>
    </div>
  );
}