"""
Data loader service for ASRS incident data.
Handles CSV loading with caching based on environment settings.
"""
import pandas as pd
from pathlib import Path
from functools import lru_cache
from typing import Optional
import logging

from config import get_settings

logger = logging.getLogger(__name__)

# Global cache for production mode
_data_cache: Optional[pd.DataFrame] = None


def _load_csv(filepath: Path) -> pd.DataFrame:
    """Load a single CSV file with proper header handling."""
    logger.info(f"Loading CSV: {filepath}")
    df = pd.read_csv(
        filepath,
        skiprows=1,  # Skip the category header row
        low_memory=False
    )
    return df


def _parse_date_column(df: pd.DataFrame) -> pd.DataFrame:
    """Parse the Date column (YYYYMM format) to datetime and extract year."""
    df = df.copy()
    df["Date_parsed"] = pd.to_datetime(df["Date"], format="%Y%m", errors="coerce")
    df["Year"] = df["Date_parsed"].dt.year
    return df


def _standardize_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Standardize column names and create derived columns."""
    df = df.copy()
    
    # Rename columns for easier access
    column_map = {
        "ACN": "acn",
        "Date": "date_raw",
        "Locale Reference": "airport",
        "State Reference": "state",
        "Contributing Factors / Situations": "contributing_factors",
        "Primary Problem": "primary_problem",
        "Narrative": "narrative",
        "Synopsis": "synopsis",
        "Flight Conditions": "flight_conditions",
        "Light": "light",
        "Make Model Name": "aircraft_type",
        "Local Time Of Day": "time_of_day",
        "Anomaly": "anomaly",
        "Flight Phase": "flight_phase",
        "Human Factors": "human_factors",
    }
    
    # Only rename columns that exist
    existing_renames = {k: v for k, v in column_map.items() if k in df.columns}
    df = df.rename(columns=existing_renames)
    
    # Extract airport code from "Locale Reference" (format: "SFO.Airport" or similar)
    if "airport" in df.columns:
        df["airport_code"] = df["airport"].str.extract(r"^([A-Z0-9]{3,4})", expand=False)
    
    return df


def load_all_data(force_reload: bool = False) -> pd.DataFrame:
    """
    Load all incident data from CSV files.
    
    In production mode, data is cached in memory.
    In development mode, data is loaded fresh each call (unless cached).
    
    Args:
        force_reload: Force reload even if cached
        
    Returns:
        Combined DataFrame with all incidents
    """
    global _data_cache
    settings = get_settings()
    
    # Return cached data if available and in production
    if _data_cache is not None and not force_reload:
        if settings.is_production:
            logger.debug("Returning cached data (production mode)")
            return _data_cache
    
    # Load both CSV files
    csv_files = [
        settings.RAW_DATA_DIR / settings.CSV_2001_2017,
        settings.RAW_DATA_DIR / settings.CSV_2018_2025,
    ]
    
    dfs = []
    for csv_path in csv_files:
        if csv_path.exists():
            df = _load_csv(csv_path)
            df["source_file"] = csv_path.name
            dfs.append(df)
            logger.info(f"Loaded {len(df)} rows from {csv_path.name}")
        else:
            logger.warning(f"CSV file not found: {csv_path}")
    
    if not dfs:
        raise FileNotFoundError("No CSV files found in data directory")
    
    # Combine and process
    combined = pd.concat(dfs, ignore_index=True)
    combined = _parse_date_column(combined)
    combined = _standardize_columns(combined)
    
    logger.info(f"Total rows loaded: {len(combined)}")
    
    # Cache in production mode
    if settings.is_production:
        _data_cache = combined
        logger.info("Data cached for production mode")
    
    return combined


def filter_by_year_range(
    df: pd.DataFrame,
    start_year: Optional[int] = None,
    end_year: Optional[int] = None
) -> pd.DataFrame:
    """
    Filter DataFrame by year range.
    
    Args:
        df: Source DataFrame with 'Year' column
        start_year: Start year (inclusive), None for no lower bound
        end_year: End year (inclusive), None for no upper bound
        
    Returns:
        Filtered DataFrame
    """
    filtered = df.copy()
    
    if start_year is not None:
        filtered = filtered[filtered["Year"] >= start_year]
    
    if end_year is not None:
        filtered = filtered[filtered["Year"] <= end_year]
    
    return filtered


def get_year_range(df: pd.DataFrame) -> tuple[int, int]:
    """Get the min and max years in the dataset."""
    years = df["Year"].dropna()
    return int(years.min()), int(years.max())


def get_unique_values(df: pd.DataFrame, column: str) -> list[str]:
    """Get unique non-null values from a column."""
    if column not in df.columns:
        return []
    return df[column].dropna().unique().tolist()


def get_contributing_factors_list(df: pd.DataFrame) -> list[str]:
    """Get unique contributing factors (exploded from semicolon-separated values)."""
    if "contributing_factors" not in df.columns:
        return []
    
    # Split and explode multi-valued factors
    factors = (
        df["contributing_factors"]
        .dropna()
        .str.split("; ")
        .explode()
        .str.strip()
    )
    
    # Remove empty strings and get unique values
    factors = factors[factors != ""]
    return sorted(factors.unique().tolist())


@lru_cache(maxsize=1)
def get_cached_data() -> pd.DataFrame:
    """Get data with LRU cache for development mode."""
    return load_all_data()
