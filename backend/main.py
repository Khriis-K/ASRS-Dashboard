"""
FastAPI main application for ASRS Dashboard backend.
Serves NLP analysis results to the React frontend.
"""
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import get_settings
from routers import incidents
from routers import topics
from routers import trends

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler for startup/shutdown events."""
    settings = get_settings()
    logger.info(f"Starting ASRS Dashboard API in {settings.ENV} mode")
    
    # In production, pre-load data into memory
    if settings.is_production:
        logger.info("Pre-loading data for production mode...")
        from services.data_loader import load_all_data
        load_all_data()
        logger.info("Data pre-loaded successfully")
    
    yield
    
    logger.info("Shutting down ASRS Dashboard API")


# Create FastAPI app
app = FastAPI(
    title="ASRS Dashboard API",
    description="Backend API for NASA ASRS Runway Incursion Analysis Dashboard",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS (allow all origins for local demo)
settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(incidents.router)
app.include_router(topics.router)
app.include_router(trends.router)


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "env": settings.ENV}


# Summary endpoint for landing page
@app.get("/api/summary")
async def get_summary():
    """Get summary statistics for the landing page."""
    from services.data_loader import load_all_data, get_year_range
    from datetime import datetime
    
    df = load_all_data()
    min_year, max_year = get_year_range(df)
    
    # Determine primary risk from contributing factors
    factors = df["contributing_factors"].dropna().str.split("; ").explode()
    primary_risk = factors.value_counts().index[0] if len(factors) > 0 else "Human Factors"
    
    return {
        "total_incidents": int(df.shape[0]),
        "date_range": {
            "start": min_year,
            "end": max_year,
            "span": max_year - min_year + 1
        },
        "primary_risk": primary_risk,
        "last_updated": datetime.now().isoformat()
    }


# Filter options endpoint for sidebar
@app.get("/api/filters/options")
async def get_filter_options():
    """Get available filter options for the sidebar."""
    from services.data_loader import (
        load_all_data,
        get_contributing_factors_list,
        get_unique_values,
        get_year_range,
    )
    
    df = load_all_data()
    min_year, max_year = get_year_range(df)
    
    # Get unique states
    states = get_unique_values(df, "state")
    state_list = [{"code": s, "name": s} for s in sorted(states) if s]
    
    # Get unique aircraft types (limit to top ones)
    aircraft = df["aircraft_type"].dropna().value_counts().head(20).index.tolist()
    
    return {
        "contributing_factors": get_contributing_factors_list(df),
        "aircraft_types": aircraft,
        "states": state_list,
        "incident_types": [
            "Runway Incursion",
            "Taxi Deviation",
            "Communication Error",
            "Hold Short Violation",
            "Clearance Confusion",
            "ATC Miscommunication"
        ],
        "severity_levels": ["High", "Medium", "Low"],
        "year_range": {"min": min_year, "max": max_year}
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    )
