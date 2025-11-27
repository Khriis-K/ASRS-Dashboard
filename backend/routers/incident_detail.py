"""
Incident detail router - endpoint for individual incident reports.
Includes similar incidents based on text matching (FAISS integration pending).
"""
from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import pandas as pd

from services.data_loader import load_all_data
from schemas.models import (
    IncidentDetailResponse,
    IncidentDetail,
    IncidentLocation,
    IncidentAircraft,
    IncidentWeather,
    SimilarIncident,
    Severity,
)

router = APIRouter(prefix="/api/incidents", tags=["incident-detail"])


def _classify_severity(row: pd.Series) -> Severity:
    """Classify incident severity based on available fields."""
    narrative = str(row.get("synopsis", "") or row.get("narrative_1", "")).lower()
    
    high_indicators = ["runway incursion", "near miss", "collision", "go around", "aborted"]
    for indicator in high_indicators:
        if indicator in narrative:
            return Severity.HIGH
    
    medium_indicators = ["hold short", "crossed", "deviation", "confusion"]
    for indicator in medium_indicators:
        if indicator in narrative:
            return Severity.MEDIUM
    
    return Severity.LOW


def _extract_highlighted_terms(text: str) -> list[str]:
    """Extract key aviation safety terms to highlight."""
    key_terms = [
        "hold short", "runway", "taxiway", "clearance", "tower", "ground",
        "incursion", "crossed", "ATC", "frequency", "radio", "taxi",
        "takeoff", "landing", "approach", "departure", "go around",
        "abort", "stop", "hold", "cleared", "instruction"
    ]
    found = []
    text_lower = text.lower()
    for term in key_terms:
        if term.lower() in text_lower:
            found.append(term)
    return found[:10]  # Limit to 10 terms


def _find_similar_incidents(df: pd.DataFrame, target_acn: str, limit: int = 4) -> list[dict]:
    """
    Find similar incidents based on simple text matching.
    TODO: Replace with FAISS vector similarity search.
    """
    target_row = df[df["acn"] == target_acn]
    if len(target_row) == 0:
        return []
    
    target_row = target_row.iloc[0]
    target_text = str(target_row.get("synopsis", "") or target_row.get("narrative_1", "")).lower()
    
    # Extract key terms from target
    key_terms = []
    for term in ["runway", "taxiway", "hold short", "clearance", "tower", "ground", "radio"]:
        if term in target_text:
            key_terms.append(term)
    
    if not key_terms:
        key_terms = ["runway"]  # Default
    
    # Score other incidents
    other_incidents = df[df["acn"] != target_acn].copy()
    
    def score_similarity(row):
        text = str(row.get("synopsis", "") or row.get("narrative_1", "")).lower()
        score = sum(1 for term in key_terms if term in text)
        return score
    
    other_incidents["_sim_score"] = other_incidents.apply(score_similarity, axis=1)
    similar = other_incidents[other_incidents["_sim_score"] > 0].nlargest(limit, "_sim_score")
    
    results = []
    for _, row in similar.iterrows():
        # Determine match reason
        text = str(row.get("synopsis", "") or row.get("narrative_1", "")).lower()
        matched_terms = [t for t in key_terms if t in text]
        match_reason = f"Similar: {', '.join(matched_terms[:3])}" if matched_terms else "General similarity"
        
        # Calculate pseudo-similarity percentage
        sim_pct = min(98, 70 + row["_sim_score"] * 7)
        
        results.append({
            "acn": str(row.get("acn", "")),
            "location": str(row.get("airport_code", row.get("airport", "Unknown"))),
            "similarity": int(sim_pct),
            "match_reason": match_reason
        })
    
    return results


@router.get("/{acn}", response_model=IncidentDetailResponse)
async def get_incident_detail(acn: str):
    """
    Get full details for a specific incident by ACN.
    Includes similar incidents for the right sidebar.
    """
    df = load_all_data()
    
    # Find the incident - ensure ACN column is string for comparison
    df["acn"] = df["acn"].astype(str)
    incident_row = df[df["acn"] == acn]
    if len(incident_row) == 0:
        raise HTTPException(status_code=404, detail=f"Incident {acn} not found")
    
    row = incident_row.iloc[0]
    
    # Get narrative text
    narrative = str(row.get("synopsis", "") or row.get("narrative_1", "") or "No narrative available.")
    
    # Parse date
    date_str = ""
    date_formatted = ""
    if pd.notna(row.get("Date_parsed")):
        date_str = row["Date_parsed"].strftime("%Y-%m-%d")
        date_formatted = row["Date_parsed"].strftime("%B %d, %Y")
    elif pd.notna(row.get("date_raw")):
        date_str = str(row["date_raw"])
        date_formatted = date_str
    
    # Build location info
    location = IncidentLocation(
        airport_code=str(row.get("airport_code", row.get("airport", "Unknown"))),
        airport_name=str(row.get("airport", None)) if pd.notna(row.get("airport")) else None,
        state=str(row.get("state", None)) if pd.notna(row.get("state")) else None,
    )
    
    # Build aircraft info
    aircraft = IncidentAircraft(
        type=str(row.get("aircraft_type", "Unknown")),
        operator=str(row.get("operator", None)) if pd.notna(row.get("operator")) else None,
        flight_phase=str(row.get("flight_phase", None)) if pd.notna(row.get("flight_phase")) else None,
    )
    
    # Build weather info
    weather = IncidentWeather(
        conditions=str(row.get("weather", "Unknown")),
    )
    
    # Get contributing factors
    factors = []
    if pd.notna(row.get("contributing_factors")):
        factors = [f.strip() for f in str(row["contributing_factors"]).split(";") if f.strip()]
    
    # Determine severity
    severity = _classify_severity(row)
    
    # Generate title
    airport = location.airport_code or "Unknown"
    title = f"Runway Incursion at {airport}"
    
    # Build incident detail
    incident = IncidentDetail(
        acn=acn,
        title=title,
        severity=severity,
        date=date_str,
        date_formatted=date_formatted,
        location=location,
        aircraft=aircraft,
        weather=weather,
        narrative=narrative,
        highlighted_terms=_extract_highlighted_terms(narrative),
        contributing_factors=factors,
    )
    
    # Find similar incidents
    similar_data = _find_similar_incidents(df, acn)
    similar_incidents = [SimilarIncident(**s) for s in similar_data]
    
    return IncidentDetailResponse(
        incident=incident,
        similar_incidents=similar_incidents
    )
