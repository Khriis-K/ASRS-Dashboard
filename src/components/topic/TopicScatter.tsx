import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTopics } from '@/api/hooks';

interface TopicScatterProps {
  selectedTopic: number;
  onTopicSelect: (topic: number) => void;
  model?: 'lda' | 'bert';
}

export function TopicScatter({ selectedTopic, onTopicSelect, model = 'lda' }: TopicScatterProps) {
  const { data: response, loading, error } = useTopics({ model });
  
  const topics = response?.topics ?? [];
  
  // Calculate size range for bubble scaling
  const sizes = topics.map(t => t.size);
  const minSize = Math.min(...sizes, 50);
  const maxSize = Math.max(...sizes, 500);

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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Topic Landscape</h3>
          <p className="text-gray-600">Loading...</p>
        </div>
        <div className="h-[500px] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading topics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Topic Landscape</h3>
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      </div>
    );
  }

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
          <ZAxis 
            type="number" 
            dataKey="size" 
            domain={[minSize, maxSize]} 
            range={[200, 1500]}
            name="Documents"
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
