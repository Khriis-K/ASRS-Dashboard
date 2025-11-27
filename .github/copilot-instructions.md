# ASRS Dashboard - Copilot Instructions

## Project Overview
This is a **React + TypeScript + Vite** frontend for analyzing NASA Aviation Safety Reporting System (ASRS) runway incursion data (2001-2025). The project includes:
- Interactive dashboard for incident visualization
- Topic modeling views (LDA/BERT)
- Trend analysis comparing pre/post-2017 data
- Individual incident report viewer

## Architecture

### View-Based Navigation
The app uses state-based view switching in `App.tsx` rather than React Router:
```tsx
const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'topic' | 'incident' | 'trends'>('landing');
```
When adding new views, follow this pattern—add to the union type and handle in the render logic.

### Component Structure
```
src/components/
├── LandingPage.tsx          # Entry point with hero + methodology
├── Dashboard.tsx            # Main dashboard with charts/tables
├── TopicModeling.tsx        # Topic analysis visualization
├── TrendAnalysis.tsx        # Pre/post-2017 comparison
├── IncidentReport.tsx       # Individual report detail
├── dashboard-light/         # Dashboard sub-components (Header, Sidebar, charts)
├── topic/                   # Topic modeling sub-components
├── trend/                   # Trend analysis sub-components
├── landing/                 # Landing page cards
└── ui/                      # Shadcn/Radix primitives
```

### Shared Header Pattern
The `Header` component in `dashboard-light/Header.tsx` is reused across Dashboard, TopicModeling, and TrendAnalysis views with consistent navigation tabs.

## Styling Conventions

### Brand Colors
Always use these exact hex values (defined in `globals.css`):
- **Navy** (primary): `#002E5D` → `bg-[#002E5D]`, `text-[#002E5D]`, `border-[#002E5D]`
- **Cardinal** (accent): `#990000` → `bg-[#990000]`, `text-[#990000]`
- **Background**: `#F5F7FA` → `bg-[#F5F7FA]`

### Tailwind v4 + Shadcn UI
- Uses Tailwind CSS v4 with `@import "tailwindcss"` syntax
- UI primitives in `src/components/ui/` from Shadcn with Radix
- Use `cn()` utility from `ui/utils.ts` for conditional classes
- Path alias: `@/` maps to `src/` (configured in `vite.config.ts`)

### Typography
- Headings use Georgia serif font (defined in `globals.css`)
- Body uses Inter sans-serif
- Monospace: JetBrains Mono (class: `monospace`)

## Development Commands
```bash
npm install    # Install dependencies
npm run dev    # Start dev server on port 3000 (auto-opens browser)
npm run build  # Build to /build directory
```

## Key Patterns

### Chart Components
Charts use Recharts library. See examples in:
- `dashboard-light/TimelineChart.tsx` - Line charts
- `dashboard-light/FactorsChart.tsx` - Bar charts
- `topic/TopicScatter.tsx` - Scatter plots

### State Lifting for Cross-Component Communication
Incident selection flows from `ReportTable` → `Dashboard` → `App` → `IncidentReport` via callbacks:
```tsx
// In Dashboard
<ReportTable onReportClick={onReportClick} />

// In App
const handleReportClick = (acn: string) => {
  setSelectedIncidentAcn(acn);
  setCurrentView('incident');
};
```

### Card Components
Use `GlassCard` for consistent card styling with the glass morphism effect.

## Backend Data (Not Yet Integrated)
The `potential backend stuff/` directory contains:
- Raw CSV data from ASRS (2001-2025)
- Jupyter notebooks for NLP pipelines
- Pre-trained LDA and BERTopic models
- Embeddings and visualizations

Future integration will require a Python backend or data preprocessing step.
