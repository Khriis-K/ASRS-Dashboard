export function MapView() {
  const airports = [
    { code: 'SFO', x: '15%', y: '40%', incidents: 342, risk: 'medium' },
    { code: 'LAX', x: '18%', y: '58%', incidents: 487, risk: 'high' },
    { code: 'JFK', x: '82%', y: '35%', incidents: 521, risk: 'high' },
    { code: 'ORD', x: '68%', y: '32%', incidents: 398, risk: 'medium' },
    { code: 'ATL', x: '75%', y: '55%', incidents: 156, risk: 'low' },
    { code: 'DFW', x: '58%', y: '62%', incidents: 289, risk: 'medium' },
    { code: 'DEN', x: '42%', y: '38%', incidents: 178, risk: 'low' },
    { code: 'SEA', x: '12%', y: '20%', incidents: 134, risk: 'low' },
    { code: 'MIA', x: '80%', y: '82%', incidents: 267, risk: 'medium' },
    { code: 'PHX', x: '25%', y: '58%', incidents: 195, risk: 'low' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#990000';
      case 'medium': return '#002E5D';
      case 'low': return '#6b7280';
      default: return '#002E5D';
    }
  };

  const getRiskSize = (risk: string) => {
    switch (risk) {
      case 'high': return 'w-6 h-6';
      case 'medium': return 'w-5 h-5';
      case 'low': return 'w-4 h-4';
      default: return 'w-5 h-5';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-[#002E5D] mb-2">Geospatial Distribution of Incidents</h3>
        <p className="text-gray-600">Regional clustering analysis across United States airports</p>
      </div>

      <div className="relative w-full h-[400px] bg-gray-50 rounded-lg border border-gray-200">
        {/* Simplified US Map Outline */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
          <path
            d="M 100 300 L 150 250 L 200 240 L 250 260 L 300 250 L 400 220 L 500 200 L 600 210 L 700 240 L 800 270 L 850 300 L 880 350 L 870 400 L 850 430 L 800 450 L 700 460 L 600 450 L 500 470 L 400 480 L 300 470 L 200 450 L 150 420 L 120 380 L 100 340 Z"
            fill="none"
            stroke="#002E5D"
            strokeWidth="2"
          />
        </svg>

        {/* Grid Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 46, 93, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 46, 93, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Airport Markers */}
        {airports.map((airport) => {
          const color = getRiskColor(airport.risk);
          const sizeClass = getRiskSize(airport.risk);
          return (
            <div
              key={airport.code}
              className="absolute group cursor-pointer"
              style={{ left: airport.x, top: airport.y, transform: 'translate(-50%, -50%)' }}
            >
              {/* Circle Marker */}
              <div
                className={`${sizeClass} rounded-full border-2 border-white shadow-md relative z-10`}
                style={{ backgroundColor: color }}
              ></div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-3 whitespace-nowrap">
                  <div className="text-[#002E5D] mb-1">{airport.code}</div>
                  <div className="text-gray-600 text-sm">{airport.incidents} incidents</div>
                  <div className="text-sm capitalize" style={{ color }}>
                    {airport.risk} risk
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="text-gray-700 mb-3 uppercase tracking-wider text-xs">Risk Level</div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#990000] border border-white shadow-sm"></div>
              <span className="text-gray-600 text-sm">High ({'>'}400)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#002E5D] border border-white shadow-sm"></div>
              <span className="text-gray-600 text-sm">Medium (200-400)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#6b7280] border border-white shadow-sm"></div>
              <span className="text-gray-600 text-sm">Low ({'<'}200)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}