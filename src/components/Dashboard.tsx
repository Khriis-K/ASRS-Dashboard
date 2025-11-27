import { Sidebar } from './dashboard/Sidebar';
import { TopBar } from './dashboard/TopBar';
import { MapView } from './dashboard/MapView';
import { TimelineChart } from './dashboard/TimelineChart';
import { FactorsChart } from './dashboard/FactorsChart';
import { RecentAlerts } from './dashboard/RecentAlerts';

interface DashboardProps {
  onBackToHome: () => void;
}

export function Dashboard({ onBackToHome }: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
          `,
        }}></div>
      </div>

      {/* Sidebar */}
      <Sidebar onBackToHome={onBackToHome} />

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <TopBar />

        {/* Main Dashboard Area */}
        <main className="p-8 relative z-10">
          {/* Map Section */}
          <div className="mb-8">
            <MapView />
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Timeline Chart - Full Width on Large Screens */}
            <div className="lg:col-span-2">
              <TimelineChart />
            </div>

            {/* Factors Chart */}
            <div>
              <FactorsChart />
            </div>

            {/* Recent Alerts */}
            <div>
              <RecentAlerts />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
