"""
Topics router - endpoints for topic modeling visualization.
Provides pre-computed topic model results (LDA and BERTopic).
"""
from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List

from schemas.models import (
    TopicsResponse,
    TopicCluster,
    TopicKeywordsResponse,
    TopicKeyword,
    TopicNarrativesResponse,
    TopicNarrative,
)
from services.data_loader import load_all_data, filter_by_year_range

router = APIRouter(prefix="/api/topics", tags=["topics"])


# Mock topic data - will be replaced with actual model output
# These represent pre-computed topics from LDA/BERTopic models
LDA_TOPICS = [
    {"id": 1, "x": 15, "y": 65, "size": 487, "label": "RWY Incursion"},
    {"id": 2, "x": 45, "y": 75, "size": 412, "label": "Communication"},
    {"id": 3, "x": 70, "y": 60, "size": 356, "label": "Clearance"},
    {"id": 4, "x": 25, "y": 35, "size": 298, "label": "Taxi Error"},
    {"id": 5, "x": 80, "y": 25, "size": 234, "label": "Hold Short"},
    {"id": 6, "x": 55, "y": 40, "size": 189, "label": "Weather"},
    {"id": 7, "x": 35, "y": 55, "size": 167, "label": "ATC"},
    {"id": 8, "x": 60, "y": 80, "size": 145, "label": "Equipment"},
    {"id": 9, "x": 85, "y": 45, "size": 112, "label": "Lighting"},
    {"id": 10, "x": 40, "y": 20, "size": 98, "label": "Training"},
]

BERT_TOPICS = [
    {"id": 1, "x": 20, "y": 70, "size": 523, "label": "Runway Safety"},
    {"id": 2, "x": 50, "y": 80, "size": 445, "label": "Radio Comms"},
    {"id": 3, "x": 75, "y": 55, "size": 378, "label": "Taxi Clearance"},
    {"id": 4, "x": 30, "y": 40, "size": 312, "label": "Ground Ops"},
    {"id": 5, "x": 85, "y": 30, "size": 256, "label": "Hold Position"},
    {"id": 6, "x": 60, "y": 45, "size": 198, "label": "Visibility"},
]

TOPIC_KEYWORDS = {
    1: [
        {"keyword": "runway", "weight": 0.92},
        {"keyword": "incursion", "weight": 0.88},
        {"keyword": "crossed", "weight": 0.85},
        {"keyword": "hold", "weight": 0.82},
        {"keyword": "short", "weight": 0.78},
        {"keyword": "clearance", "weight": 0.75},
        {"keyword": "taxiway", "weight": 0.71},
        {"keyword": "line", "weight": 0.68},
        {"keyword": "active", "weight": 0.65},
        {"keyword": "entered", "weight": 0.62},
    ],
    2: [
        {"keyword": "communication", "weight": 0.90},
        {"keyword": "tower", "weight": 0.87},
        {"keyword": "frequency", "weight": 0.84},
        {"keyword": "radio", "weight": 0.80},
        {"keyword": "atc", "weight": 0.77},
        {"keyword": "misheard", "weight": 0.73},
        {"keyword": "readback", "weight": 0.70},
        {"keyword": "instruction", "weight": 0.67},
        {"keyword": "contact", "weight": 0.64},
        {"keyword": "callsign", "weight": 0.61},
    ],
    3: [
        {"keyword": "clearance", "weight": 0.91},
        {"keyword": "taxi", "weight": 0.86},
        {"keyword": "route", "weight": 0.83},
        {"keyword": "authorized", "weight": 0.79},
        {"keyword": "permission", "weight": 0.76},
        {"keyword": "ground", "weight": 0.72},
        {"keyword": "proceed", "weight": 0.69},
        {"keyword": "instruction", "weight": 0.66},
        {"keyword": "ramp", "weight": 0.63},
        {"keyword": "gate", "weight": 0.60},
    ],
    4: [
        {"keyword": "taxi", "weight": 0.89},
        {"keyword": "wrong", "weight": 0.85},
        {"keyword": "turn", "weight": 0.81},
        {"keyword": "missed", "weight": 0.78},
        {"keyword": "signage", "weight": 0.74},
        {"keyword": "confusion", "weight": 0.71},
        {"keyword": "unfamiliar", "weight": 0.68},
        {"keyword": "airport", "weight": 0.65},
        {"keyword": "layout", "weight": 0.62},
        {"keyword": "diagram", "weight": 0.59},
    ],
    5: [
        {"keyword": "hold", "weight": 0.93},
        {"keyword": "short", "weight": 0.89},
        {"keyword": "line", "weight": 0.85},
        {"keyword": "crossed", "weight": 0.81},
        {"keyword": "marking", "weight": 0.77},
        {"keyword": "paint", "weight": 0.73},
        {"keyword": "faded", "weight": 0.69},
        {"keyword": "visibility", "weight": 0.65},
        {"keyword": "night", "weight": 0.61},
        {"keyword": "lights", "weight": 0.57},
    ],
}


@router.get("", response_model=TopicsResponse)
async def get_topics(
    model: str = Query("lda", description="Model type: 'lda' or 'bert'"),
    start_year: Optional[int] = Query(None, description="Start year filter"),
    end_year: Optional[int] = Query(None, description="End year filter"),
):
    """
    Get topic clusters for the scatter plot visualization.
    Returns pre-computed topic coordinates and sizes.
    """
    # Select model data
    if model.lower() == "bert":
        topics_data = BERT_TOPICS
        model_name = "BERTopic"
        num_topics = 6
    else:
        topics_data = LDA_TOPICS
        model_name = "LDA"
        num_topics = 10
    
    # Get actual document count for metadata
    df = load_all_data()
    df = filter_by_year_range(df, start_year, end_year)
    total_docs = len(df)
    
    # Convert to response format
    clusters = [
        TopicCluster(
            id=t["id"],
            x=t["x"],
            y=t["y"],
            size=t["size"],
            label=t["label"]
        )
        for t in topics_data
    ]
    
    return TopicsResponse(
        topics=clusters,
        model=model_name,
        metadata={
            "num_topics": num_topics,
            "total_documents": total_docs,
            "coherence_score": 0.42 if model_name == "LDA" else 0.58,
        }
    )


@router.get("/{topic_id}/keywords", response_model=TopicKeywordsResponse)
async def get_topic_keywords(
    topic_id: int,
    limit: int = Query(10, description="Number of keywords to return"),
):
    """
    Get top keywords for a specific topic.
    """
    if topic_id not in TOPIC_KEYWORDS:
        # Return generic keywords for unknown topics
        keywords_data = TOPIC_KEYWORDS.get(1, [])[:limit]
    else:
        keywords_data = TOPIC_KEYWORDS[topic_id][:limit]
    
    keywords = [
        TopicKeyword(keyword=kw["keyword"], weight=kw["weight"])
        for kw in keywords_data
    ]
    
    return TopicKeywordsResponse(
        topic_id=topic_id,
        keywords=keywords
    )


@router.get("/{topic_id}/narratives", response_model=TopicNarrativesResponse)
async def get_topic_narratives(
    topic_id: int,
    limit: int = Query(3, description="Number of narratives to return"),
):
    """
    Get representative narratives for a specific topic.
    Returns actual ASRS reports that best represent the topic.
    """
    df = load_all_data()
    
    # Get keywords for this topic to find matching narratives
    keywords = [kw["keyword"] for kw in TOPIC_KEYWORDS.get(topic_id, TOPIC_KEYWORDS[1])][:5]
    
    # Find narratives that contain topic keywords
    narratives = []
    
    # Search in synopsis column for matching keywords
    synopsis_col = "synopsis" if "synopsis" in df.columns else None
    narrative_col = None
    for col in df.columns:
        if "narrative" in col.lower():
            narrative_col = col
            break
    
    text_col = synopsis_col or narrative_col
    
    if text_col and text_col in df.columns:
        # Score each row by keyword matches
        def score_text(text):
            if not isinstance(text, str):
                return 0
            text_lower = text.lower()
            return sum(1 for kw in keywords if kw in text_lower)
        
        df["_score"] = df[text_col].apply(score_text)
        top_matches = df[df["_score"] > 0].nlargest(limit, "_score")
        
        for _, row in top_matches.iterrows():
            text = str(row.get(text_col, ""))
            # Truncate if too long
            if len(text) > 500:
                text = text[:497] + "..."
            
            # Find which keywords appear in this narrative
            matched_keywords = [kw for kw in keywords if kw in text.lower()]
            
            narratives.append(TopicNarrative(
                acn=f"ACN-{row.get('acn', 'Unknown')}",
                narrative=text,
                keywords=matched_keywords[:5]
            ))
    
    # If no matches found, return placeholder
    if not narratives:
        narratives = [
            TopicNarrative(
                acn="ACN-Sample",
                narrative="No matching narratives found for this topic. This may indicate the topic model needs retraining with the current dataset.",
                keywords=keywords[:3]
            )
        ]
    
    return TopicNarrativesResponse(
        topic_id=topic_id,
        narratives=narratives
    )
