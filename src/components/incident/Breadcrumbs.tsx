import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{ label: string; onClick?: () => void }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-8 py-3">
      <div className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className="text-[#002E5D] hover:text-[#990000] transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-gray-600">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
