interface StatGlassProps {
  label: string;
  value: string;
  accent?: 'cyan' | 'amber';
}

export function StatGlass({ label, value, accent = 'cyan' }: StatGlassProps) {
  const accentColor = accent === 'cyan' ? 'text-[#00d9ff]' : 'text-[#ff9500]';
  const borderColor = accent === 'cyan' ? 'border-[#00d9ff]/30' : 'border-[#ff9500]/30';

  return (
    <div className={`backdrop-blur-xl bg-white/5 rounded-xl p-6 border ${borderColor} hover:bg-white/10 transition-all`}>
      <div className="text-slate-400 mb-2 uppercase tracking-wider">{label}</div>
      <div className={`monospace ${accentColor} text-5xl`}>{value}</div>
    </div>
  );
}
