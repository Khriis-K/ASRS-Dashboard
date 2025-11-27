import { Settings, Calendar, MapPin, AlertTriangle, Home } from 'lucide-react';

interface SidebarProps {
  onBackToHome: () => void;
}

export function Sidebar({ onBackToHome }: SidebarProps) {
  const riskFactors = ['Human Factors', 'Weather', 'Communications', 'Mechanical'];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 backdrop-blur-xl bg-white/5 border-r border-white/10 p-6 overflow-y-auto">
      {/* Logo/Home Button */}
      <button 
        onClick={onBackToHome}
        className="w-full mb-6 flex items-center gap-3 text-[#00d9ff] hover:text-white transition-colors group"
      >
        <div className="w-10 h-10 rounded-lg bg-[#00d9ff]/10 flex items-center justify-center border border-[#00d9ff]/30 group-hover:bg-[#00d9ff]/20 transition-colors">
          <Home className="w-5 h-5" />
        </div>
        <div className="text-left">
          <div className="monospace">MISSION</div>
          <div className="monospace text-xs text-slate-400">CONTROL</div>
        </div>
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#00d9ff]" />
          Parameters
        </h3>
      </div>

      {/* Filter 1: Date Range */}
      <div className="mb-8">
        <label className="text-slate-400 mb-3 block flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Date Range
        </label>
        <div className="space-y-3">
          <input
            type="text"
            defaultValue="Jan 2012"
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white monospace hover:border-[#00d9ff]/50 focus:border-[#00d9ff] focus:outline-none transition-colors"
          />
          <input
            type="text"
            defaultValue="Dec 2017"
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white monospace hover:border-[#00d9ff]/50 focus:border-[#00d9ff] focus:outline-none transition-colors"
          />
        </div>
        {/* Slider visualization */}
        <div className="mt-4 px-2">
          <div className="h-1 bg-white/10 rounded-full relative">
            <div className="absolute left-[20%] right-[30%] h-full bg-gradient-to-r from-[#00d9ff] to-[#0099cc] rounded-full"></div>
            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#00d9ff] rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,217,255,0.5)]"></div>
            <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#00d9ff] rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,217,255,0.5)]"></div>
          </div>
        </div>
      </div>

      {/* Filter 2: Location */}
      <div className="mb-8">
        <label className="text-slate-400 mb-3 block flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location
        </label>
        <div className="space-y-3">
          <select className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white hover:border-[#00d9ff]/50 focus:border-[#00d9ff] focus:outline-none transition-colors cursor-pointer">
            <option value="">All Airports</option>
            <option value="SFO">SFO - San Francisco</option>
            <option value="JFK">JFK - New York</option>
            <option value="LAX">LAX - Los Angeles</option>
            <option value="ORD">ORD - Chicago</option>
            <option value="ATL">ATL - Atlanta</option>
          </select>
          <select className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white hover:border-[#00d9ff]/50 focus:border-[#00d9ff] focus:outline-none transition-colors cursor-pointer">
            <option value="">All States</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="IL">Illinois</option>
            <option value="GA">Georgia</option>
          </select>
        </div>
      </div>

      {/* Filter 3: Risk Factors */}
      <div className="mb-8">
        <label className="text-slate-400 mb-3 block flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Risk Factors
        </label>
        <div className="space-y-3">
          {riskFactors.map((factor) => (
            <label key={factor} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-white/30 bg-white/5 checked:bg-[#00d9ff] checked:border-[#00d9ff] focus:ring-2 focus:ring-[#00d9ff]/50 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-white transition-colors">{factor}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-gradient-to-r from-[#00d9ff] to-[#0099cc] text-black py-3 rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300 mt-8">
        Run Analysis
      </button>
    </aside>
  );
}