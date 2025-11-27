import { GlassCard } from './GlassCard';
import { LiveTicker } from './LiveTicker';
import { StatGlass } from './StatGlass';
import { LogoStrip } from './LogoStrip';
import { MetricCard } from './landing/MetricCard';
import { MethodologyCard } from './landing/MethodologyCard';
import { Brain, TrendingUp, Radar, Search } from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export function LandingPage({ onEnterDashboard }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header & Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <div>
              <h4 className="text-[#002E5D] mb-0">ASRS Incident Analyzer</h4>
              <p className="text-gray-600 text-sm">Aviation Safety Research</p>
            </div>
          </div>
          
          {/* Institution Logos */}
          <div className="flex items-center gap-6">
            {/* USC Viterbi */}
            <div className="text-right">
              <div className="text-[#990000] uppercase tracking-wider">USC</div>
              <div className="text-gray-600 text-sm">Viterbi School</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            {/* Aviation Safety Program */}
            <div className="text-right">
              <div className="text-[#002E5D] uppercase tracking-wider">Aviation</div>
              <div className="text-gray-600 text-sm">Safety Program</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative bg-[#002E5D] text-white py-24 px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 46, 93, 0.85), rgba(0, 46, 93, 0.85)), url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-6 text-white leading-tight">
            AI-Driven Analysis of Runway Incursions
            <br />
            <span className="text-3xl text-gray-200">(2001–2025)</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            Leveraging Natural Language Processing to identify evolving risk patterns in FAA safety reports.
          </p>
          <button 
            onClick={onEnterDashboard}
            className="bg-[#990000] hover:bg-[#7a0000] text-white px-10 py-4 rounded-lg transition-colors shadow-lg text-lg"
          >
            View Safety Dashboard
          </button>
        </div>
      </section>

      {/* Executive Summary Metrics */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard label="Total Incidents Analyzed" value="5,426" />
          <MetricCard label="Longitudinal Scope" value="24 Years" />
          <MetricCard label="Primary Risk Identified" value="Human Factors" highlight />
        </div>
      </section>

      {/* Methodology Preview */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[#002E5D] mb-4">Research Methodology</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A rigorous, multi-faceted approach combining advanced NLP techniques with longitudinal data analysis
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MethodologyCard 
            icon={Brain}
            title="Topic Modeling"
            description="Utilizing BERT and Latent Dirichlet Allocation (LDA) to identify and categorize latent themes within thousands of incident narratives, revealing systematic risk patterns."
          />
          <MethodologyCard 
            icon={TrendingUp}
            title="Trend Analysis"
            description="Comparative temporal analysis of pre-2017 vs. post-2017 incident data to detect shifts in contributing factors, frequency patterns, and emerging safety concerns."
          />
          <MethodologyCard 
            icon={Search}
            title="Semantic Search"
            description="Vector-based retrieval system enabling precise incident discovery through semantic similarity matching, facilitating rapid access to relevant safety reports."
          />
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="bg-white py-12 px-6 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-500 uppercase tracking-widest mb-8">Data Partnership</p>
          <div className="flex items-center justify-center gap-16">
            <div className="text-center">
              <div className="text-[#002E5D] text-2xl mb-2">NASA ASRS</div>
              <p className="text-gray-600">Aviation Safety Reporting System</p>
            </div>
            <div className="w-px h-16 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-[#990000] text-2xl mb-2">USC Viterbi</div>
              <p className="text-gray-600">School of Engineering</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002E5D] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-white mb-4">Research Mentors</h4>
              <p className="text-gray-300 leading-relaxed">
                Professor Allen Bolourchi<br />
                Professor Reza Jafarkhani<br />
                Professor Najmedin Meshkati
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Disclaimer</h4>
              <p className="text-gray-300 leading-relaxed">
                Data source: NASA Aviation Safety Reporting System (ASRS). This analytical tool is developed for academic research purposes and is not intended as an operational safety system.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-600 text-center text-gray-400">
            <p>© 2025 University of Southern California. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}