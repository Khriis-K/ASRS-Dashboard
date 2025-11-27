export function LogoStrip() {
  return (
    <div className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-slate-500 text-center mb-8 uppercase tracking-widest monospace">Data Sources & Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {/* NASA ASRS Logo/Text */}
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <div className="relative">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1"/>
                <path d="M7 12 L17 12 M12 7 L12 17" stroke="white" strokeWidth="1"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            </div>
            <div>
              <div className="text-white monospace tracking-wider">NASA</div>
              <div className="text-slate-400 text-sm monospace">ASRS DATA</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-white/10"></div>

          {/* USC Viterbi Logo/Text */}
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <div className="relative">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" stroke="white" strokeWidth="1"/>
                <path d="M8 8 L16 16 M16 8 L8 16" stroke="white" strokeWidth="1"/>
                <circle cx="12" cy="12" r="2" fill="white"/>
              </svg>
            </div>
            <div>
              <div className="text-white monospace tracking-wider">USC</div>
              <div className="text-slate-400 text-sm monospace">VITERBI SCHOOL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
