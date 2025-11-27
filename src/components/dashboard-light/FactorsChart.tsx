import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function FactorsChart() {
  const data = [
    { factor: 'Situational Awareness', count: 487, risk: 'high' },
    { factor: 'Communication', count: 412, risk: 'high' },
    { factor: 'Procedure Adherence', count: 356, risk: 'medium' },
    { factor: 'Weather Conditions', count: 298, risk: 'medium' },
    { factor: 'Equipment Issues', count: 234, risk: 'low' },
  ];

  const getColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#990000';
      case 'medium': return '#002E5D';
      case 'low': return '#6b7280';
      default: return '#002E5D';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-[#002E5D] mb-2">Top Contributing Factors</h3>
        <p className="text-gray-600">Comparative analysis of primary incident causes</p>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
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
            {data.map((entry, index) => (
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
