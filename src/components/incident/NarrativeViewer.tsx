interface NarrativeViewerProps {
  narrative: string;
  highlightedTerms: string[];
}

export function NarrativeViewer({ narrative, highlightedTerms }: NarrativeViewerProps) {
  const highlightText = (text: string, terms: string[]) => {
    let highlightedText = text;
    terms.forEach((term) => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
      );
    });
    return highlightedText;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-[#002E5D] text-xl mb-2">Incident Narrative</h2>
        <p className="text-gray-600 text-sm">
          AI-highlighted terms indicate key phrases identified by the attention mechanism
        </p>
      </div>

      <div
        className="narrative-text text-gray-800 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{
          __html: highlightText(narrative, highlightedTerms),
        }}
      />

      <style jsx>{`
        .narrative-text {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 16px;
          line-height: 1.8;
        }
      `}</style>
    </div>
  );
}
