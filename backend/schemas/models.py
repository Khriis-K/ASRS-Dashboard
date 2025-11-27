"""
Pydantic models for API request/response schemas.
These match the TypeScript interfaces expected by the React frontend.
"""
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


# ============== Enums ==============

class Severity(str, Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class Risk(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class TrendDirection(str, Enum):
    UP = "up"
    DOWN = "down"
    NEUTRAL = "neutral"


class TrendSegment(str, Enum):
    """Named trend segments per project requirements."""
    A = "A"  # 2012-2017 (Benchmark replication)
    B = "B"  # 2018-2025 (Inference/Validation)
    C = "C"  # 2001-2025 (Longitudinal view)


# ============== Dashboard Models ==============

class TimelineDataPoint(BaseModel):
    """Single point on the incidents timeline chart."""
    year: int
    incidents: int


class ContributingFactor(BaseModel):
    """Contributing factor with count and risk level."""
    factor: str
    count: int
    risk: Risk


class AirportGeoData(BaseModel):
    """Airport incident data for map visualization."""
    code: str
    name: Optional[str] = None
    latitude: float
    longitude: float
    incidents: int
    risk: Risk
    state: Optional[str] = None


class IncidentSummary(BaseModel):
    """Summary incident for table display."""
    acn: str
    date: str
    location: str
    type: str
    severity: Severity


class Pagination(BaseModel):
    """Pagination metadata."""
    page: int
    limit: int
    total: int
    total_pages: int


class IncidentsResponse(BaseModel):
    """Paginated incidents response."""
    reports: list[IncidentSummary]
    pagination: Pagination


class TimelineResponse(BaseModel):
    """Timeline chart response."""
    data: list[TimelineDataPoint]
    benchmark_year: int = 2017
    metadata: dict


class FactorsResponse(BaseModel):
    """Contributing factors chart response."""
    factors: list[ContributingFactor]
    metadata: dict


class MapResponse(BaseModel):
    """Map view response."""
    airports: list[AirportGeoData]
    risk_thresholds: dict


# ============== Topic Modeling Models ==============

class TopicCluster(BaseModel):
    """Topic cluster for scatter plot."""
    id: int
    x: float
    y: float
    size: int
    label: str


class TopicKeyword(BaseModel):
    """Keyword with weight for a topic."""
    keyword: str
    weight: float


class TopicNarrative(BaseModel):
    """Sample narrative for a topic."""
    acn: str
    narrative: str
    keywords: list[str]


class TopicsResponse(BaseModel):
    """Topics overview response."""
    topics: list[TopicCluster]
    model: str
    metadata: dict


class TopicKeywordsResponse(BaseModel):
    """Keywords for a topic."""
    topic_id: int
    keywords: list[TopicKeyword]


class TopicNarrativesResponse(BaseModel):
    """Sample narratives for a topic."""
    topic_id: int
    narratives: list[TopicNarrative]


class KeywordsResponse(BaseModel):
    """Keywords for a topic (legacy)."""
    topic_id: int
    topic_label: str
    keywords: list[TopicKeyword]


class NarrativesResponse(BaseModel):
    """Sample narratives for a topic (legacy)."""
    topic_id: int
    narratives: list[TopicNarrative]
    total_documents_in_topic: int


class ModelInfo(BaseModel):
    """Available model information."""
    id: str
    name: str
    description: str
    supported_topic_range: dict


class ModelsResponse(BaseModel):
    """Available models response."""
    available_models: list[ModelInfo]


# ============== Trend Analysis Models ==============

class DeltaKPI(BaseModel):
    """Delta KPI metric."""
    title: str
    value: str
    description: str
    trend: TrendDirection
    raw_value: Optional[float] = None


class ComparisonDataPoint(BaseModel):
    """Before/after comparison data point."""
    category: str
    baseline: float
    inference: float
    variance: float


class EmergingPattern(BaseModel):
    """Emerging risk pattern."""
    topic_id: int
    topic_label: str
    description: str
    report_count: int
    first_appeared: str
    growth: str
    growth_rate: Optional[float] = None


class KPIsResponse(BaseModel):
    """KPIs response."""
    kpis: list[DeltaKPI]
    comparison_periods: dict


class ComparisonResponse(BaseModel):
    """Comparison chart response."""
    data: list[ComparisonDataPoint]
    greatest_change: dict
    periods: dict


class EmergingPatternsResponse(BaseModel):
    """Emerging patterns response."""
    patterns: list[EmergingPattern]
    analysis_method: str
    significance_threshold: float = 0.05


# ============== Incident Detail Models ==============

class SimilarIncident(BaseModel):
    """Similar incident from vector search."""
    acn: str
    location: str
    similarity: float
    match_reason: str


class IncidentLocation(BaseModel):
    """Location details for an incident."""
    airport_code: str
    airport_name: Optional[str] = None
    taxiway: Optional[str] = None
    runway: Optional[str] = None
    state: Optional[str] = None


class IncidentAircraft(BaseModel):
    """Aircraft details."""
    type: str
    operator: Optional[str] = None
    flight_phase: Optional[str] = None


class IncidentWeather(BaseModel):
    """Weather conditions."""
    conditions: str
    visibility: Optional[str] = None
    ceiling: Optional[str] = None


class TopicAssignment(BaseModel):
    """Topic assignment for an incident."""
    topic_id: int
    topic_label: str
    confidence: float


class IncidentDetail(BaseModel):
    """Full incident detail."""
    acn: str
    title: str
    severity: Severity
    date: str
    date_formatted: str
    time: Optional[str] = None
    timezone: Optional[str] = None
    location: IncidentLocation
    aircraft: IncidentAircraft
    weather: IncidentWeather
    narrative: str
    highlighted_terms: list[str]
    contributing_factors: list[str]
    topic_assignment: Optional[TopicAssignment] = None


class IncidentDetailResponse(BaseModel):
    """Full incident detail with similar incidents."""
    incident: IncidentDetail
    similar_incidents: list[SimilarIncident]


# ============== Utility Models ==============

class FilterOptions(BaseModel):
    """Available filter options for sidebar."""
    contributing_factors: list[str]
    aircraft_types: list[str]
    states: list[dict]
    incident_types: list[str]
    severity_levels: list[str]
    year_range: dict


class SummaryResponse(BaseModel):
    """Landing page summary statistics."""
    total_incidents: int
    date_range: dict
    primary_risk: str
    last_updated: str
