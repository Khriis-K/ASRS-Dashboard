/**
 * React hooks for fetching data from the ASRS API.
 * Provides loading states and error handling.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchTimeline,
  fetchFactors,
  fetchIncidents,
  fetchSummary,
  fetchFilterOptions,
  fetchTopics,
  fetchTopicKeywords,
  fetchTopicNarratives,
  fetchTrendKPIs,
  fetchTrendComparison,
  fetchEmergingPatterns,
  type TimelineResponse,
  type FactorsResponse,
  type IncidentsResponse,
  type SummaryResponse,
  type FilterOptions,
  type TopicsResponse,
  type TopicKeywordsResponse,
  type TopicNarrativesResponse,
  type KPIsResponse,
  type ComparisonResponse,
  type EmergingPatternsResponse,
  type TrendPeriodParams,
} from './client';

// ============== Generic Hook State ==============

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// ============== Timeline Hook ==============

export function useTimeline(params?: {
  startYear?: number;
  endYear?: number;
}): UseApiState<TimelineResponse> {
  const [data, setData] = useState<TimelineResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTimeline(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [params?.startYear, params?.endYear]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Factors Hook ==============

export function useFactors(params?: {
  startYear?: number;
  endYear?: number;
  limit?: number;
}): UseApiState<FactorsResponse> {
  const [data, setData] = useState<FactorsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFactors(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [params?.startYear, params?.endYear, params?.limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Incidents Hook ==============

export function useIncidents(params?: {
  startYear?: number;
  endYear?: number;
  page?: number;
  limit?: number;
  location?: string;
  severity?: string;
}): UseApiState<IncidentsResponse> {
  const [data, setData] = useState<IncidentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchIncidents(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [params?.startYear, params?.endYear, params?.page, params?.limit, params?.location, params?.severity]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Summary Hook ==============

export function useSummary(): UseApiState<SummaryResponse> {
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSummary();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Filter Options Hook ==============

export function useFilterOptions(): UseApiState<FilterOptions> {
  const [data, setData] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFilterOptions();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Topics Hook ==============

export function useTopics(params?: {
  model?: 'lda' | 'bert';
  startYear?: number;
  endYear?: number;
}): UseApiState<TopicsResponse> {
  const [data, setData] = useState<TopicsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTopics(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [params?.model, params?.startYear, params?.endYear]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Topic Keywords Hook ==============

export function useTopicKeywords(
  topicId: number,
  limit?: number
): UseApiState<TopicKeywordsResponse> {
  const [data, setData] = useState<TopicKeywordsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTopicKeywords(topicId, limit);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [topicId, limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Topic Narratives Hook ==============

export function useTopicNarratives(
  topicId: number,
  limit?: number
): UseApiState<TopicNarrativesResponse> {
  const [data, setData] = useState<TopicNarrativesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTopicNarratives(topicId, limit);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [topicId, limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Trend KPIs Hook ==============

export function useTrendKPIs(params?: TrendPeriodParams): UseApiState<KPIsResponse> {
  const [data, setData] = useState<KPIsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTrendKPIs(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [params?.baselineStart, params?.baselineEnd, params?.inferenceStart, params?.inferenceEnd]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Trend Comparison Hook ==============

export function useTrendComparison(params?: TrendPeriodParams & {
  view?: 'factors' | 'topics';
  limit?: number;
}): UseApiState<ComparisonResponse> {
  const [data, setData] = useState<ComparisonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTrendComparison(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [params?.baselineStart, params?.baselineEnd, params?.inferenceStart, params?.inferenceEnd, params?.view, params?.limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============== Emerging Patterns Hook ==============

export function useEmergingPatterns(params?: {
  inferenceStart?: number;
  inferenceEnd?: number;
  limit?: number;
}): UseApiState<EmergingPatternsResponse> {
  const [data, setData] = useState<EmergingPatternsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchEmergingPatterns(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [params?.inferenceStart, params?.inferenceEnd, params?.limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
