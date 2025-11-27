interface TrendControlBarProps {
  view: 'factors' | 'topics';
  onViewChange: (view: 'factors' | 'topics') => void;
}

export function TrendControlBar({ view, onViewChange }: TrendControlBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#002E5D] mb-1">Longitudinal Trend Analysis</h2>
          <p className="text-gray-600 text-sm">Comparing risk patterns across time periods (2012-2025)</p>
        </div>

        {/* Segmented Control */}
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewChange('factors')}
            className={`px-6 py-2 rounded-md transition-all ${
              view === 'factors'
                ? 'bg-white text-[#002E5D] shadow-sm font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            View by Contributing Factors
          </button>
          <button
            onClick={() => onViewChange('topics')}
            className={`px-6 py-2 rounded-md transition-all ${
              view === 'topics'
                ? 'bg-white text-[#002E5D] shadow-sm font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            View by Topic Clusters
          </button>
        </div>
      </div>
    </div>
  );
}
