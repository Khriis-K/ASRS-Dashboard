import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function TimelineChart() {
  const data = [
    { year: '2001', incidents: 145 },
    { year: '2004', incidents: 168 },
    { year: '2007', incidents: 192 },
    { year: '2010', incidents: 205 },
    { year: '2013', incidents: 187 },
    { year: '2016', incidents: 224 },
    { year: '2019', incidents: 268 },
    { year: '2022', incidents: 312 },
    { year: '2025', incidents: 356 },
  ];

  return (
    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      {/* HUD Crosshairs */}
      <div className="absolute top-4 left-4 text-[#00d9ff] text-xl">+</div>
      <div className="absolute top-4 right-4 text-[#00d9ff] text-xl">+</div>
      <div className="absolute bottom-4 left-4 text-[#00d9ff] text-xl">+</div>
      <div className="absolute bottom-4 right-4 text-[#00d9ff] text-xl">+</div>

      <h4 className="text-white mb-6">Incident Frequency (2001-2025)</h4>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="year" 
            stroke="#64748b"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
          />
          <YAxis 
            stroke="#64748b"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              borderRadius: '8px',
              fontFamily: 'JetBrains Mono, monospace',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="incidents" 
            stroke="#00d9ff" 
            strokeWidth={3}
            dot={{ fill: '#00d9ff', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, fill: '#00d9ff', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
