import { useState } from 'react';
import { Header } from './dashboard-light/Header';
import { ControlBar } from './topic/ControlBar';
import { TopicScatter } from './topic/TopicScatter';
import { KeywordChart } from './topic/KeywordChart';
import { NarrativeCards } from './topic/NarrativeCards';

interface TopicModelingProps {
  onBackToHome: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TopicModeling({ onBackToHome, activeTab = 'topic', onTabChange }: TopicModelingProps) {
  const [model, setModel] = useState('lda');
  const [numTopics, setNumTopics] = useState(10);
  const [selectedTopic, setSelectedTopic] = useState(1);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <Header onBackToHome={onBackToHome} activeTab={activeTab} onTabChange={onTabChange} />

      {/* Control Bar */}
      <ControlBar
        model={model}
        onModelChange={setModel}
        numTopics={numTopics}
        onNumTopicsChange={setNumTopics}
      />

      {/* Main Content */}
      <main className="p-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Panel - Topic Landscape */}
          <div>
            <TopicScatter
              selectedTopic={selectedTopic}
              onTopicSelect={setSelectedTopic}
            />
          </div>

          {/* Right Panel - Topic Details */}
          <div className="space-y-8">
            {/* Semantic Signature */}
            <KeywordChart topicId={selectedTopic} />

            {/* Representative Narratives */}
            <NarrativeCards topicId={selectedTopic} />
          </div>
        </div>
      </main>
    </div>
  );
}