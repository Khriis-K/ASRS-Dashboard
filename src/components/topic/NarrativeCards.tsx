import { FileText } from 'lucide-react';

interface NarrativeCardsProps {
  topicId: number;
}

export function NarrativeCards({ topicId }: NarrativeCardsProps) {
  const topicNarratives: Record<number, Array<{ acn: string; narrative: string; keywords: string[] }>> = {
    1: [
      {
        acn: 'ACN-1847562',
        narrative: 'Aircraft X crossed hold short line on Taxiway B without clearance during active runway operations. The crew acknowledged their error immediately upon realizing they had entered the runway safety area.',
        keywords: ['crossed', 'hold', 'short', 'runway', 'clearance']
      },
      {
        acn: 'ACN-1845234',
        narrative: 'While taxiing to Runway 28L, our aircraft inadvertently crossed the hold short markings. We were immediately instructed by Tower to hold position. The incursion was caused by distraction during taxi.',
        keywords: ['runway', 'crossed', 'hold', 'short', 'incursion']
      },
      {
        acn: 'ACN-1843987',
        narrative: 'Ground crew vehicle entered active taxiway Delta without proper authorization from ATC. The vehicle crossed the hold short line while an arriving aircraft was on short final to Runway 24R.',
        keywords: ['entered', 'active', 'crossed', 'hold', 'short']
      },
    ],
    2: [
      {
        acn: 'ACN-1846789',
        narrative: 'Pilot misheard tower clearance instruction due to radio interference on the frequency. The communication breakdown resulted in the aircraft taxiing to the wrong runway. Better readback procedures needed.',
        keywords: ['communication', 'tower', 'frequency', 'misheard', 'readback']
      },
      {
        acn: 'ACN-1844521',
        narrative: 'Lost communication with ATC during taxi operations when switching to tower frequency. The radio malfunction caused confusion about our clearance status. Contacted ground via backup frequency.',
        keywords: ['communication', 'frequency', 'tower', 'atc', 'radio']
      },
      {
        acn: 'ACN-1842345',
        narrative: 'Tower instructions were unclear during busy traffic period. Multiple aircraft on the frequency made it difficult to ensure proper readback of our specific taxi clearance. Request clearer communication protocols.',
        keywords: ['tower', 'communication', 'frequency', 'readback', 'instruction']
      },
    ],
    3: [
      {
        acn: 'ACN-1845678',
        narrative: 'Received clearance to taxi via Alpha to Runway 16. However, the authorized route was blocked by construction. We requested and received amended clearance to proceed via Bravo taxiway instead.',
        keywords: ['clearance', 'authorized', 'taxi', 'proceed', 'route']
      },
      {
        acn: 'ACN-1843456',
        narrative: 'Confusion regarding taxi clearance instructions. We were granted permission to taxi to the gate via Taxiway C, but the approval was later modified due to traffic on that route. Amended instructions received.',
        keywords: ['clearance', 'granted', 'permission', 'approval', 'instruction']
      },
      {
        acn: 'ACN-1841234',
        narrative: 'Taxi clearance was not clearly understood. Asked for clarification from Ground Control regarding which taxiway route we were authorized to use. Received explicit instruction to proceed via designated path.',
        keywords: ['clearance', 'authorized', 'instruction', 'proceed', 'path']
      },
    ],
  };

  const narratives = topicNarratives[topicId] || topicNarratives[1];

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
