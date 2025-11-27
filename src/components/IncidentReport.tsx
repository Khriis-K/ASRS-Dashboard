import { Header } from './dashboard-light/Header';
import { Breadcrumbs } from './incident/Breadcrumbs';
import { HeaderCard } from './incident/HeaderCard';
import { NarrativeViewer } from './incident/NarrativeViewer';
import { SimilarIncidents } from './incident/SimilarIncidents';

interface IncidentReportProps {
  onBackToHome: () => void;
  onBackToDashboard: () => void;
  acn: string;
}

export function IncidentReport({ onBackToHome, onBackToDashboard, acn }: IncidentReportProps) {
  // Mock data for the incident report
  const incidentData = {
    acn: acn,
    title: 'Runway Incursion at SFO (Taxiway B)',
    severity: 'High' as const,
    date: 'May 12, 2024',
    time: '14:30 PDT',
    aircraft: 'B737-800',
    weather: 'VFR',
    narrative: `During taxi operations at San Francisco International Airport (SFO), our aircraft inadvertently crossed the hold short line on Taxiway B while proceeding to Runway 28L for departure. At approximately 14:30 local time, we were instructed by Ground Control to "taxi to Runway 28L via Taxiway Bravo, hold short of Runway 28R."

As we approached the intersection, there was significant radio congestion on the Ground frequency with multiple aircraft taxiing simultaneously. The First Officer acknowledged the clearance, but due to the busy frequency and our focus on avoiding other ground traffic, we failed to completely stop at the hold short markings.

Tower immediately instructed us to stop our forward progress. We complied instantly and held position. An arriving aircraft on short final to Runway 28R was instructed to go around as a precautionary measure. Ground Control then provided revised taxi instructions, and we proceeded without further incident.

Contributing factors included radio congestion, complex taxi route, and possible crew distraction during a busy ground movement period. Weather was VFR with good visibility. No damage or injuries resulted from this incident. We have reviewed hold short procedures and implemented additional crew coordination protocols to prevent recurrence.`,
    highlightedTerms: ['hold short', 'crossed', 'Runway 28R', 'Ground Control', 'clearance', 'taxi', 'Tower', 'radio congestion'],
  };

  const similarIncidents = [
    {
      acn: '1845234',
      location: 'LAX - Taxiway A',
      similarity: 98,
      matchReason: 'Pilot Misunderstood Tower Instructions During Taxi',
    },
    {
      acn: '1842156',
      location: 'JFK - Runway 4L/22R',
      similarity: 95,
      matchReason: 'Radio Congestion Led to Missed Hold Short',
    },
    {
      acn: '1839874',
      location: 'ORD - Taxiway M',
      similarity: 92,
      matchReason: 'Crew Distraction During Complex Ground Operations',
    },
    {
      acn: '1837562',
      location: 'DEN - Taxiway B',
      similarity: 89,
      matchReason: 'Similar Aircraft Type and Weather Conditions',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <Header onBackToHome={onBackToHome} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Dashboard', onClick: onBackToDashboard },
          { label: 'Search Results', onClick: onBackToDashboard },
          { label: `ACN: ${acn}` },
        ]}
      />

      {/* Main Content */}
      <main className="p-8">
        <div className="grid grid-cols-[65%_35%] gap-8">
          {/* Left Panel - The Case File */}
          <div className="space-y-6">
            {/* Header Card */}
            <HeaderCard
              acn={incidentData.acn}
              title={incidentData.title}
              severity={incidentData.severity}
              date={incidentData.date}
              time={incidentData.time}
              aircraft={incidentData.aircraft}
              weather={incidentData.weather}
            />

            {/* Narrative Viewer */}
            <NarrativeViewer
              narrative={incidentData.narrative}
              highlightedTerms={incidentData.highlightedTerms}
            />
          </div>

          {/* Right Panel - AI Recommendations */}
          <div className="sticky top-24 h-fit">
            <SimilarIncidents incidents={similarIncidents} />
          </div>
        </div>
      </main>
    </div>
  );
}
