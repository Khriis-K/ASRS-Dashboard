import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function DeltaKPIs() {
  const kpis = [
    {
      title: 'Total Volume Change',
      value: '+12%',
      description: 'Report Frequency',
      trend: 'neutral' as const,
      icon: Minus,
    },
    {
      title: 'Rising Risk',
      value: '+18%',
      description: 'Ground Communications',
      trend: 'up' as const,
      icon: TrendingUp,
    },
    {
      title: 'Declining Risk',
      value: '-5%',
      description: 'Signage Visibility',
      trend: 'down' as const,
      icon: TrendingDown,
    },
  ];

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

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {kpis.map((kpi) => {
        const styles = getCardStyles(kpi.trend);
        const Icon = kpi.icon;

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
