import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

function useCounter(target: number, duration = 2000, decimals = 0) {
  const [val, setVal] = useState(0)
  const ref = useRef<number | null>(null)
  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setVal(Number((eased * target).toFixed(decimals)))
      if (p < 1) ref.current = requestAnimationFrame(tick)
    }
    ref.current = requestAnimationFrame(tick)
    return () => { if (ref.current) cancelAnimationFrame(ref.current) }
  }, [target, duration, decimals])
  return val
}

function ProgressRing({ percent, color1, color2, size = 100, stroke = 6 }: { percent: number; color1: string; color2: string; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const [offset, setOffset] = useState(circ)
  useEffect(() => {
    const timer = setTimeout(() => setOffset(circ - (percent / 100) * circ), 300)
    return () => clearTimeout(timer)
  }, [percent, circ])
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={`url(#grad-${color1})`}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
      />
      <defs>
        <linearGradient id={`grad-${color1}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
    </svg>
  )
}

function PulseLine() {
  return (
    <div className="w-full overflow-hidden h-20 relative">
      <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="33%" stopColor="#ec4899" />
            <stop offset="66%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <filter id="pulseGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M0,40 L100,40 L120,40 L140,15 L160,65 L180,10 L200,70 L220,35 L240,45 L260,40 L400,40 L420,40 L440,20 L460,60 L480,5 L500,75 L520,30 L540,50 L560,40 L700,40 L720,40 L740,25 L760,55 L780,8 L800,72 L820,32 L840,48 L860,40 L1000,40 L1020,40 L1040,18 L1060,62 L1080,12 L1100,68 L1120,38 L1140,42 L1160,40 L1200,40"
          fill="none"
          stroke="url(#pulseGrad)"
          strokeWidth="2"
          filter="url(#pulseGlow)"
          style={{ animation: 'dashPulse 3s linear infinite' }}
          strokeDasharray="8 4"
        />
        <path
          d="M0,40 L100,40 L120,40 L140,15 L160,65 L180,10 L200,70 L220,35 L240,45 L260,40 L400,40 L420,40 L440,20 L460,60 L480,5 L500,75 L520,30 L540,50 L560,40 L700,40 L720,40 L740,25 L760,55 L780,8 L800,72 L820,32 L840,48 L860,40 L1000,40 L1020,40 L1040,18 L1060,62 L1080,12 L1100,68 L1120,38 L1140,42 L1160,40 L1200,40"
          fill="none"
          stroke="url(#pulseGrad)"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
      {/* Scanning highlight */}
      <div
        className="absolute top-0 h-full w-32 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)',
          animation: 'scanAcross 3s linear infinite',
        }}
      />
    </div>
  )
}

function WaveVisualization() {
  return (
    <div className="w-full h-48 md:h-64 relative overflow-hidden">
      <svg viewBox="0 0 1440 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d="M0,100 C240,40 480,160 720,100 C960,40 1200,160 1440,100 L1440,200 L0,200 Z" fill="url(#wave1)" style={{ animation: 'waveMove1 8s ease-in-out infinite' }} />
        <path d="M0,120 C360,60 600,180 900,100 C1100,50 1300,150 1440,120 L1440,200 L0,200 Z" fill="url(#wave2)" style={{ animation: 'waveMove2 10s ease-in-out infinite' }} />
        <path d="M0,140 C200,100 500,170 800,130 C1000,100 1200,160 1440,130 L1440,200 L0,200 Z" fill="url(#wave3)" style={{ animation: 'waveMove3 12s ease-in-out infinite' }} />
      </svg>
      {/* Floating particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3) * 2,
            height: 2 + (i % 3) * 2,
            left: `${(i * 8.3) + 2}%`,
            bottom: `${20 + Math.sin(i) * 30}%`,
            background: i % 3 === 0 ? '#7c3aed' : i % 3 === 1 ? '#ec4899' : '#14b8a6',
            opacity: 0.5,
            animation: `floatParticle ${3 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function Design3() {
  const devices = useCounter(14832, 2500)
  const uptime = useCounter(99.97, 3000, 2)
  const savings = useCounter(4.2, 2000, 1)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800&display=swap');
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, -40px) scale(1.1); }
          66% { transform: translate(-40px, 60px) scale(0.9); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-60px, 50px) scale(0.95); }
          66% { transform: translate(50px, -30px) scale(1.05); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, 40px); }
        }
        @keyframes dashPulse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -24; }
        }
        @keyframes scanAcross {
          0% { left: -10%; }
          100% { left: 110%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes waveMove1 {
          0%, 100% { d: path("M0,100 C240,40 480,160 720,100 C960,40 1200,160 1440,100 L1440,200 L0,200 Z"); }
          50% { d: path("M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z"); }
        }
        @keyframes waveMove2 {
          0%, 100% { d: path("M0,120 C360,60 600,180 900,100 C1100,50 1300,150 1440,120 L1440,200 L0,200 Z"); }
          50% { d: path("M0,120 C360,170 600,70 900,140 C1100,100 1300,60 1440,120 L1440,200 L0,200 Z"); }
        }
        @keyframes waveMove3 {
          0%, 100% { d: path("M0,140 C200,100 500,170 800,130 C1000,100 1200,160 1440,130 L1440,200 L0,200 Z"); }
          50% { d: path("M0,130 C200,160 500,100 800,150 C1000,120 1200,100 1440,140 L1440,200 L0,200 Z"); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-20px); opacity: 0.8; }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes borderRotate {
          0% { --angle: 0deg; }
          100% { --angle: 360deg; }
        }
        .pulse-fade { animation: slideUp 0.7s ease-out both; }
        .pulse-fade-1 { animation-delay: 0.1s; }
        .pulse-fade-2 { animation-delay: 0.2s; }
        .pulse-fade-3 { animation-delay: 0.3s; }
        .pulse-fade-4 { animation-delay: 0.4s; }
        .pulse-fade-5 { animation-delay: 0.5s; }
        .pulse-scale { animation: scaleIn 0.6s ease-out both; }
      `}</style>

      <div className="min-h-screen text-white relative overflow-hidden" style={{ background: '#0c0a1a', fontFamily: "'Outfit', sans-serif" }}>
        {/* Floating gradient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
            style={{ top: '-10%', left: '-5%', background: '#7c3aed', animation: 'orbFloat1 20s ease-in-out infinite' }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            style={{ top: '30%', right: '-8%', background: '#ec4899', animation: 'orbFloat2 25s ease-in-out infinite' }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[90px] opacity-15"
            style={{ bottom: '5%', left: '20%', background: '#14b8a6', animation: 'orbFloat3 18s ease-in-out infinite' }}
          />
          <div
            className="absolute w-[350px] h-[350px] rounded-full blur-[80px] opacity-10"
            style={{ top: '60%', left: '50%', background: '#f43f5e', animation: 'orbFloat1 22s ease-in-out 3s infinite' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Nav */}
          <nav className="flex items-center justify-between px-8 md:px-12 py-6">
            <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              <span className="text-xs tracking-widest uppercase font-light">Designs</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extralight tracking-tighter">
                <span style={{ color: '#7c3aed' }}>Pulse</span>
                <span className="text-white/20">.</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors font-light tracking-wide hidden md:block">Platform</a>
              <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors font-light tracking-wide hidden md:block">Pricing</a>
              <button className="px-5 py-2 rounded-full text-xs font-medium tracking-wide" style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', }}>
                Get Started
              </button>
            </div>
          </nav>

          {/* HERO */}
          <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="pulse-fade pulse-fade-1 mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase border" style={{ borderColor: 'rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.08)', color: '#a78bfa' }}>
                Industrial IoT Redefined
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight leading-[0.95] mb-2 pulse-fade pulse-fade-2">
              Feel the{' '}
              <span className="font-semibold" style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f43f5e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Pulse</span>
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight leading-[0.95] mb-8 pulse-fade pulse-fade-3">
              of Your Factory
            </h1>
            <p className="text-white/35 text-lg md:text-xl max-w-xl mx-auto font-extralight leading-relaxed mb-10 pulse-fade pulse-fade-4">
              Real-time monitoring, predictive intelligence, and total control over every connected device in your industrial ecosystem.
            </p>
            <div className="flex items-center gap-4 mb-16 pulse-fade pulse-fade-5">
              <button
                className="group relative px-8 py-4 rounded-full text-sm font-medium tracking-wide overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
              >
                <span className="relative z-10">Start Monitoring Free</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}
                />
              </button>
              <button className="px-8 py-4 rounded-full text-sm font-light text-white/40 border border-white/10 hover:border-white/20 hover:text-white/60 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Pulse Line */}
            <div className="w-full max-w-4xl mx-auto pulse-fade pulse-fade-5">
              <PulseLine />
            </div>
          </section>

          {/* SIGNAL CARDS */}
          <section className="py-28 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase pulse-fade" style={{ color: '#ec4899' }}>Live Signals</span>
                <h2 className="text-4xl md:text-6xl font-extralight tracking-tight mt-3 pulse-fade pulse-fade-1">
                  Every Signal, <span className="font-semibold" style={{ color: '#a78bfa' }}>Captured</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Sensor Uptime', percent: 99.7, desc: 'Continuous monitoring across all connected devices with automatic failover.', grad: ['#7c3aed', '#ec4899'] },
                  { title: 'Threat Detection', percent: 94, desc: 'AI-driven anomaly detection identifies equipment failures before they happen.', grad: ['#ec4899', '#f43f5e'] },
                  { title: 'Data Accuracy', percent: 99.2, desc: 'Edge-processed data with cryptographic verification ensures data integrity.', grad: ['#14b8a6', '#7c3aed'] },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="relative p-[1px] rounded-2xl pulse-scale"
                    style={{ animationDelay: `${i * 0.15}s`, background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})` }}
                  >
                    <div className="rounded-2xl p-8 h-full" style={{ background: '#0c0a1a' }}>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-medium text-white/90 mb-1">{card.title}</h3>
                          <span className="text-3xl font-extralight" style={{ color: card.grad[0] }}>{card.percent}%</span>
                        </div>
                        <ProgressRing percent={card.percent} color1={card.grad[0]} color2={card.grad[1]} size={80} stroke={5} />
                      </div>
                      <p className="text-sm text-white/30 font-light leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BENTO GRID — Platform Features */}
          <section className="py-28 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: '#14b8a6' }}>The Platform</span>
                <h2 className="text-4xl md:text-6xl font-extralight tracking-tight mt-3">
                  Built for <span className="font-semibold" style={{ color: '#ec4899' }}>Scale</span>
                </h2>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[140px]">
                {/* Large hero card */}
                <div className="col-span-4 md:col-span-3 row-span-2 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.08))' }}>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-violet-400/70">Real-Time Dashboard</span>
                    <h3 className="text-2xl font-light text-white/90 mt-2">See everything.<br /><span className="font-semibold">Control everything.</span></h3>
                  </div>
                  <p className="text-sm text-white/30 font-light max-w-xs">Unified view of every sensor, PLC, and robotic system with sub-second refresh rates.</p>
                  <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-[60px] opacity-20" style={{ background: '#7c3aed' }} />
                </div>

                {/* Counter card */}
                <div className="col-span-2 md:col-span-3 row-span-1 rounded-2xl p-6 border border-white/[0.06] flex items-center gap-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div>
                    <span className="text-4xl font-extralight" style={{ color: '#7c3aed' }}>{devices.toLocaleString()}</span>
                    <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 mt-1">Active Devices</span>
                  </div>
                  <div className="flex-1 flex items-end gap-[2px] h-12">
                    {[40, 55, 35, 70, 45, 80, 60, 90, 50, 75, 65, 85].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm transition-all" style={{
                        height: `${h}%`,
                        background: `linear-gradient(to top, #7c3aed, #ec4899)`,
                        opacity: 0.3 + (i / 12) * 0.7,
                        animation: `slideUp 0.5s ease-out ${i * 0.05}s both`,
                      }} />
                    ))}
                  </div>
                </div>

                {/* Uptime card */}
                <div className="col-span-2 md:col-span-3 row-span-1 rounded-2xl p-6 border border-white/[0.06] flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div>
                    <span className="text-4xl font-extralight" style={{ color: '#14b8a6' }}>{uptime}%</span>
                    <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 mt-1">System Uptime</span>
                  </div>
                  <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]" style={{ background: '#14b8a6' }} />
                </div>

                {/* Feature cards */}
                <div className="col-span-2 row-span-1 rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(124,58,237,0.06))' }}>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-teal-400/70">Edge Computing</span>
                  <p className="text-sm text-white/50 font-light mt-2">&lt;5ms latency at the edge</p>
                </div>

                <div className="col-span-2 row-span-1 rounded-2xl p-6 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-pink-400/70">Predictive ML</span>
                  <p className="text-sm text-white/50 font-light mt-2">72hr failure forecasting</p>
                </div>

                <div className="col-span-2 row-span-1 rounded-2xl p-6 border border-white/[0.06] flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div>
                    <span className="text-3xl font-extralight" style={{ color: '#f43f5e' }}>${savings}M</span>
                    <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 mt-1">Annual Savings</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WAVE VISUALIZATION */}
          <section className="py-16">
            <WaveVisualization />
          </section>

          {/* PRICING */}
          <section className="py-28 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: '#7c3aed' }}>Pricing</span>
                <h2 className="text-4xl md:text-6xl font-extralight tracking-tight mt-3">
                  Start <span className="font-semibold" style={{ color: '#ec4899' }}>Today</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {[
                  {
                    name: 'Starter',
                    price: '$499',
                    period: '/mo',
                    desc: 'For small operations',
                    features: ['Up to 500 devices', '1 site', 'Standard analytics', 'Email support', '30-day data retention'],
                    cta: 'Start Free Trial',
                    highlight: false,
                  },
                  {
                    name: 'Enterprise',
                    price: '$2,499',
                    period: '/mo',
                    desc: 'For industrial scale',
                    features: ['Unlimited devices', 'Unlimited sites', 'Predictive ML engine', 'Dedicated support', 'Unlimited retention', 'Custom integrations'],
                    cta: 'Start Free Trial',
                    highlight: true,
                  },
                  {
                    name: 'Platform',
                    price: 'Custom',
                    period: '',
                    desc: 'For complex deployments',
                    features: ['Everything in Enterprise', 'On-premises option', 'Air-gapped deployment', 'Custom ML models', 'SLA guarantees'],
                    cta: 'Contact Sales',
                    highlight: false,
                  },
                ].map((tier, i) => (
                  <div
                    key={i}
                    className={`relative rounded-2xl ${tier.highlight ? 'p-[2px]' : 'p-[1px]'}`}
                    style={tier.highlight
                      ? { background: 'linear-gradient(135deg, #7c3aed, #ec4899, #f43f5e, #14b8a6)' }
                      : { background: 'rgba(255,255,255,0.06)' }
                    }
                  >
                    {tier.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
                        Popular
                      </div>
                    )}
                    <div className={`rounded-2xl p-8 h-full flex flex-col ${tier.highlight ? 'bg-[#0f0d1f]' : ''}`} style={!tier.highlight ? { background: '#0c0a1a' } : {}}>
                      <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40">{tier.name}</span>
                      <div className="mt-3 mb-1">
                        <span className="text-4xl font-light text-white/90">{tier.price}</span>
                        <span className="text-sm text-white/30 font-light">{tier.period}</span>
                      </div>
                      <p className="text-xs text-white/25 font-light mb-6">{tier.desc}</p>
                      <ul className="space-y-3 flex-1 mb-8">
                        {tier.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-white/40 font-light">
                            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: tier.highlight ? '#ec4899' : '#7c3aed', boxShadow: `0 0 4px ${tier.highlight ? '#ec4899' : '#7c3aed'}40` }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="w-full py-3.5 rounded-full text-sm font-medium tracking-wide transition-all"
                        style={tier.highlight
                          ? { background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white' }
                          : { border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }
                        }
                      >
                        {tier.cta}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-32 px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[0.95] mb-8">
                <span style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 30%, #f43f5e 60%, #14b8a6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Your Factory</span>
                <br />
                <span className="text-white/90 font-semibold">Deserves a Pulse</span>
              </h2>
              <p className="text-white/30 text-lg font-extralight max-w-lg mx-auto mb-10">
                Join hundreds of manufacturers who have transformed their operations with real-time industrial intelligence.
              </p>
              <button
                className="relative px-10 py-5 rounded-full text-sm font-medium tracking-wide overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
              >
                <span className="relative z-10">Deploy Your Command Center</span>
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2.5s infinite',
                  }}
                />
              </button>
              <p className="text-[11px] text-white/15 mt-6 tracking-wider font-light">Free 30-day pilot · No credit card · SOC2 compliant</p>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/[0.04] py-12 px-8 md:px-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <span className="text-xl font-extralight tracking-tighter">
                <span style={{ color: '#7c3aed' }}>Pulse</span>
                <span className="text-white/15">.</span>
                <span className="text-white/15 text-sm font-light ml-2">IIoT Platform</span>
              </span>
              <div className="flex items-center gap-8">
                {['Platform', 'Pricing', 'Docs', 'Blog', 'Privacy', 'Terms'].map((link, i) => (
                  <a key={i} href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors font-light">{link}</a>
                ))}
              </div>
              <span className="text-[10px] text-white/10 font-light">© 2026 Pulse Industrial</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
