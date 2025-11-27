interface StatsCardProps {
  label: string;
  value: string;
}

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center border-t-4 border-[#0B3D91] hover:shadow-xl transition-shadow">
      <div className="text-slate-600 mb-2">{label}</div>
      <div className="text-[#0B3D91]">{value}</div>
    </div>
  );
}
