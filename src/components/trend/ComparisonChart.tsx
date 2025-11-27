import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTrendComparison } from '@/api/hooks';

interface ComparisonChartProps {
  view: 'factors' | 'topics';
}

export function ComparisonChart({ view }: ComparisonChartProps) {
  const { data: response, loading, error } = useTrendComparison({ view });
  
  const data = response?.data ?? [];
  const periods = response?.periods ?? { baseline: '2012-2017', inference: '2018-2025' };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <p className="text-[#002E5D] font-semibold mb-2">{data.category}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <span className="inline-block w-3 h-3 bg-gray-400 rounded mr-2"></span>
              Baseline (2012-2017): <span className="font-semibold">{data.baseline}%</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="inline-block w-3 h-3 bg-[#002E5D] rounded mr-2"></span>
              Inference (2018-2025): <span className="font-semibold">{data.inference}%</span>
            </p>
            <div className="pt-2 mt-2 border-t border-gray-200">
              <p className={`text-sm font-semibold ${data.variance > 0 ? 'text-[#990000]' : 'text-green-700'}`}>
                Variance: {data.variance > 0 ? '+' : ''}{data.variance}%
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Get greatest change from API response or calculate
  const maxVarianceItem = response?.greatest_change ?? 
    (data.length > 0 
      ? data.reduce((prev, current) => Math.abs(current.variance) > Math.abs(prev.variance) ? current : prev)
      : { category: 'N/A', variance: 0 });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Comparative Risk Distribution</h3>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
        <div className="h-[450px] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading comparison data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Comparative Risk Distribution</h3>
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-[#002E5D] mb-2">Comparative Risk Distribution</h3>
        <p className="text-gray-600 text-sm">
          Percentage of reports by {view === 'factors' ? 'contributing factor' : 'topic cluster'}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            type="number"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: 'Percentage of Reports (%)', position: 'insideBottom', offset: -5, style: { fill: '#6b7280' } }}
          />
          <YAxis 
            type="category"
            dataKey="category" 
            stroke="#6b7280"
            style={{ fontSize: '13px' }}
            width={140}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
          />
          <Bar 
            dataKey="baseline" 
            fill="#9ca3af" 
            name={`Baseline (${periods.baseline})`}
            radius={[0, 4, 4, 0]}
          />
          <Bar 
            dataKey="inference" 
            fill="#002E5D" 
            name={`Inference (${periods.inference})`}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Variance Annotation */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${maxVarianceItem.variance > 0 ? 'bg-red-100' : 'bg-green-100'} flex items-center justify-center`}>
              {maxVarianceItem.variance > 0 ? (
                <ArrowUp className="w-5 h-5 text-[#990000]" />
              ) : (
                <ArrowDown className="w-5 h-5 text-green-700" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">Greatest Change Detected</p>
              <p className="text-[#002E5D] font-semibold">{maxVarianceItem.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Variance</p>
            <p className={`text-2xl font-bold ${maxVarianceItem.variance > 0 ? 'text-[#990000]' : 'text-green-700'}`}>
              {maxVarianceItem.variance > 0 ? '+' : ''}{maxVarianceItem.variance}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
