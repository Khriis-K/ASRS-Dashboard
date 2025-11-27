import { Sparkles, TrendingUp } from 'lucide-react';
import { useEmergingPatterns } from '@/api/hooks';

export function EmergingPatterns() {
  const { data: response, loading, error } = useEmergingPatterns();
  
  const patterns = response?.patterns ?? [];
  const analysisMethod = response?.analysis_method ?? 'Temporal Topic Modeling';

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#990000]" />
              <h3 className="text-[#002E5D]">Emerging Patterns</h3>
            </div>
            <p className="text-gray-600 text-sm">Loading...</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-5 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#990000]" />
            <h3 className="text-[#002E5D]">Emerging Patterns</h3>
          </div>
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      </div>
    );
  }

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
          <p className="text-[#002E5D] font-semibold">{analysisMethod}</p>
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
                Topic {pattern.topic_id}: {pattern.topic_label}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {pattern.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Reports</p>
                <p className="text-[#002E5D] font-semibold">{pattern.report_count}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">First Detected</p>
                <p className="text-gray-700 font-medium text-sm">{pattern.first_appeared}</p>
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