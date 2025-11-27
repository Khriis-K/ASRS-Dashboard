import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTopicKeywords } from '@/api/hooks';

interface KeywordChartProps {
  topicId: number;
}

export function KeywordChart({ topicId }: KeywordChartProps) {
  const { data: response, loading, error } = useTopicKeywords(topicId, 10);
  
  const keywords = response?.keywords ?? [];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Semantic Signature</h3>
          <p className="text-gray-600">Loading keywords for Topic {topicId}...</p>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Semantic Signature</h3>
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-[#002E5D] mb-2">Semantic Signature</h3>
        <p className="text-gray-600">Top 10 Keywords for Topic {topicId}</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={keywords} layout="vertical">
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
