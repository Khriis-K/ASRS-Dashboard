import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function FactorsChart() {
  const data = [
    { factor: 'Situational Awareness', count: 487 },
    { factor: 'Communication', count: 412 },
    { factor: 'Distraction', count: 356 },
    { factor: 'Procedure Adherence', count: 298 },
    { factor: 'Weather Conditions', count: 234 },
  ];

  return (
    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      {/* HUD Crosshairs */}
      <div className="absolute top-4 left-4 text-[#00d9ff] text-xl">+</div>
      <div className="absolute top-4 right-4 text-[#00d9ff] text-xl">+</div>
      <div className="absolute bottom-4 left-4 text-[#00d9ff] text-xl">+</div>
      <div className="absolute bottom-4 right-4 text-[#00d9ff] text-xl">+</div>

      <h4 className="text-white mb-6">Top Contributing Factors</h4>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            type="number"
            stroke="#64748b"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
          />
          <YAxis 
            type="category"
            dataKey="factor" 
            stroke="#64748b"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}
            width={150}
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
          <Bar 
            dataKey="count" 
            fill="url(#barGradient)"
            radius={[0, 8, 8, 0]}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00d9ff" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#0099cc" stopOpacity={1}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
