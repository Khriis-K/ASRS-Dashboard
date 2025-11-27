interface MetricCardProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export function MetricCard({ label, value, highlight = false }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 border-t-4" style={{
      borderTopColor: highlight ? '#990000' : '#002E5D'
    }}>
      <div className="text-gray-600 mb-3 uppercase tracking-wide">{label}</div>
      <div className={`text-4xl ${highlight ? 'text-[#990000]' : 'text-[#002E5D]'}`}>
        {value}
      </div>
    </div>
  );
}
