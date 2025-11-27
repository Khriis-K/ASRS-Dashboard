import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useTrendKPIs } from '@/api/hooks';
import type { TrendDirection } from '@/api/client';

export function DeltaKPIs() {
  const { data: response, loading, error } = useTrendKPIs();

  const getIcon = (trend: TrendDirection) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const kpis = response?.kpis ?? [];

  const getCardStyles = (trend: string) => {
    switch (trend) {
      case 'up':
        return {
          border: 'border-red-200',
          bg: 'bg-red-50',
          icon: 'text-[#990000]',
          value: 'text-[#990000]',
          badge: 'bg-red-100 text-red-800',
        };
      case 'down':
        return {
          border: 'border-green-200',
          bg: 'bg-green-50',
          icon: 'text-green-700',
          value: 'text-green-700',
          badge: 'bg-green-100 text-green-800',
        };
      default:
        return {
          border: 'border-gray-200',
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          value: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-700',
        };
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <p className="text-red-600">Error loading KPIs: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {kpis.map((kpi) => {
        const styles = getCardStyles(kpi.trend);
        const Icon = getIcon(kpi.trend);

        return (
          <div
            key={kpi.title}
            className={`bg-white rounded-lg shadow-sm border ${styles.border} p-6 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${styles.bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${styles.icon}`} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles.badge}`}>
                {kpi.trend === 'up' ? 'Warning' : kpi.trend === 'down' ? 'Improving' : 'Stable'}
              </span>
            </div>

            <h3 className="text-gray-600 text-sm mb-2">{kpi.title}</h3>
            <p className={`text-3xl font-bold ${styles.value} mb-1`}>{kpi.value}</p>
            <p className="text-gray-600 text-sm">{kpi.description}</p>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Comparison: 2018-2025 vs. 2012-2017 Baseline
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
