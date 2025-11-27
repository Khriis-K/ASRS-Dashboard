import { AlertCircle, Clock } from 'lucide-react';

export function RecentAlerts() {
  const alerts = [
    {
      id: 'INC-2025-0847',
      title: 'RWY 28L Incursion - Pilot Deviation',
      airport: 'SFO',
      time: '2h ago',
      severity: 'high'
    },
    {
      id: 'INC-2025-0846',
      title: 'Vehicle on Active Taxiway - Ground Ops',
      airport: 'LAX',
      time: '4h ago',
      severity: 'medium'
    },
    {
      id: 'INC-2025-0845',
      title: 'Near Miss - Crossing Clearance Error',
      airport: 'JFK',
      time: '6h ago',
      severity: 'high'
    },
    {
      id: 'INC-2025-0844',
      title: 'Taxiway Marking Confusion',
      airport: 'ORD',
      time: '8h ago',
      severity: 'low'
    },
    {
      id: 'INC-2025-0843',
      title: 'ATC Communication Breakdown',
      airport: 'ATL',
      time: '10h ago',
      severity: 'medium'
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-[#ff3b3b] border-[#ff3b3b]/30 bg-[#ff3b3b]/5';
      case 'medium': return 'text-[#ff9500] border-[#ff9500]/30 bg-[#ff9500]/5';
      case 'low': return 'text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/5';
      default: return 'text-[#00d9ff] border-[#00d9ff]/30 bg-[#00d9ff]/5';
    }
  };

  return (
    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      {/* HUD Crosshairs */}
      <div className="absolute top-4 left-4 text-[#00d9ff] text-xl">+</div>
      <div className="absolute top-4 right-4 text-[#00d9ff] text-xl">+</div>

      <h4 className="text-white mb-6 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-[#ff9500]" />
        Recent Alerts
      </h4>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 hover:bg-white/5 transition-all cursor-pointer ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="monospace text-xs text-slate-500">{alert.id}</span>
              <span className="monospace text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {alert.time}
              </span>
            </div>
            <div className="text-white mb-2">{alert.title}</div>
            <div className="flex items-center gap-2">
              <span className="monospace text-sm bg-white/10 px-2 py-1 rounded">
                {alert.airport}
              </span>
              <span className={`monospace text-xs uppercase px-2 py-1 rounded ${getSeverityColor(alert.severity)}`}>
                {alert.severity}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 217, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 217, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
