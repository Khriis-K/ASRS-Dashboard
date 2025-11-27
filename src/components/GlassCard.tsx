import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface GlassCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: 'cyan' | 'amber';
}

export function GlassCard({ icon: Icon, title, description, accent = 'cyan' }: GlassCardProps) {
  const accentColor = accent === 'cyan' ? 'text-[#00d9ff]' : 'text-[#ff9500]';
  const accentGlow = accent === 'cyan' 
    ? 'shadow-[0_0_30px_rgba(0,217,255,0.3)]' 
    : 'shadow-[0_0_30px_rgba(255,149,0,0.3)]';
  const borderAccent = accent === 'cyan' ? 'border-[#00d9ff]/30' : 'border-[#ff9500]/30';

  return (
    <div className="group relative backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300">
      {/* HUD Corner Elements */}
      <div className={`absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 ${borderAccent}`}></div>
      <div className={`absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 ${borderAccent}`}></div>
      <div className={`absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 ${borderAccent}`}></div>
      <div className={`absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 ${borderAccent}`}></div>
      
      {/* Altitude ladder decoration on left */}
      <div className="absolute left-0 top-1/4 h-1/2 flex flex-col justify-between py-4 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`w-2 h-px ${accent === 'cyan' ? 'bg-[#00d9ff]' : 'bg-[#ff9500]'}`}></div>
            <span className={`monospace text-[8px] ${accentColor}`}>{90 - i * 10}</span>
          </div>
        ))}
      </div>

      {/* Compass ticks on top */}
      <div className="absolute top-0 left-1/4 right-1/4 h-4 flex justify-around items-start opacity-30">
        {['N', 'E', 'S', 'W'].map((dir, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-px h-2 ${accent === 'cyan' ? 'bg-[#00d9ff]' : 'bg-[#ff9500]'}`}></div>
            <span className={`monospace text-[8px] ${accentColor} mt-0.5`}>{dir}</span>
          </div>
        ))}
      </div>

      <div className={`${accentColor} ${accentGlow} mb-6 inline-block p-4 rounded-xl bg-white/5`}>
        <Icon className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <h3 className="text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
      
      {/* Hover glow effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        accent === 'cyan' ? 'bg-[#00d9ff]/5' : 'bg-[#ff9500]/5'
      }`}></div>
    </div>
  );
}