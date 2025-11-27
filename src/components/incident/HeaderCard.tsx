import { Calendar, Clock, Plane, CloudSun, Download, Flag } from 'lucide-react';

interface HeaderCardProps {
  acn: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  date: string;
  time: string;
  aircraft: string;
  weather: string;
}

export function HeaderCard({ acn, title, severity, date, time, aircraft, weather }: HeaderCardProps) {
  const severityColors = {
    High: 'bg-red-100 text-red-800 border-red-300',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Low: 'bg-green-100 text-green-800 border-green-300',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[#002E5D] text-2xl">{title}</h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityColors[severity]}`}
            >
              {severity} Severity
            </span>
          </div>
          <p className="text-gray-600">Report ACN: {acn}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-[#002E5D] text-[#002E5D] rounded-lg hover:bg-[#002E5D] hover:text-white transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button className="px-4 py-2 border border-[#990000] text-[#990000] rounded-lg hover:bg-[#990000] hover:text-white transition-colors flex items-center gap-2">
            <Flag className="w-4 h-4" />
            Flag for Review
          </button>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-4 gap-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#002E5D]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-gray-900 font-medium">{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#002E5D]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Time (Local)</p>
            <p className="text-gray-900 font-medium">{time}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Plane className="w-5 h-5 text-[#002E5D]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Aircraft</p>
            <p className="text-gray-900 font-medium">{aircraft}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <CloudSun className="w-5 h-5 text-[#002E5D]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Weather</p>
            <p className="text-gray-900 font-medium">{weather}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
