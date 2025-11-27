import { Info } from 'lucide-react';

interface ControlBarProps {
  model: string;
  onModelChange: (model: string) => void;
  numTopics: number;
  onNumTopicsChange: (num: number) => void;
}

export function ControlBar({ model, onModelChange, numTopics, onNumTopicsChange }: ControlBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center gap-8">
        {/* Model Selection */}
        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-medium">Model Selection:</label>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:border-[#002E5D] focus:outline-none focus:ring-2 focus:ring-[#002E5D]/20 min-w-[250px]"
          >
            <option value="lda">Latent Dirichlet Allocation (LDA)</option>
            <option value="bertopic">BERTopic</option>
            <option value="tfidf">TF-IDF</option>
          </select>
        </div>

        {/* Number of Topics Slider */}
        <div className="flex items-center gap-3 flex-1">
          <label className="text-gray-700 font-medium whitespace-nowrap">Number of Topics:</label>
          <input
            type="range"
            min="5"
            max="50"
            value={numTopics}
            onChange={(e) => onNumTopicsChange(Number(e.target.value))}
            className="flex-1 max-w-xs"
          />
          <span className="text-[#002E5D] font-mono font-bold min-w-[3ch] text-center">
            {numTopics}
          </span>
        </div>

        {/* Coherence Score */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <Info className="w-4 h-4 text-green-700" />
          <span className="text-gray-700">Coherence Score:</span>
          <span className="text-green-700 font-mono font-bold">0.65</span>
          <span className="text-green-700 text-sm">(Good)</span>
        </div>
      </div>
    </div>
  );
}
