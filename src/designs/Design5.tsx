import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

function useCounter(target: number, dur = 2200, dec = 0) {
  const [v, setV] = useState(0)
  const r = useRef<number | null>(null)
  useEffect(() => {
    const s = performance.now()
    const tick = (n: number) => {
      const p = Math.min((n - s) / dur, 1)
      setV(Number(((1 - Math.pow(1 - p, 4)) * target).toFixed(dec)))
      if (p < 1) r.current = requestAnimationFrame(tick)
    }
    r.current = requestAnimationFrame(tick)
    return () => { if (r.current) cancelAnimationFrame(r.current) }
  }, [target, dur, dec])
  return v
}

function HolographicDisc() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
      {/* Outer glow */}
      <div
        className="absolute inset-[-20%] rounded-full opacity-30 blur-[60px]"
        style={{
          background: 'conic-gradient(from 0deg, #e879f9, #818cf8, #38bdf8, #34d399, #fbbf24, #fb923c, #e879f9)',
          animation: 'holoSpin 12s linear infinite',
        }}
      />
      {/* Main disc */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(232,121,249,0.15), rgba(129,140,248,0.15), rgba(56,189,248,0.15), rgba(52,211,153,0.15), rgba(251,191,36,0.12), rgba(251,146,60,0.12), rgba(232,121,249,0.15))',
          animation: 'holoSpin 8s linear infinite',
          boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
        }}
      />
      {/* Inner disc */}
      <div
        className="absolute inset-[15%] rounded-full"
        style={{
          background: 'conic-gradient(from 180deg, rgba(129,140,248,0.1), rgba(56,189,248,0.1), rgba(52,211,153,0.1), rgba(251,191,36,0.08), rgba(232,121,249,0.1), rgba(129,140,248,0.1))',
          animation: 'holoSpin 15s linear infinite reverse',
        }}
      />
      {/* Center */}
      <div className="absolute inset-[35%] rounded-full bg-[#fafaf9]" style={{ boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.03)' }} />
      {/* Reflection line */}
      <div
        className="absolute inset-[5%] rounded-full border border-white/60"
        style={{ animation: 'holoSpin 20s linear infinite' }}
      />
    </div>
  )
}

function HoloBar() {
  return (
    <div className="h-[2px] w-full" style={{
      background: 'linear-gradient(90deg, rgba(232,121,249,0.3), rgba(129,140,248,0.3), rgba(56,189,248,0.3), rgba(52,211,153,0.3), rgba(251,191,36,0.2))',
    }} />
  )
}

export default function Design5() {
  const devices = useCounter(14832, 2500)
  const uptime = useCounter(99.97, 3000, 2)
  const downtime = useCounter(73, 2000)
  const savings = useCounter(4.2, 2200, 1)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        .font-serif-inst { font-family: 'Instrument Serif', serif; }
        .font-sans-body { font-family: 'DM Sans', sans-serif; }
        @keyframes holoSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerHolo {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .fade-1 { animation-delay: 0.05s; }
        .fade-2 { animation-delay: 0.15s; }
        .fade-3 { animation-delay: 0.25s; }
        .fade-4 { animation-delay: 0.35s; }
        .fade-5 { animation-delay: 0.45s; }
        .holo-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(232,121,249,0.08) 15%, rgba(129,140,248,0.08) 30%, rgba(56,189,248,0.08) 45%, rgba(52,211,153,0.06) 60%, rgba(251,191,36,0.05) 75%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmerHolo 4s ease-in-out infinite;
        }
        .holo-border-btn {
          position: relative;
          z-index: 0;
        }
        .holo-border-btn::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: conic-gradient(from 0deg, #e879f9, #818cf8, #38bdf8, #34d399, #fbbf24, #fb923c, #e879f9);
          z-index: -1;
          animation: holoSpin 6s linear infinite;
        }
        .holo-border-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: #1c1917;
          z-index: -1;
        }
      `}</style>

      <div className="min-h-screen font-sans-body" style={{ background: '#fafaf9', color: '#44403c' }}>
        {/* Nav */}
        <nav className="flex items-center justify-between px-8 md:px-16 py-6">
          <Link to="/" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
            <span className="text-[11px] tracking-[0.15em] uppercase font-medium">Designs</span>
          </Link>
          <span className="font-serif-inst text-xl text-stone-800">
            Horizon
          </span>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[11px] tracking-[0.12em] uppercase text-stone-400 hover:text-stone-600 transition-colors font-medium hidden md:block">Platform</a>
            <a href="#" className="text-[11px] tracking-[0.12em] uppercase text-stone-400 hover:text-stone-600 transition-colors font-medium hidden md:block">Pricing</a>
            <button className="px-5 py-2 rounded-full text-[11px] tracking-[0.1em] uppercase font-medium text-white" style={{ background: '#1c1917' }}>
              Get Started
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="min-h-[92vh] flex flex-col items-center justify-center px-8 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="fade-up fade-1 mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium border border-stone-200 text-stone-400">
                Industrial IoT Platform
              </span>
            </div>
            <h1 className="font-serif-inst text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-stone-900 fade-up fade-2">
              The Future of<br />
              <em className="not-italic" style={{
                background: 'linear-gradient(135deg, #44403c 0%, #78716c 30%, #a8a29e 60%, #44403c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Industrial Operations</em>
            </h1>
            <p className="text-stone-400 text-base md:text-lg max-w-xl mx-auto mt-8 font-light leading-relaxed fade-up fade-3">
              Monitor, predict, and control every connected device across your entire operation with precision-engineered intelligence.
            </p>
            <div className="flex items-center justify-center gap-4 mt-10 fade-up fade-4">
              <button className="px-7 py-3.5 rounded-full text-[12px] tracking-[0.08em] font-medium text-white transition-all hover:shadow-lg" style={{ background: '#1c1917' }}>
                Start Free Trial
              </button>
              <button className="px-7 py-3.5 rounded-full text-[12px] tracking-[0.08em] font-medium text-stone-500 border border-stone-200 hover:border-stone-300 transition-all">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Holographic disc */}
          <div className="mt-16 md:mt-20 fade-up fade-5">
            <HolographicDisc />
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="py-28 md:py-36 px-8 md:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-stone-400 block mb-4">Capabilities</span>
              <h2 className="font-serif-inst text-4xl md:text-5xl lg:text-6xl text-stone-900 tracking-tight">
                Precision at Every Layer
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-stone-200">
              {[
                { title: 'Sensor Fusion', desc: 'Aggregate thousands of heterogeneous sensors into a unified data stream with sub-millisecond synchronization.' },
                { title: 'Predictive Analytics', desc: 'Machine learning models predict equipment failures 72 hours in advance with 99.2% accuracy.' },
                { title: 'Edge Computing', desc: 'Process critical data at the source with under 5ms latency. Autonomous decisions at the edge.' },
                { title: 'Protocol Bridge', desc: 'Native support for OPC-UA, Modbus, MQTT, and 40+ industrial protocols with zero-config discovery.' },
                { title: 'Digital Twin', desc: 'Real-time virtual representations of physical assets for simulation, monitoring, and optimization.' },
                { title: 'Cyber Security', desc: 'Zero-trust architecture with end-to-end encryption, SOC2 Type II, and IEC 62443 compliance.' },
              ].map((cap, i) => (
                <div
                  key={i}
                  className="bg-[#fafaf9] p-8 md:p-10 group hover:bg-white transition-all relative overflow-hidden"
                >
                  {/* Holo accent bar */}
                  <div className="absolute top-0 left-0 right-0"><HoloBar /></div>
                  {/* Prismatic hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 holo-shimmer pointer-events-none" />

                  <h3 className="font-serif-inst text-xl text-stone-800 mb-3 relative">{cap.title}</h3>
                  <p className="text-sm text-stone-400 font-light leading-relaxed relative">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE NUMBERS */}
        <section className="py-24 md:py-32 px-8 md:px-16 border-y border-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-stone-400">Performance</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {[
                { value: devices.toLocaleString(), label: 'Active Devices', sub: 'Across 47 sites' },
                { value: `${uptime}%`, label: 'Platform Uptime', sub: 'Annual average' },
                { value: `${downtime}%`, label: 'Less Downtime', sub: 'First quarter' },
                { value: `$${savings}M`, label: 'Saved Annually', sub: 'Per deployment' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`text-center py-8 md:py-12 group cursor-default ${i < 3 ? 'md:border-r border-stone-200' : ''} ${i < 2 ? 'border-r border-stone-200 md:border-r' : ''}`}
                >
                  <div className="relative inline-block">
                    <span className="font-serif-inst text-4xl md:text-5xl lg:text-6xl text-stone-900 group-hover:opacity-0 transition-opacity duration-300">
                      {stat.value}
                    </span>
                    {/* Holographic version on hover */}
                    <span
                      className="font-serif-inst text-4xl md:text-5xl lg:text-6xl absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(90deg, #e879f9, #818cf8, #38bdf8, #34d399, #fbbf24)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <span className="block text-[11px] tracking-[0.15em] uppercase font-medium text-stone-400 mt-3">{stat.label}</span>
                  <span className="block text-[10px] text-stone-300 mt-1 font-light">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-28 md:py-36 px-8 md:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-stone-400 block mb-4">Process</span>
              <h2 className="font-serif-inst text-4xl md:text-5xl lg:text-6xl text-stone-900 tracking-tight">
                Three Steps to Clarity
              </h2>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-[1px]" style={{
                background: 'linear-gradient(90deg, rgba(232,121,249,0.2), rgba(129,140,248,0.2), rgba(56,189,248,0.2), rgba(52,211,153,0.2))',
              }} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                {[
                  { num: '01', title: 'Connect', desc: 'Deploy edge gateways across your facilities. Auto-discover devices through 40+ industrial protocols. No infrastructure changes required.' },
                  { num: '02', title: 'Analyze', desc: 'Our ML engine learns your operational patterns. Within days, it begins predicting anomalies and optimizing performance autonomously.' },
                  { num: '03', title: 'Command', desc: 'Access your unified command center. Monitor every device, respond to alerts, and make data-driven decisions in real time.' },
                ].map((step, i) => (
                  <div key={i} className="text-center md:text-left relative">
                    {/* Number circle */}
                    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border border-stone-200 mb-8" style={{ background: '#fafaf9', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                      <span className="font-serif-inst text-lg text-stone-500">{step.num}</span>
                      {/* Subtle holo ring */}
                      <div className="absolute inset-[-3px] rounded-full opacity-0 hover:opacity-100 transition-opacity" style={{
                        background: 'conic-gradient(from 0deg, rgba(232,121,249,0.15), rgba(129,140,248,0.15), rgba(56,189,248,0.15), rgba(52,211,153,0.1), rgba(232,121,249,0.15))',
                        animation: 'holoSpin 8s linear infinite',
                        mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                        WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                      }} />
                    </div>
                    <h3 className="font-serif-inst text-2xl text-stone-800 mb-3">{step.title}</h3>
                    <p className="text-sm text-stone-400 font-light leading-relaxed max-w-xs mx-auto md:mx-0">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY */}
        <section className="py-24 px-8 md:px-16 border-t border-stone-200">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium text-stone-300 text-center mb-12">
              Trusted by Industry Leaders
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center mb-24">
              {['Siemens', 'ABB', 'Bosch', 'Honeywell', 'Schneider', 'Emerson'].map((name, i) => (
                <div key={i} className="flex items-center justify-center h-10">
                  <span className="text-sm tracking-[0.15em] uppercase text-stone-300 font-medium">{name}</span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="max-w-3xl mx-auto text-center">
              <div className="h-[1px] w-16 mx-auto mb-12" style={{
                background: 'linear-gradient(90deg, rgba(232,121,249,0.3), rgba(129,140,248,0.3), rgba(56,189,248,0.3))',
              }} />
              <blockquote className="font-serif-inst text-2xl md:text-3xl lg:text-4xl text-stone-700 leading-relaxed italic font-normal">
                "The clarity Horizon brings to our operations is remarkable. We reduced unplanned downtime by 73% and saved $4.2M in the first year alone."
              </blockquote>
              <div className="mt-10">
                <span className="text-sm font-medium text-stone-600 block">Helena Richter</span>
                <span className="text-xs text-stone-400 font-light">Chief Operations Officer, Rheinmetall Industries</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA — Dark section */}
        <section className="py-24 md:py-32 px-8" style={{ background: '#1c1917' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif-inst text-4xl md:text-5xl lg:text-6xl text-white/95 tracking-tight leading-tight mb-6">
              Begin Your Journey<br />to Industrial Clarity
            </h2>
            <p className="text-stone-500 text-base font-light max-w-lg mx-auto mb-10 leading-relaxed">
              Deploy in under 48 hours. No infrastructure changes. Experience the future of industrial operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="holo-border-btn px-8 py-4 rounded-full text-sm font-medium text-white tracking-wide">
                Start Free Pilot
              </button>
              <button className="px-8 py-4 rounded-full text-sm font-light text-stone-500 border border-stone-700 hover:border-stone-500 hover:text-stone-300 transition-all">
                Schedule a Demo
              </button>
            </div>
            <p className="text-[10px] text-stone-600 mt-8 tracking-[0.15em] uppercase font-light">
              No credit card · 30-day pilot · SOC2 compliant
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 px-8 md:px-16 border-t border-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
              <div className="col-span-2 md:col-span-1">
                <span className="font-serif-inst text-xl text-stone-800 block mb-3">Horizon</span>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Precision-engineered industrial intelligence.
                </p>
              </div>
              {[
                { title: 'Product', links: ['Platform', 'Edge Runtime', 'Analytics', 'Security'] },
                { title: 'Resources', links: ['Documentation', 'API Reference', 'Changelog', 'Status'] },
                { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
                { title: 'Legal', links: ['Privacy', 'Terms', 'Compliance', 'Security'] },
              ].map((col, i) => (
                <div key={i}>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-stone-400 block mb-4">{col.title}</span>
                  <ul className="space-y-2.5">
                    {col.links.map((link, j) => (
                      <li key={j}><a href="#" className="text-sm text-stone-400 hover:text-stone-600 transition-colors font-light">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-stone-300 tracking-wider">© 2026 Horizon Industrial Intelligence</span>
              {/* Tiny holo accent */}
              <div className="h-[1px] w-24" style={{
                background: 'linear-gradient(90deg, rgba(232,121,249,0.15), rgba(129,140,248,0.15), rgba(56,189,248,0.15), rgba(52,211,153,0.1))',
              }} />
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
