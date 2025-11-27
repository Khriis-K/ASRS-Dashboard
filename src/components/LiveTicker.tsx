export function LiveTicker() {
  const tickerItems = [
    'Live Ingestion: 5,426 Reports Processed',
    'Identifying Pattern: Pilot Error',
    'Region: SFO',
    'Model Confidence: 94.2%',
    'Temporal Cluster Detected: 2018-2020',
    'Risk Factor: Weather Conditions',
    'Airport: JFK',
    'Processing Narrative #3,847',
    'Topic Model: Converged',
    'Semantic Match Found: 97.8%',
  ];

  return (
    <div className="relative overflow-hidden bg-black/40 backdrop-blur-sm border-y border-[#00d9ff]/30 py-4">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d9ff]/10 to-transparent"></div>
      
      <div className="flex animate-scroll">
        {/* First set */}
        <div className="flex shrink-0">
          {tickerItems.map((item, index) => (
            <div key={`ticker-1-${index}`} className="flex items-center px-8">
              <div className="w-2 h-2 rounded-full bg-[#00d9ff] mr-4 animate-pulse"></div>
              <span className="monospace text-[#00d9ff] whitespace-nowrap">{item}</span>
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0">
          {tickerItems.map((item, index) => (
            <div key={`ticker-2-${index}`} className="flex items-center px-8">
              <div className="w-2 h-2 rounded-full bg-[#00d9ff] mr-4 animate-pulse"></div>
              <span className="monospace text-[#00d9ff] whitespace-nowrap">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
