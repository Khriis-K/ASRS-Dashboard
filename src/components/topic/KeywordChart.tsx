import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface KeywordChartProps {
  topicId: number;
}

export function KeywordChart({ topicId }: KeywordChartProps) {
  // Different keywords for different topics
  const topicKeywords: Record<number, Array<{ keyword: string; weight: number }>> = {
    1: [
      { keyword: 'runway', weight: 0.92 },
      { keyword: 'incursion', weight: 0.88 },
      { keyword: 'crossed', weight: 0.85 },
      { keyword: 'hold', weight: 0.82 },
      { keyword: 'short', weight: 0.78 },
      { keyword: 'clearance', weight: 0.75 },
      { keyword: 'taxiway', weight: 0.71 },
      { keyword: 'line', weight: 0.68 },
      { keyword: 'active', weight: 0.65 },
      { keyword: 'entered', weight: 0.62 },
    ],
    2: [
      { keyword: 'communication', weight: 0.90 },
      { keyword: 'tower', weight: 0.87 },
      { keyword: 'frequency', weight: 0.84 },
      { keyword: 'radio', weight: 0.80 },
      { keyword: 'atc', weight: 0.77 },
      { keyword: 'misheard', weight: 0.73 },
      { keyword: 'readback', weight: 0.70 },
      { keyword: 'instruction', weight: 0.67 },
      { keyword: 'contact', weight: 0.64 },
      { keyword: 'frequency', weight: 0.61 },
    ],
    3: [
      { keyword: 'clearance', weight: 0.91 },
      { keyword: 'authorized', weight: 0.86 },
      { keyword: 'permission', weight: 0.83 },
      { keyword: 'approval', weight: 0.79 },
      { keyword: 'granted', weight: 0.76 },
      { keyword: 'instruction', weight: 0.72 },
      { keyword: 'proceed', weight: 0.69 },
      { keyword: 'taxi', weight: 0.66 },
      { keyword: 'route', weight: 0.63 },
      { keyword: 'path', weight: 0.60 },
    ],
  };

  const data = topicKeywords[topicId] || topicKeywords[1];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-[#002E5D] mb-2">Semantic Signature</h3>
        <p className="text-gray-600">Top 10 Keywords for Topic {topicId}</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            type="number"
            domain={[0, 1]}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: 'Relevance Weight', position: 'insideBottom', offset: -5, style: { fill: '#6b7280' } }}
          />
          <YAxis 
            type="category"
            dataKey="keyword" 
            stroke="#6b7280"
            style={{ fontSize: '13px' }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => value.toFixed(3)}
          />
          <Bar 
            dataKey="weight" 
            fill="#002E5D"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
