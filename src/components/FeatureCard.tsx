import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-slate-200">
      <div className="bg-[#0B3D91] w-16 h-16 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-[#0B3D91] mb-3">{title}</div>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
