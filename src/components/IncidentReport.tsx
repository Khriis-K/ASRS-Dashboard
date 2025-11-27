import { Header } from './dashboard-light/Header';
import { Breadcrumbs } from './incident/Breadcrumbs';
import { HeaderCard } from './incident/HeaderCard';
import { NarrativeViewer } from './incident/NarrativeViewer';
import { SimilarIncidents } from './incident/SimilarIncidents';
import { useIncidentDetail } from '@/api/hooks';

interface IncidentReportProps {
  onBackToHome: () => void;
  onBackToDashboard: () => void;
  acn: string;
}

export function IncidentReport({ onBackToHome, onBackToDashboard, acn }: IncidentReportProps) {
  const { data: response, loading, error } = useIncidentDetail(acn);

  const incident = response?.incident;
  // Map API snake_case to component camelCase
  const similarIncidents = (response?.similar_incidents ?? []).map(si => ({
    acn: si.acn,
    location: si.location,
    similarity: si.similarity,
    matchReason: si.match_reason,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Header onBackToHome={onBackToHome} />
        <Breadcrumbs
          items={[
            { label: 'Dashboard', onClick: onBackToDashboard },
            { label: `ACN: ${acn}` },
          ]}
        />
        <main className="p-8">
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-pulse text-gray-400 text-lg">Loading incident details...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Header onBackToHome={onBackToHome} />
        <Breadcrumbs
          items={[
            { label: 'Dashboard', onClick: onBackToDashboard },
            { label: `ACN: ${acn}` },
          ]}
        />
        <main className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 text-lg">
              {error?.message || `Incident ${acn} not found`}
            </p>
            <button
              onClick={onBackToDashboard}
              className="mt-4 px-4 py-2 bg-[#002E5D] text-white rounded-lg hover:bg-[#001a3d]"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Format aircraft info for display
  const aircraftDisplay = [
    incident.aircraft.type,
    incident.aircraft.operator,
  ].filter(Boolean).join(' - ') || 'Unknown';

  // Format weather info for display
  const weatherDisplay = incident.weather.conditions || 'Unknown';

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
              acn={incident.acn}
              title={incident.title}
              severity={incident.severity}
              date={incident.date_formatted}
              time={incident.time || 'Unknown'}
              aircraft={aircraftDisplay}
              weather={weatherDisplay}
            />

            {/* Narrative Viewer */}
            <NarrativeViewer
              narrative={incident.narrative}
              highlightedTerms={incident.highlighted_terms}
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
