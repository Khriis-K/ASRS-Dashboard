# ASRS Runway Incursion Dashboard

An AI-driven analysis dashboard for NASA Aviation Safety Reporting System (ASRS) runway incursion data (2001–2025). This project leverages Natural Language Processing to identify evolving risk patterns in FAA safety reports.

## Project Overview

This full-stack application provides:
- **Interactive Dashboard** - Visualize incident trends, contributing factors, and detailed reports
- **Topic Modeling** - LDA and BERTopic analysis revealing latent themes in incident narratives
- **Trend Analysis** - Comparative temporal analysis of pre-2017 vs. post-2017 incident patterns
- **Semantic Search** - Vector-based retrieval for finding similar incidents (FAISS integration pending)

## Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS v4** for styling
- **Recharts** for data visualization
- **Shadcn/Radix UI** for accessible components

### Backend
- **FastAPI** (Python 3.11+)
- **Pandas** for data processing
- **Pydantic** for request/response validation
- **Uvicorn** ASGI server

### Data
- 5,400+ runway incursion reports from NASA ASRS (2001-2025)
- Pre-trained LDA and BERTopic models
- Sentence embeddings for semantic similarity

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+

### Backend Setup

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
npm install
npm run dev
```

The app will open at `http://localhost:3000`

## Project Structure

```
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Environment configuration
│   ├── routers/
│   │   ├── incidents.py     # Timeline, factors, incident list endpoints
│   │   ├── incident_detail.py # Individual incident details
│   │   ├── topics.py        # Topic modeling endpoints
│   │   └── trends.py        # Trend analysis endpoints
│   ├── schemas/
│   │   └── models.py        # Pydantic response models
│   └── services/
│       └── data_loader.py   # CSV data loading and caching
│
├── src/
│   ├── App.tsx              # Main app with view-based navigation
│   ├── api/
│   │   ├── client.ts        # Typed API fetch functions
│   │   └── hooks.ts         # React hooks for data fetching
│   ├── components/
│   │   ├── LandingPage.tsx  # Entry point with metrics
│   │   ├── Dashboard.tsx    # Main dashboard view
│   │   ├── TopicModeling.tsx # Topic analysis view
│   │   ├── TrendAnalysis.tsx # Pre/post-2017 comparison
│   │   └── IncidentReport.tsx # Individual report detail
│   └── styles/
│       └── globals.css      # Brand colors and typography
│
└── potential backend stuff/  # Raw data, models, and notebooks
    ├── all/                  # ASRS CSV data files
    ├── Models/               # Pre-trained LDA/BERTopic models
    ├── Embeddings/           # Sentence embeddings
    └── Pipelines/            # Jupyter notebooks for NLP
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/summary` | Landing page statistics |
| `GET /api/incidents/timeline` | Yearly incident counts |
| `GET /api/incidents/factors` | Contributing factor breakdown |
| `GET /api/incidents` | Paginated incident list with filters |
| `GET /api/incidents/{acn}` | Individual incident detail |
| `GET /api/topics` | Topic clusters from LDA/BERTopic |
| `GET /api/topics/{id}/keywords` | Top keywords for a topic |
| `GET /api/topics/{id}/narratives` | Sample narratives for a topic |
| `GET /api/trends/kpis` | Pre/post-2017 comparison metrics |
| `GET /api/trends/comparison` | Side-by-side factor comparison |
| `GET /api/trends/emerging-patterns` | New patterns in recent data |
| `GET /api/filters/options` | Available filter values |

## Brand Colors

- **Navy** (primary): `#002E5D`
- **Cardinal** (accent): `#990000`
- **Background**: `#F5F7FA`

## Data Source

NASA Aviation Safety Reporting System (ASRS) - https://asrs.arc.nasa.gov/

## Disclaimer

This analytical tool is developed for academic research purposes at USC Viterbi School of Engineering and is not intended as an operational safety system.
