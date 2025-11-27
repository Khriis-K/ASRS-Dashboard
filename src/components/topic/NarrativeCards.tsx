import { FileText } from 'lucide-react';
import { useTopicNarratives } from '@/api/hooks';

interface NarrativeCardsProps {
  topicId: number;
}

export function NarrativeCards({ topicId }: NarrativeCardsProps) {
  const { data: response, loading, error } = useTopicNarratives(topicId, 3);
  
  const narratives = response?.narratives ?? [];

  const highlightKeywords = (text: string, keywords: string[]) => {
    let highlightedText = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<strong class="text-[#990000] font-semibold">$1</strong>'
      );
    });
    return highlightedText;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Representative Narratives</h3>
          <p className="text-gray-600">Loading narratives for Topic {topicId}...</p>
        </div>
        <div className="h-[200px] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-[#002E5D] mb-2">Representative Narratives</h3>
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-[#002E5D] mb-2">Representative Narratives</h3>
        <p className="text-gray-600">Sample ASRS reports from Topic {topicId}</p>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {narratives.map((item) => (
          <div
            key={item.acn}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-[#002E5D] transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#002E5D]" />
              <span className="text-[#002E5D] font-mono text-sm font-semibold">{item.acn}</span>
            </div>
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: highlightKeywords(item.narrative, item.keywords),
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #002E5D;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #001a3d;
        }
      `}</style>
    </div>
  );
}
