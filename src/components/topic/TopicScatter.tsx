import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TopicScatterProps {
  selectedTopic: number;
  onTopicSelect: (topic: number) => void;
}

export function TopicScatter({ selectedTopic, onTopicSelect }: TopicScatterProps) {
  const topics = [
    { id: 1, x: 15, y: 65, size: 180, label: 'RWY Incursion' },
    { id: 2, x: 45, y: 75, size: 150, label: 'Communication' },
    { id: 3, x: 70, y: 60, size: 140, label: 'Clearance' },
    { id: 4, x: 25, y: 35, size: 120, label: 'Taxi Error' },
    { id: 5, x: 80, y: 25, size: 110, label: 'Hold Short' },
    { id: 6, x: 55, y: 40, size: 100, label: 'Weather' },
    { id: 7, x: 35, y: 55, size: 95, label: 'ATC' },
    { id: 8, x: 60, y: 80, size: 85, label: 'Equipment' },
    { id: 9, x: 85, y: 45, size: 75, label: 'Lighting' },
    { id: 10, x: 40, y: 20, size: 70, label: 'Training' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-[#002E5D] font-semibold">Topic {data.id}</p>
          <p className="text-gray-600 text-sm">{data.label}</p>
          <p className="text-gray-500 text-xs mt-1">{data.size} documents</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="mb-6">
        <h3 className="text-[#002E5D] mb-2">Topic Landscape</h3>
        <p className="text-gray-600">Intertopic Distance Map (2D projection)</p>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="PC1" 
            domain={[0, 100]}
            stroke="#6b7280"
            label={{ value: 'Principal Component 1', position: 'insideBottom', offset: -10, style: { fill: '#6b7280' } }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="PC2" 
            domain={[0, 100]}
            stroke="#6b7280"
            label={{ value: 'Principal Component 2', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            data={topics} 
            onClick={(data) => onTopicSelect(data.id)}
            cursor="pointer"
          >
            {topics.map((entry) => (
              <Cell
                key={`cell-${entry.id}`}
                fill={selectedTopic === entry.id ? '#990000' : '#6b7280'}
                fillOpacity={selectedTopic === entry.id ? 0.9 : 0.6}
                stroke={selectedTopic === entry.id ? '#990000' : '#4b5563'}
                strokeWidth={selectedTopic === entry.id ? 3 : 1}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#6b7280] opacity-60 border border-gray-500"></div>
          <span className="text-gray-600">Unselected Topic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#990000] opacity-90 border-2 border-[#990000]"></div>
          <span className="text-gray-600">Selected Topic</span>
        </div>
      </div>

      {/* Topic Labels */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-sm italic">
          Click on any topic bubble to view its semantic signature and representative narratives
        </p>
      </div>
    </div>
  );
}
