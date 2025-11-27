"""
Trends router - endpoints for trend analysis comparing baseline vs inference periods.
Default split: Baseline (2012-2017) vs Inference (2018-2025)
"""
from fastapi import APIRouter, Query
from typing import Optional
import pandas as pd

from config import get_settings
from services.data_loader import load_all_data, filter_by_year_range
from schemas.models import (
    KPIsResponse,
    DeltaKPI,
    ComparisonResponse,
    ComparisonDataPoint,
    EmergingPatternsResponse,
    EmergingPattern,
    TrendDirection,
)

router = APIRouter(prefix="/api/trends", tags=["trends"])

settings = get_settings()


def _get_factor_distribution(df: pd.DataFrame) -> dict[str, float]:
    """Calculate percentage distribution of contributing factors."""
    if len(df) == 0:
        return {}
    
    # Explode multi-valued factors
    factors_df = df[["contributing_factors"]].copy()
    factors_df = factors_df.dropna(subset=["contributing_factors"])
    factors_df["factor"] = factors_df["contributing_factors"].str.split("; ")
    factors_df = factors_df.explode("factor")
    factors_df["factor"] = factors_df["factor"].str.strip()
    factors_df = factors_df[factors_df["factor"] != ""]
    
    # Calculate percentages
    total = len(factors_df)
    if total == 0:
        return {}
    
    counts = factors_df["factor"].value_counts()
    return {factor: (count / total) * 100 for factor, count in counts.items()}


def _calculate_variance(baseline: float, inference: float) -> float:
    """Calculate percentage point variance."""
    return round(inference - baseline, 1)


@router.get("/kpis", response_model=KPIsResponse)
async def get_trend_kpis(
    baseline_start: Optional[int] = Query(None, description="Baseline period start year"),
    baseline_end: Optional[int] = Query(None, description="Baseline period end year"),
    inference_start: Optional[int] = Query(None, description="Inference period start year"),
    inference_end: Optional[int] = Query(None, description="Inference period end year"),
):
    """
    Get delta KPIs comparing baseline and inference periods.
    """
    # Use defaults from settings if not provided
    b_start = baseline_start or settings.BASELINE_START
    b_end = baseline_end or settings.BASELINE_END
    i_start = inference_start or settings.INFERENCE_START
    i_end = inference_end or settings.INFERENCE_END
    
    df = load_all_data()
    
    # Get data for each period
    baseline_df = filter_by_year_range(df, b_start, b_end)
    inference_df = filter_by_year_range(df, i_start, i_end)
    
    # Calculate metrics
    baseline_count = len(baseline_df)
    inference_count = len(inference_df)
    
    # Normalize by years in each period
    baseline_years = b_end - b_start + 1
    inference_years = i_end - i_start + 1
    
    baseline_annual = baseline_count / baseline_years if baseline_years > 0 else 0
    inference_annual = inference_count / inference_years if inference_years > 0 else 0
    
    # Volume change percentage
    volume_change = ((inference_annual - baseline_annual) / baseline_annual * 100) if baseline_annual > 0 else 0
    
    # Get factor distributions
    baseline_factors = _get_factor_distribution(baseline_df)
    inference_factors = _get_factor_distribution(inference_df)
    
    # Find rising and declining risks
    all_factors = set(baseline_factors.keys()) | set(inference_factors.keys())
    variances = {}
    for factor in all_factors:
        b_val = baseline_factors.get(factor, 0)
        i_val = inference_factors.get(factor, 0)
        variances[factor] = i_val - b_val
    
    # Sort to find biggest changes
    sorted_by_variance = sorted(variances.items(), key=lambda x: x[1], reverse=True)
    rising_risk = sorted_by_variance[0] if sorted_by_variance else ("Unknown", 0)
    declining_risk = sorted_by_variance[-1] if sorted_by_variance else ("Unknown", 0)
    
    kpis = [
        DeltaKPI(
            title="Total Volume Change",
            value=f"{volume_change:+.0f}%",
            description="Annual Report Frequency",
            trend=TrendDirection.UP if volume_change > 5 else (TrendDirection.DOWN if volume_change < -5 else TrendDirection.NEUTRAL),
            raw_value=round(volume_change, 1)
        ),
        DeltaKPI(
            title="Rising Risk",
            value=f"{rising_risk[1]:+.1f}%",
            description=rising_risk[0][:30] if rising_risk[0] else "N/A",
            trend=TrendDirection.UP,
            raw_value=round(rising_risk[1], 1)
        ),
        DeltaKPI(
            title="Declining Risk",
            value=f"{declining_risk[1]:+.1f}%",
            description=declining_risk[0][:30] if declining_risk[0] else "N/A",
            trend=TrendDirection.DOWN,
            raw_value=round(declining_risk[1], 1)
        ),
    ]
    
    return KPIsResponse(
        kpis=kpis,
        comparison_periods={
            "baseline": {"start": b_start, "end": b_end, "count": baseline_count},
            "inference": {"start": i_start, "end": i_end, "count": inference_count}
        }
    )


@router.get("/comparison", response_model=ComparisonResponse)
async def get_comparison(
    view: str = Query("factors", description="View type: 'factors' or 'topics'"),
    baseline_start: Optional[int] = Query(None),
    baseline_end: Optional[int] = Query(None),
    inference_start: Optional[int] = Query(None),
    inference_end: Optional[int] = Query(None),
    limit: int = Query(7, description="Number of categories to return"),
):
    """
    Get comparison data for bar chart showing baseline vs inference period.
    """
    b_start = baseline_start or settings.BASELINE_START
    b_end = baseline_end or settings.BASELINE_END
    i_start = inference_start or settings.INFERENCE_START
    i_end = inference_end or settings.INFERENCE_END
    
    df = load_all_data()
    baseline_df = filter_by_year_range(df, b_start, b_end)
    inference_df = filter_by_year_range(df, i_start, i_end)
    
    if view == "topics":
        # For topics, we'd use topic assignments - for now use mock data
        # This will be replaced when topic models are integrated
        data = [
            ComparisonDataPoint(category="RWY Incursion", baseline=25.4, inference=28.1, variance=2.7),
            ComparisonDataPoint(category="Communication", baseline=19.2, inference=24.5, variance=5.3),
            ComparisonDataPoint(category="Clearance Issues", baseline=18.7, inference=16.2, variance=-2.5),
            ComparisonDataPoint(category="Taxi Errors", baseline=15.3, inference=18.9, variance=3.6),
            ComparisonDataPoint(category="Hold Short", baseline=12.8, inference=10.4, variance=-2.4),
            ComparisonDataPoint(category="Equipment", baseline=8.6, inference=11.9, variance=3.3),
        ]
    else:
        # Calculate factor distributions
        baseline_factors = _get_factor_distribution(baseline_df)
        inference_factors = _get_factor_distribution(inference_df)
        
        # Combine and get top factors
        all_factors = set(baseline_factors.keys()) | set(inference_factors.keys())
        comparison_data = []
        for factor in all_factors:
            b_val = baseline_factors.get(factor, 0)
            i_val = inference_factors.get(factor, 0)
            # Only include factors with significant presence
            if b_val > 1 or i_val > 1:
                comparison_data.append({
                    "category": factor,
                    "baseline": round(b_val, 1),
                    "inference": round(i_val, 1),
                    "variance": round(i_val - b_val, 1)
                })
        
        # Sort by total presence and limit
        comparison_data.sort(key=lambda x: x["baseline"] + x["inference"], reverse=True)
        comparison_data = comparison_data[:limit]
        
        data = [ComparisonDataPoint(**item) for item in comparison_data]
    
    # Find greatest change
    if data:
        max_change = max(data, key=lambda x: abs(x.variance))
        greatest_change = {
            "category": max_change.category,
            "variance": max_change.variance,
            "direction": "up" if max_change.variance > 0 else "down"
        }
    else:
        greatest_change = {"category": "N/A", "variance": 0, "direction": "neutral"}
    
    return ComparisonResponse(
        data=data,
        greatest_change=greatest_change,
        periods={
            "baseline": f"{b_start}-{b_end}",
            "inference": f"{i_start}-{i_end}"
        }
    )


@router.get("/emerging-patterns", response_model=EmergingPatternsResponse)
async def get_emerging_patterns(
    inference_start: Optional[int] = Query(None),
    inference_end: Optional[int] = Query(None),
    limit: int = Query(4, description="Number of patterns to return"),
):
    """
    Get emerging risk patterns identified in the inference period.
    These are patterns that were absent or insignificant in baseline.
    """
    # For now, return mock data representing emerging patterns
    # This will be replaced with actual topic model temporal analysis
    
    patterns = [
        EmergingPattern(
            topic_id=4,
            topic_label="Electronic Flight Bag (EFB) Distraction",
            description="New cluster associated with iPad/Tablet usage during taxi operations. Pilots report distraction from navigational apps and digital charts.",
            report_count=247,
            first_appeared="Q2 2018",
            growth="+156% since 2020",
            growth_rate=156.0
        ),
        EmergingPattern(
            topic_id=7,
            topic_label="Remote Tower Operations",
            description="Emerging pattern related to remote/virtual tower control systems. Communication delays and video feed quality issues cited.",
            report_count=89,
            first_appeared="Q4 2021",
            growth="+89% since 2022",
            growth_rate=89.0
        ),
        EmergingPattern(
            topic_id=11,
            topic_label="Multi-Frequency Confusion",
            description="Incidents involving confusion when switching between multiple ATC frequencies during complex taxi routes at major hubs.",
            report_count=312,
            first_appeared="Q1 2019",
            growth="+124% since 2019",
            growth_rate=124.0
        ),
        EmergingPattern(
            topic_id=14,
            topic_label="NextGen Procedure Adaptation",
            description="Reports related to pilot adaptation challenges with NextGen navigation procedures and RNAV taxi routes.",
            report_count=178,
            first_appeared="Q3 2020",
            growth="+78% since 2021",
            growth_rate=78.0
        ),
    ]
    
    return EmergingPatternsResponse(
        patterns=patterns[:limit],
        analysis_method="Temporal Topic Modeling",
        significance_threshold=0.05
    )
