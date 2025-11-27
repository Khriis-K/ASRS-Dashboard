import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export function TimelineChart() {
  const data = [
    { year: 2001, incidents: 145 },
    { year: 2003, incidents: 168 },
    { year: 2005, incidents: 182 },
    { year: 2007, incidents: 192 },
    { year: 2009, incidents: 178 },
    { year: 2011, incidents: 205 },
    { year: 2013, incidents: 187 },
    { year: 2015, incidents: 198 },
    { year: 2017, incidents: 224 },
    { year: 2019, incidents: 268 },
    { year: 2021, incidents: 285 },
    { year: 2023, incidents: 312 },
    { year: 2025, incidents: 356 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-[#002E5D] mb-2">Incident Frequency Over Time (2001-2025)</h3>
        <p className="text-gray-600">Longitudinal analysis showing increasing trend in reported runway incursions</p>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            stroke="#6b7280"
            style={{ fontSize: '13px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '13px' }}
            label={{ value: 'Number of Incidents', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
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
          {/* 2017 Benchmark Line */}
          <ReferenceLine 
            x={2017} 
            stroke="#990000" 
            strokeDasharray="5 5" 
            strokeWidth={2}
            label={{ 
              value: 'Benchmark / Inference Split (2017)', 
              position: 'top',
              fill: '#990000',
              fontSize: 12,
              fontWeight: 'bold'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="incidents" 
            stroke="#002E5D" 
            strokeWidth={3}
            dot={{ fill: '#002E5D', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, fill: '#002E5D', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#002E5D]"></div>
          <span className="text-gray-600">Incident Trend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#990000] border-dashed"></div>
          <span className="text-gray-600">Training/Inference Split</span>
        </div>
      </div>
    </div>
  );
}
