"""
Incidents router - endpoints for dashboard incident data.
Supports dynamic year range filtering from the sidebar.
"""
from fastapi import APIRouter, Query
from typing import Optional
import pandas as pd

from services.data_loader import load_all_data, filter_by_year_range
from schemas.models import (
    TimelineResponse,
    TimelineDataPoint,
    FactorsResponse,
    ContributingFactor,
    IncidentsResponse,
    IncidentSummary,
    Pagination,
    Risk,
    Severity,
)

router = APIRouter(prefix="/api/incidents", tags=["incidents"])


def _classify_risk(count: int, high_threshold: int = 400, medium_threshold: int = 200) -> Risk:
    """Classify risk level based on count thresholds."""
    if count >= high_threshold:
        return Risk.HIGH
    elif count >= medium_threshold:
        return Risk.MEDIUM
    return Risk.LOW


def _classify_severity(row: pd.Series) -> Severity:
    """
    Classify incident severity based on available fields.
    Uses contributing factors and anomaly type as heuristics.
    """
    # Check for high-severity indicators
    high_indicators = ["runway incursion", "near miss", "collision"]
    narrative = str(row.get("synopsis", "") or row.get("narrative", "")).lower()
    anomaly = str(row.get("anomaly", "")).lower()
    
    for indicator in high_indicators:
        if indicator in narrative or indicator in anomaly:
            return Severity.HIGH
    
    # Check contributing factors for severity hints
    factors = str(row.get("contributing_factors", "")).lower()
    if "human factors" in factors:
        return Severity.MEDIUM
    
    return Severity.LOW


@router.get("/timeline", response_model=TimelineResponse)
async def get_timeline(
    start_year: Optional[int] = Query(None, description="Start year (inclusive)"),
    end_year: Optional[int] = Query(None, description="End year (inclusive)"),
):
    """
    Get incident counts by year for the timeline chart.
    Supports filtering by year range.
    """
    df = load_all_data()
    df = filter_by_year_range(df, start_year, end_year)
    
    # Group by year and count incidents
    yearly_counts = (
        df.groupby("Year")
        .size()
        .reset_index(name="incidents")
    )
    
    # Convert to response format
    data = [
        TimelineDataPoint(year=int(row["Year"]), incidents=int(row["incidents"]))
        for _, row in yearly_counts.iterrows()
        if pd.notna(row["Year"])
    ]
    
    # Sort by year
    data.sort(key=lambda x: x.year)
    
    return TimelineResponse(
        data=data,
        benchmark_year=2017,
        metadata={
            "total_incidents": int(df.shape[0]),
            "date_range": {
                "start": int(yearly_counts["Year"].min()) if len(yearly_counts) > 0 else None,
                "end": int(yearly_counts["Year"].max()) if len(yearly_counts) > 0 else None,
            }
        }
    )


@router.get("/factors", response_model=FactorsResponse)
async def get_factors(
    start_year: Optional[int] = Query(None, description="Start year (inclusive)"),
    end_year: Optional[int] = Query(None, description="End year (inclusive)"),
    limit: int = Query(10, description="Maximum number of factors to return"),
):
    """
    Get contributing factors with counts for the bar chart.
    Supports filtering by year range.
    """
    df = load_all_data()
    df = filter_by_year_range(df, start_year, end_year)
    
    # Explode multi-valued contributing factors
    factors_df = df[["contributing_factors"]].copy()
    factors_df = factors_df.dropna(subset=["contributing_factors"])
    factors_df["factor"] = factors_df["contributing_factors"].str.split("; ")
    factors_df = factors_df.explode("factor")
    factors_df["factor"] = factors_df["factor"].str.strip()
    factors_df = factors_df[factors_df["factor"] != ""]
    
    # Count factors
    factor_counts = (
        factors_df["factor"]
        .value_counts()
        .head(limit)
        .reset_index()
    )
    factor_counts.columns = ["factor", "count"]
    
    # Calculate risk thresholds dynamically
    max_count = factor_counts["count"].max() if len(factor_counts) > 0 else 0
    high_threshold = int(max_count * 0.7)
    medium_threshold = int(max_count * 0.4)
    
    # Convert to response format
    factors = [
        ContributingFactor(
            factor=row["factor"],
            count=int(row["count"]),
            risk=_classify_risk(row["count"], high_threshold, medium_threshold)
        )
        for _, row in factor_counts.iterrows()
    ]
    
    return FactorsResponse(
        factors=factors,
        metadata={
            "total_incidents_analyzed": int(df.shape[0]),
            "risk_thresholds": {
                "high": high_threshold,
                "medium": medium_threshold
            }
        }
    )


@router.get("", response_model=IncidentsResponse)
async def get_incidents(
    start_year: Optional[int] = Query(None, description="Start year (inclusive)"),
    end_year: Optional[int] = Query(None, description="End year (inclusive)"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    location: Optional[str] = Query(None, description="Airport code filter"),
    severity: Optional[str] = Query(None, description="Severity filter"),
):
    """
    Get paginated list of incidents for the report table.
    Supports filtering by year range, location, and severity.
    """
    df = load_all_data()
    df = filter_by_year_range(df, start_year, end_year)
    
    # Apply filters
    if location:
        df = df[df["airport_code"].str.upper() == location.upper()]
    
    # Add severity classification
    df["severity_calc"] = df.apply(_classify_severity, axis=1)
    
    if severity:
        df = df[df["severity_calc"] == severity]
    
    # Calculate pagination
    total = len(df)
    total_pages = (total + limit - 1) // limit
    offset = (page - 1) * limit
    
    # Get page of results
    page_df = df.iloc[offset:offset + limit]
    
    # Convert to response format
    reports = []
    for _, row in page_df.iterrows():
        # Format date
        date_str = ""
        if pd.notna(row.get("Date_parsed")):
            date_str = row["Date_parsed"].strftime("%Y-%m-%d")
        elif pd.notna(row.get("date_raw")):
            date_str = str(row["date_raw"])
        
        # Determine incident type from anomaly or primary problem
        inc_type = "Runway Incursion"  # Default
        if pd.notna(row.get("anomaly")):
            anomaly = str(row["anomaly"])
            if "Taxi" in anomaly:
                inc_type = "Taxi Deviation"
            elif "Communication" in anomaly:
                inc_type = "Communication Error"
            elif "Hold" in anomaly:
                inc_type = "Hold Short Violation"
        
        reports.append(IncidentSummary(
            acn=str(row.get("acn", "")),
            date=date_str,
            location=str(row.get("airport_code", row.get("airport", ""))),
            type=inc_type,
            severity=row["severity_calc"]
        ))
    
    return IncidentsResponse(
        reports=reports,
        pagination=Pagination(
            page=page,
            limit=limit,
            total=total,
            total_pages=total_pages
        )
    )
