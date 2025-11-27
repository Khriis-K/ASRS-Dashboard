import { ChevronRight } from 'lucide-react';

export function TopBar() {
  return (
    <div className="h-20 border-b border-white/10 backdrop-blur-sm bg-white/5 px-8 flex items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-slate-400 monospace">
        <span className="text-[#00d9ff]">Mission Control</span>
        <ChevronRight className="w-4 h-4" />
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Runway Incursion Analysis</span>
      </div>

      {/* Global KPIs */}
      <div className="flex gap-6">
        <div className="text-right">
          <div className="text-slate-500 uppercase tracking-wider monospace">Active Alerts</div>
          <div className="text-[#ff9500] monospace text-2xl">47</div>
        </div>
        <div className="w-px bg-white/10"></div>
        <div className="text-right">
          <div className="text-slate-500 uppercase tracking-wider monospace">Model Accuracy</div>
          <div className="text-[#00d9ff] monospace text-2xl">94.2%</div>
        </div>
        <div className="w-px bg-white/10"></div>
        <div className="text-right">
          <div className="text-slate-500 uppercase tracking-wider monospace">Status</div>
          <div className="text-green-400 monospace text-2xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            LIVE
          </div>
        </div>
      </div>
    </div>
  );
}
