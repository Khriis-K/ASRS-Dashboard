import { Calendar, MapPin, Plane, AlertTriangle, Filter } from 'lucide-react';

export function Sidebar() {
  const contributingFactors = ['Human Factors', 'Weather', 'ATC Communications', 'Equipment/Mechanical'];
  const aircraftTypes = ['Commercial Jet', 'Regional', 'General Aviation', 'Cargo'];

  return (
    <aside className="w-72 bg-[#F5F7FA] border-r border-gray-200 p-6 overflow-y-auto h-[calc(100vh-73px)] sticky top-[73px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-300">
        <Filter className="w-5 h-5 text-[#002E5D]" />
        <h3 className="text-[#002E5D]">Filter Parameters</h3>
      </div>

      {/* Date Range */}
      <div className="mb-8">
        <label className="text-gray-700 mb-3 block flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#002E5D]" />
          Date Range
        </label>
        <div className="space-y-3">
          <input
            type="number"
            defaultValue="2001"
            min="2001"
            max="2025"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:border-[#002E5D] focus:outline-none focus:ring-2 focus:ring-[#002E5D]/20"
            placeholder="Start Year"
          />
          <input
            type="number"
            defaultValue="2025"
            min="2001"
            max="2025"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:border-[#002E5D] focus:outline-none focus:ring-2 focus:ring-[#002E5D]/20"
            placeholder="End Year"
          />
        </div>
        {/* Range Slider Visualization */}
        <div className="mt-4 px-2">
          <div className="h-2 bg-gray-300 rounded-full relative">
            <div className="absolute left-0 right-0 h-full bg-[#002E5D] rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#002E5D] rounded-full shadow"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#002E5D] rounded-full shadow"></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>2001</span>
            <span>2025</span>
          </div>
        </div>
      </div>

      {/* Location Filters */}
      <div className="mb-8">
        <label className="text-gray-700 mb-3 block flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#002E5D]" />
          Location
        </label>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Airport Code (e.g., LAX)"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:border-[#002E5D] focus:outline-none focus:ring-2 focus:ring-[#002E5D]/20"
          />
          <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:border-[#002E5D] focus:outline-none focus:ring-2 focus:ring-[#002E5D]/20">
            <option value="">All States</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="IL">Illinois</option>
            <option value="GA">Georgia</option>
            <option value="FL">Florida</option>
          </select>
        </div>
      </div>

      {/* Aircraft Type */}
      <div className="mb-8">
        <label className="text-gray-700 mb-3 block flex items-center gap-2">
          <Plane className="w-4 h-4 text-[#002E5D]" />
          Aircraft Type
        </label>
        <div className="space-y-2">
          {aircraftTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-400 text-[#002E5D] focus:ring-2 focus:ring-[#002E5D]/20"
              />
              <span className="text-gray-700 group-hover:text-[#002E5D] transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Contributing Factors */}
      <div className="mb-8">
        <label className="text-gray-700 mb-3 block flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#002E5D]" />
          Contributing Factors
        </label>
        <div className="space-y-2">
          {contributingFactors.map((factor) => (
            <label key={factor} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-400 text-[#002E5D] focus:ring-2 focus:ring-[#002E5D]/20"
              />
              <span className="text-gray-700 group-hover:text-[#002E5D] transition-colors">{factor}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-[#002E5D] hover:bg-[#001a3d] text-white py-3 rounded-lg transition-colors shadow-sm">
        Apply Filters
      </button>

      {/* Reset Button */}
      <button className="w-full mt-2 bg-white hover:bg-gray-100 text-gray-700 py-3 rounded-lg transition-colors border border-gray-300">
        Reset All
      </button>
    </aside>
  );
}
