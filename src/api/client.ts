/**
 * API client for ASRS Dashboard backend.
 * Provides typed fetch functions for all endpoints.
 */

const API_BASE = '/api';

// ============== Types (matching backend schemas) ==============

export interface TimelineDataPoint {
  year: number;
  incidents: number;
}

export interface TimelineResponse {
  data: TimelineDataPoint[];
  benchmark_year: number;
  metadata: {
    total_incidents: number;
    date_range: { start: number | null; end: number | null };
  };
}

export interface ContributingFactor {
  factor: string;
  count: number;
  risk: 'high' | 'medium' | 'low';
}

export interface FactorsResponse {
  factors: ContributingFactor[];
  metadata: {
    total_incidents_analyzed: number;
    risk_thresholds: { high: number; medium: number };
  };
}

export interface IncidentSummary {
  acn: string;
  date: string;
  location: string;
  type: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface IncidentsResponse {
  reports: IncidentSummary[];
  pagination: Pagination;
}

export interface SummaryResponse {
  total_incidents: number;
  date_range: { start: number; end: number; span: number };
  primary_risk: string;
  last_updated: string;
}

export interface FilterOptions {
  contributing_factors: string[];
  aircraft_types: string[];
  states: Array<{ code: string; name: string }>;
  incident_types: string[];
  severity_levels: string[];
  year_range: { min: number; max: number };
}

// ============== Topic Modeling Types ==============

export interface TopicCluster {
  id: number;
  x: number;
  y: number;
  size: number;
  label: string;
}

export interface TopicsResponse {
  topics: TopicCluster[];
  model: string;
  metadata: {
    num_topics: number;
    total_documents: number;
    coherence_score: number;
  };
}

export interface TopicKeyword {
  keyword: string;
  weight: number;
}

export interface TopicKeywordsResponse {
  topic_id: number;
  keywords: TopicKeyword[];
}

export interface TopicNarrative {
  acn: string;
  narrative: string;
  keywords: string[];
}

export interface TopicNarrativesResponse {
  topic_id: number;
  narratives: TopicNarrative[];
}

// ============== Trend Analysis Types ==============

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface DeltaKPI {
  title: string;
  value: string;
  description: string;
  trend: TrendDirection;
  raw_value?: number;
}

export interface KPIsResponse {
  kpis: DeltaKPI[];
  comparison_periods: {
    baseline: { start: number; end: number; count: number };
    inference: { start: number; end: number; count: number };
  };
}

export interface ComparisonDataPoint {
  category: string;
  baseline: number;
  inference: number;
  variance: number;
}

export interface ComparisonResponse {
  data: ComparisonDataPoint[];
  greatest_change: {
    category: string;
    variance: number;
    direction: string;
  };
  periods: {
    baseline: string;
    inference: string;
  };
}

export interface EmergingPattern {
  topic_id: number;
  topic_label: string;
  description: string;
  report_count: number;
  first_appeared: string;
  growth: string;
  growth_rate?: number;
}

export interface EmergingPatternsResponse {
  patterns: EmergingPattern[];
  analysis_method: string;
  significance_threshold: number;
}

// ============== Fetch Helpers ==============

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
  const url = new URL(`${API_BASE}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}

// ============== API Functions ==============

/**
 * Get summary statistics for landing page.
 */
export async function fetchSummary(): Promise<SummaryResponse> {
  return fetchJson<SummaryResponse>(buildUrl('/summary'));
}

/**
 * Get filter options for sidebar.
 */
export async function fetchFilterOptions(): Promise<FilterOptions> {
  return fetchJson<FilterOptions>(buildUrl('/filters/options'));
}

/**
 * Get timeline data for the chart.
 */
export async function fetchTimeline(params?: {
  startYear?: number;
  endYear?: number;
}): Promise<TimelineResponse> {
  return fetchJson<TimelineResponse>(buildUrl('/incidents/timeline', {
    start_year: params?.startYear,
    end_year: params?.endYear,
  }));
}

/**
 * Get contributing factors for the bar chart.
 */
export async function fetchFactors(params?: {
  startYear?: number;
  endYear?: number;
  limit?: number;
}): Promise<FactorsResponse> {
  return fetchJson<FactorsResponse>(buildUrl('/incidents/factors', {
    start_year: params?.startYear,
    end_year: params?.endYear,
    limit: params?.limit,
  }));
}

/**
 * Get paginated incidents for the table.
 */
export async function fetchIncidents(params?: {
  startYear?: number;
  endYear?: number;
  page?: number;
  limit?: number;
  location?: string;
  severity?: string;
}): Promise<IncidentsResponse> {
  return fetchJson<IncidentsResponse>(buildUrl('/incidents', {
    start_year: params?.startYear,
    end_year: params?.endYear,
    page: params?.page,
    limit: params?.limit,
    location: params?.location,
    severity: params?.severity,
  }));
}

// ============== Topic Modeling API Functions ==============

/**
 * Get topic clusters for scatter plot.
 */
export async function fetchTopics(params?: {
  model?: 'lda' | 'bert';
  startYear?: number;
  endYear?: number;
}): Promise<TopicsResponse> {
  return fetchJson<TopicsResponse>(buildUrl('/topics', {
    model: params?.model,
    start_year: params?.startYear,
    end_year: params?.endYear,
  }));
}

/**
 * Get keywords for a specific topic.
 */
export async function fetchTopicKeywords(
  topicId: number,
  limit?: number
): Promise<TopicKeywordsResponse> {
  return fetchJson<TopicKeywordsResponse>(buildUrl(`/topics/${topicId}/keywords`, {
    limit,
  }));
}

/**
 * Get representative narratives for a topic.
 */
export async function fetchTopicNarratives(
  topicId: number,
  limit?: number
): Promise<TopicNarrativesResponse> {
  return fetchJson<TopicNarrativesResponse>(buildUrl(`/topics/${topicId}/narratives`, {
    limit,
  }));
}

// ============== Trend Analysis API Functions ==============

export interface TrendPeriodParams {
  baselineStart?: number;
  baselineEnd?: number;
  inferenceStart?: number;
  inferenceEnd?: number;
}

/**
 * Get delta KPIs for trend analysis.
 */
export async function fetchTrendKPIs(params?: TrendPeriodParams): Promise<KPIsResponse> {
  return fetchJson<KPIsResponse>(buildUrl('/trends/kpis', {
    baseline_start: params?.baselineStart,
    baseline_end: params?.baselineEnd,
    inference_start: params?.inferenceStart,
    inference_end: params?.inferenceEnd,
  }));
}

/**
 * Get comparison data for trend chart.
 */
export async function fetchTrendComparison(params?: TrendPeriodParams & {
  view?: 'factors' | 'topics';
  limit?: number;
}): Promise<ComparisonResponse> {
  return fetchJson<ComparisonResponse>(buildUrl('/trends/comparison', {
    view: params?.view,
    baseline_start: params?.baselineStart,
    baseline_end: params?.baselineEnd,
    inference_start: params?.inferenceStart,
    inference_end: params?.inferenceEnd,
    limit: params?.limit,
  }));
}

/**
 * Get emerging patterns identified post-baseline.
 */
export async function fetchEmergingPatterns(params?: {
  inferenceStart?: number;
  inferenceEnd?: number;
  limit?: number;
}): Promise<EmergingPatternsResponse> {
  return fetchJson<EmergingPatternsResponse>(buildUrl('/trends/emerging-patterns', {
    inference_start: params?.inferenceStart,
    inference_end: params?.inferenceEnd,
    limit: params?.limit,
  }));
}

// ============== Incident Detail Types ==============

export interface IncidentLocation {
  airport_code: string;
  airport_name?: string;
  taxiway?: string;
  runway?: string;
  state?: string;
}

export interface IncidentAircraft {
  type: string;
  operator?: string;
  flight_phase?: string;
}

export interface IncidentWeather {
  conditions: string;
  visibility?: string;
  ceiling?: string;
}

export interface IncidentDetail {
  acn: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  date: string;
  date_formatted: string;
  time?: string;
  timezone?: string;
  location: IncidentLocation;
  aircraft: IncidentAircraft;
  weather: IncidentWeather;
  narrative: string;
  highlighted_terms: string[];
  contributing_factors: string[];
}

export interface SimilarIncident {
  acn: string;
  location: string;
  similarity: number;
  match_reason: string;
}

export interface IncidentDetailResponse {
  incident: IncidentDetail;
  similar_incidents: SimilarIncident[];
}

// ============== Incident Detail API Functions ==============

/**
 * Get full details for a specific incident.
 */
export async function fetchIncidentDetail(acn: string): Promise<IncidentDetailResponse> {
  return fetchJson<IncidentDetailResponse>(buildUrl(`/incidents/${acn}`));
}
