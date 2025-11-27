import { ArrowUpDown, FileText } from 'lucide-react';
import { useIncidents } from '@/api/hooks';

interface ReportTableProps {
  onReportClick?: (acn: string) => void;
}

export function ReportTable({ onReportClick }: ReportTableProps) {
  const { data: response, loading, error } = useIncidents({ limit: 10 });

  const reports = response?.reports ?? [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[#002E5D] mb-1">Recent Incident Reports</h3>
            <p className="text-gray-600 text-sm">Loading...</p>
          </div>
        </div>
        <div className="h-[200px] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading reports...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[#002E5D] mb-1">Recent Incident Reports</h3>
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[#002E5D] mb-1">Recent Incident Reports</h3>
          <p className="text-gray-600 text-sm">Latest runway incursion events</p>
        </div>
        <button className="px-4 py-2 bg-[#990000] text-white rounded-lg hover:bg-[#7a0000] transition-colors">
          View All Reports
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                <button className="flex items-center gap-1 hover:text-[#002E5D]">
                  ACN <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                <button className="flex items-center gap-1 hover:text-[#002E5D]">
                  Date <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Location</th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Incident Type</th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Severity</th>
              <th className="text-left py-3 px-4 text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.acn}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-[#002E5D] font-mono font-semibold">{report.acn}</td>
                <td className="py-3 px-4 text-gray-700">{report.date}</td>
                <td className="py-3 px-4 text-gray-700">{report.location}</td>
                <td className="py-3 px-4 text-gray-700">{report.type}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                      report.severity
                    )}`}
                  >
                    {report.severity}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => onReportClick?.(report.acn)}
                    className="flex items-center gap-1 text-[#990000] hover:text-[#7a0000] transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}