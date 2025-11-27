import { Sparkles, TrendingUp } from 'lucide-react';

export function EmergingPatterns() {
  const patterns = [
    {
      topic: 'Topic 4: Electronic Flight Bag (EFB) Distraction',
      description: 'New cluster associated with iPad/Tablet usage during taxi operations. Pilots report distraction from navigational apps and digital charts.',
      reportCount: 247,
      firstAppeared: 'Q2 2018',
      growth: '+156% since 2020',
    },
    {
      topic: 'Topic 7: Remote Tower Operations',
      description: 'Emerging pattern related to remote/virtual tower control systems. Communication delays and video feed quality issues cited.',
      reportCount: 89,
      firstAppeared: 'Q4 2021',
      growth: '+89% since 2022',
    },
    {
      topic: 'Topic 11: Multi-Frequency Confusion',
      description: 'Incidents involving confusion when switching between multiple ATC frequencies during complex taxi routes at major hubs.',
      reportCount: 312,
      firstAppeared: 'Q1 2019',
      growth: '+124% since 2019',
    },
    {
      topic: 'Topic 14: NextGen Procedure Adaptation',
      description: 'Reports related to pilot adaptation challenges with NextGen navigation procedures and RNAV taxi routes.',
      reportCount: 178,
      firstAppeared: 'Q3 2020',
      growth: '+78% since 2021',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#990000]" />
            <h3 className="text-[#002E5D]">Emerging Patterns</h3>
          </div>
          <p className="text-gray-600 text-sm">
            New Risk Vectors Identified (Post-2017)
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
          <p className="text-xs text-gray-600">Analysis Method</p>
          <p className="text-[#002E5D] font-semibold">Temporal Topic Modeling</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {patterns.map((pattern, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-[#002E5D] hover:shadow-md transition-all group"
          >
            {/* Topic Header */}
            <div className="mb-3">
              <h4 className="text-[#002E5D] font-semibold mb-1 group-hover:text-[#990000] transition-colors">
                {pattern.topic}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {pattern.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Reports</p>
                <p className="text-[#002E5D] font-semibold">{pattern.reportCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">First Detected</p>
                <p className="text-gray-700 font-medium text-sm">{pattern.firstAppeared}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Growth Rate</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#990000]" />
                  <p className="text-[#990000] font-semibold text-sm">{pattern.growth}</p>
                </div>
              </div>
            </div>

            {/* New Badge */}
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 bg-[#990000] text-white px-2 py-1 rounded text-xs font-semibold">
                <Sparkles className="w-3 h-3" />
                New Risk Vector
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-gray-500 text-xs text-center">
          These patterns were absent or statistically insignificant in the 2012-2017 baseline period.
          Statistical significance threshold: p {'<'} 0.05
        </p>
      </div>
    </div>
  );
}