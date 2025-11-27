import { GlassCard } from './GlassCard';
import { LiveTicker } from './LiveTicker';
import { StatGlass } from './StatGlass';
import { LogoStrip } from './LogoStrip';
import { Brain, TrendingUp, Radar } from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export function LandingPage({ onEnterDashboard }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 149, 0, 0.1) 0%, transparent 50%),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
          `,
        }}></div>
        {/* Topographic pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 50 Q 30 30, 50 50 T 90 50" stroke="rgba(0,217,255,0.1)" fill="none" strokeWidth="0.5"/>
              <path d="M10 70 Q 30 50, 50 70 T 90 70" stroke="rgba(0,217,255,0.08)" fill="none" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="2" fill="rgba(0,217,255,0.2)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)"/>
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="monospace text-[#00d9ff] bg-[#00d9ff]/10 px-4 py-2 rounded-full border border-[#00d9ff]/30">
                  MISSION-CRITICAL INTELLIGENCE
                </span>
              </div>
              <h1 className="text-white leading-tight">
                Predicting Risk in the Skies
              </h1>
              <p className="text-slate-300 text-xl leading-relaxed">
                Leveraging Large Language Models to decode 20 years of runway incursion data.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 py-8">
              <StatGlass label="Reports" value="5.4K" accent="cyan" />
              <StatGlass label="Years" value="24" accent="cyan" />
              <StatGlass label="Risk" value="87%" accent="amber" />
            </div>

            {/* CTA Button */}
            <button 
              onClick={onEnterDashboard}
              className="group relative bg-gradient-to-r from-[#00d9ff] to-[#0099cc] text-black px-10 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(0,217,255,0.6)] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="tracking-wide">Enter Mission Control</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Right: Visualization */}
          <div className="relative">
            {/* Radar sweep effect */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Concentric circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-full h-full rounded-full border border-[#00d9ff]/20"></div>
                <div className="absolute w-3/4 h-3/4 rounded-full border border-[#00d9ff]/30"></div>
                <div className="absolute w-1/2 h-1/2 rounded-full border border-[#00d9ff]/40"></div>
                <div className="absolute w-1/4 h-1/4 rounded-full border border-[#00d9ff]/50 bg-[#00d9ff]/10"></div>
                
                {/* Rotating sweep line */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#00d9ff] to-transparent origin-left"></div>
                </div>

                {/* Plane icon in center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00d9ff]">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                </div>

                {/* Blinking dots for airports */}
                <div className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full bg-[#ff9500] animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-[#ff9500] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-[#ff9500] animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Data Ticker */}
      <LiveTicker />

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white mb-4">Advanced Intelligence Systems</h2>
            <p className="text-slate-400 text-xl">Powered by cutting-edge machine learning and data science</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard 
              icon={Brain}
              title="NLP & Topic Modeling"
              description="Custom-trained language models extract semantic meaning from thousands of incident narratives, identifying subtle risk patterns invisible to traditional analysis."
              accent="cyan"
            />
            <GlassCard 
              icon={TrendingUp}
              title="Longitudinal Analysis (2001-2025)"
              description="Track incident evolution across two decades. Identify emerging trends, seasonal patterns, and long-term safety improvements through temporal clustering."
              accent="cyan"
            />
            <GlassCard 
              icon={Radar}
              title="Geospatial Risk Mapping"
              description="Interactive heatmaps reveal high-risk airports and regions. Correlate geographic factors with incident frequency for strategic safety interventions."
              accent="amber"
            />
          </div>
        </div>
      </section>

      {/* Logo Strip */}
      <LogoStrip />

      {/* Footer */}
      <footer className="relative py-8 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <p className="text-slate-600">
            Mentors: Professors Allen Bolourchi, Reza Jafarkhani, Najmedin Meshkati
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
