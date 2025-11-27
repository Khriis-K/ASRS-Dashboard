import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useFactors } from '@/api/hooks';

export function FactorsChart() {
  const { data: response, loading, error } = useFactors({ limit: 5 });

  // Transform API response to chart format
  const chartData = response?.factors ?? [];

  const getColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#990000';
      case 'medium': return '#002E5D';
      case 'low': return '#6b7280';
      default: return '#002E5D';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Top Contributing Factors</h3>
          <p className="text-gray-600">Loading...</p>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading factors data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Top Contributing Factors</h3>
          <p className="text-red-600">Error loading data: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-[#002E5D] mb-2">Top Contributing Factors</h3>
        <p className="text-gray-600">Comparative analysis of primary incident causes</p>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            type="number"
            stroke="#6b7280"
            style={{ fontSize: '13px' }}
          />
          <YAxis 
            type="category"
            dataKey="factor" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            width={150}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: '#002E5D', fontWeight: 'bold' }}
          />
          <Bar 
            dataKey="count" 
            radius={[0, 4, 4, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.risk)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#990000] rounded"></div>
          <span className="text-gray-600">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#002E5D] rounded"></div>
          <span className="text-gray-600">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#6b7280] rounded"></div>
          <span className="text-gray-600">Low Risk</span>
        </div>
      </div>
    </div>
  );
}
