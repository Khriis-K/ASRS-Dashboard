export function MapView() {
  const airports = [
    { code: 'SFO', x: '15%', y: '40%', risk: 'medium', incidents: 342 },
    { code: 'LAX', x: '18%', y: '58%', risk: 'high', incidents: 487 },
    { code: 'JFK', x: '82%', y: '35%', risk: 'high', incidents: 521 },
    { code: 'ORD', x: '68%', y: '32%', risk: 'medium', incidents: 398 },
    { code: 'ATL', x: '75%', y: '55%', risk: 'low', incidents: 156 },
    { code: 'DFW', x: '58%', y: '62%', risk: 'medium', incidents: 289 },
    { code: 'DEN', x: '42%', y: '38%', risk: 'low', incidents: 178 },
    { code: 'SEA', x: '12%', y: '20%', risk: 'low', incidents: 134 },
    { code: 'MIA', x: '80%', y: '82%', risk: 'medium', incidents: 267 },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#ff3b3b';
      case 'medium': return '#ff9500';
      case 'low': return '#00ff88';
      default: return '#00d9ff';
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      {/* HUD Corner Elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00d9ff]/50"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00d9ff]/50"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00d9ff]/50"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00d9ff]/50"></div>

      {/* Crosshairs */}
      <div className="absolute top-4 left-4">
        <div className="text-[#00d9ff] text-2xl">+</div>
      </div>
      <div className="absolute top-4 right-4">
        <div className="text-[#00d9ff] text-2xl">+</div>
      </div>

      {/* Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 backdrop-blur-sm bg-black/40 px-6 py-2 rounded-full border border-[#00d9ff]/30">
        <h4 className="text-white monospace">Geospatial Intelligence</h4>
      </div>

      {/* HUD Info Box */}
      <div className="absolute top-20 right-6 backdrop-blur-xl bg-black/60 rounded-lg border border-[#00d9ff]/30 p-4 min-w-[200px]">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 monospace">Active Region</span>
            <span className="text-white monospace">National</span>
          </div>
          <div className="h-px bg-white/10"></div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 monospace">Total Incidents</span>
            <span className="text-[#00d9ff] monospace">2,450</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 monospace">High Risk</span>
            <span className="text-[#ff3b3b] monospace">234</span>
          </div>
        </div>
      </div>

      {/* Simplified US Map Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg viewBox="0 0 1000 600" className="w-full h-full">
          <path
            d="M 100 300 L 200 250 L 300 280 L 450 260 L 600 240 L 750 280 L 850 300 L 880 350 L 850 420 L 700 450 L 550 430 L 400 460 L 250 440 L 150 400 L 100 350 Z"
            fill="none"
            stroke="rgba(0, 217, 255, 0.3)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Airport Markers */}
      {airports.map((airport) => {
        const color = getRiskColor(airport.risk);
        return (
          <div
            key={airport.code}
            className="absolute group cursor-pointer"
            style={{ left: airport.x, top: airport.y, transform: 'translate(-50%, -50%)' }}
          >
            {/* Pulse rings */}
            <div className="absolute inset-0 -m-4">
              <div
                className="w-8 h-8 rounded-full animate-ping opacity-75"
                style={{ backgroundColor: color }}
              ></div>
            </div>
            
            {/* Main marker */}
            <div
              className="relative w-4 h-4 rounded-full border-2 border-white z-10"
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 20px ${color}`
              }}
            ></div>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="backdrop-blur-xl bg-black/80 rounded-lg border border-white/20 p-3 whitespace-nowrap">
                <div className="text-white monospace mb-1">{airport.code}</div>
                <div className="text-slate-400 monospace text-sm">{airport.incidents} incidents</div>
                <div className="text-sm monospace" style={{ color }}>
                  {airport.risk.toUpperCase()} RISK
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-6 left-6 backdrop-blur-xl bg-black/60 rounded-lg border border-white/20 p-4">
        <div className="text-slate-400 monospace mb-3 uppercase tracking-wider">Risk Level</div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#ff3b3b]" style={{ boxShadow: '0 0 10px #ff3b3b' }}></div>
            <span className="text-slate-300 monospace">High</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#ff9500]" style={{ boxShadow: '0 0 10px #ff9500' }}></div>
            <span className="text-slate-300 monospace">Medium</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#00ff88]" style={{ boxShadow: '0 0 10px #00ff88' }}></div>
            <span className="text-slate-300 monospace">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}
