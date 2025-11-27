import { LucideIcon } from 'lucide-react';

interface MethodologyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function MethodologyCard({ icon: Icon, title, description }: MethodologyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-8 border border-gray-200">
      <div className="w-16 h-16 rounded-lg bg-[#002E5D] flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
      </div>
      <h3 className="text-[#002E5D] mb-4">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}
