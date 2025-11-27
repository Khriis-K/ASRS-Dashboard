import { ArrowUpDown, FileText } from 'lucide-react';

interface ReportTableProps {
  onReportClick?: (acn: string) => void;
}

export function ReportTable({ onReportClick }: ReportTableProps) {
  const reports = [
    { acn: '1847562', date: '2024-05-12', location: 'SFO', type: 'Runway Incursion', severity: 'High' },
    { acn: '1847521', date: '2024-05-11', location: 'LAX', type: 'Taxi Deviation', severity: 'Medium' },
    { acn: '1847489', date: '2024-05-10', location: 'ORD', type: 'Communication Error', severity: 'Low' },
    { acn: '1847453', date: '2024-05-09', location: 'ATL', type: 'Hold Short Violation', severity: 'High' },
    { acn: '1847421', date: '2024-05-08', location: 'DFW', type: 'Clearance Confusion', severity: 'Medium' },
    { acn: '1847389', date: '2024-05-07', location: 'DEN', type: 'Runway Incursion', severity: 'High' },
    { acn: '1847356', date: '2024-05-06', location: 'JFK', type: 'ATC Miscommunication', severity: 'Medium' },
  ];

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