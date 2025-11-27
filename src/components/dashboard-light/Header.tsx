import { Home, BarChart3, Brain, Search, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onBackToHome: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Header({ onBackToHome, activeTab = 'dashboard', onTabChange }: HeaderProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'topic', label: 'Topic Modeling', icon: Brain },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'search', label: 'Search', icon: Search },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo & Back Button */}
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-3 text-[#002E5D] hover:text-[#990000] transition-colors"
        >
          <Home className="w-5 h-5" />
          <div className="text-left">
            <div className="font-semibold">ASRS Analyzer</div>
            <div className="text-xs text-gray-600">Aviation Safety Research</div>
          </div>
        </button>

        {/* Tab Navigation */}
        <nav className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                  isActive
                    ? 'bg-[#002E5D] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Data</span>
        </div>
      </div>
    </header>
  );
}