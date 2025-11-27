import { Search, TrendingUp } from 'lucide-react';

interface SimilarIncident {
  acn: string;
  location: string;
  similarity: number;
  matchReason: string;
}

interface SimilarIncidentsProps {
  incidents: SimilarIncident[];
  onIncidentClick?: (acn: string) => void;
}

export function SimilarIncidents({ incidents, onIncidentClick }: SimilarIncidentsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search specific terms..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#002E5D] focus:outline-none focus:ring-2 focus:ring-[#002E5D]/20 text-sm"
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-4">
        <h3 className="text-[#002E5D] mb-1">Semantic Similarities</h3>
        <p className="text-gray-600 text-sm">Similar Incidents (Vector Match)</p>
      </div>

      {/* Incident Cards */}
      <div className="space-y-3">
        {incidents.map((incident) => (
          <button
            key={incident.acn}
            onClick={() => onIncidentClick?.(incident.acn)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-[#002E5D] hover:bg-blue-50 transition-all text-left group"
          >
            {/* ACN and Location */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[#002E5D] font-semibold font-mono text-sm">
                  ACN {incident.acn}
                </p>
                <p className="text-gray-600 text-sm">{incident.location}</p>
              </div>
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                <TrendingUp className="w-3 h-3" />
                {incident.similarity}% Match
              </div>
            </div>

            {/* Match Reason */}
            <div className="flex items-start gap-2 bg-white border border-gray-200 rounded p-2 group-hover:border-[#002E5D] transition-colors">
              <div className="w-1 h-1 rounded-full bg-[#990000] mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Pattern Match:</p>
                <p className="text-gray-700 text-sm">{incident.matchReason}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-gray-500 text-xs text-center">
          Powered by Semantic Vector Similarity (Cosine Distance)
        </p>
      </div>
    </div>
  );
}
