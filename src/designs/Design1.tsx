import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

function useAnimatedCounter(target: number, duration: number = 2000, decimals: number = 0) {
  const [value, setValue] = useState(0)
  const startTime = useRef<number | null>(null)
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Number((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration, decimals])
  return value
}

function GridNode({ x, y, delay, size = 4 }: { x: number; y: number; delay: number; size?: number }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
        boxShadow: '0 0 12px 3px rgba(6,182,212,0.4)',
        animation: `nodePulse 3s ease-in-out ${delay}s infinite`,
      }}
    />
  )
}

function GridLine({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  return (
    <div
      className="absolute origin-left"
      style={{
        left: `${x1}%`,
        top: `${y1}%`,
        width: `${length}%`,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(6,182,212,0.3) 0%, rgba(34,211,238,0.1) 100%)',
        transform: `rotate(${angle}deg)`,
        animation: `lineFlow 4s ease-in-out ${delay}s infinite`,
      }}
    />
  )
}

function ScanLine() {
  return (
    <div
      className="absolute left-0 w-full pointer-events-none"
      style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.5) 30%, rgba(34,211,238,0.8) 50%, rgba(6,182,212,0.5) 70%, transparent 100%)',
        animation: 'scanDown 6s linear infinite',
        boxShadow: '0 0 20px 4px rgba(6,182,212,0.2)',
      }}
    />
  )
}

function DashboardBar({ height, delay, color }: { height: number; delay: number; color: string }) {
  return (
    <div className="flex-1 flex items-end h-full">
      <div
        className="w-full rounded-t-sm"
        style={{
          height: `${height}%`,
          background: `linear-gradient(to top, ${color}, ${color}88)`,
          animation: `barGrow 1.5s ease-out ${delay}s both, barPulse 3s ease-in-out ${delay + 1.5}s infinite`,
        }}
      />
    </div>
  )
}

function FeatureIcon({ type }: { type: 'sensor' | 'analytics' | 'alert' | 'connect' | 'shield' | 'clock' }) {
  const base = "relative w-12 h-12 flex items-center justify-center"
  switch (type) {
    case 'sensor':
      return (
        <div className={base}>
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
          <div className="absolute inset-0 rounded-full border border-cyan-500/30" style={{ animation: 'ripple 2s ease-out infinite' }} />
          <div className="absolute inset-[-4px] rounded-full border border-cyan-500/15" style={{ animation: 'ripple 2s ease-out 0.5s infinite' }} />
          <div className="absolute inset-[-8px] rounded-full border border-cyan-500/10" style={{ animation: 'ripple 2s ease-out 1s infinite' }} />
        </div>
      )
    case 'analytics':
      return (
        <div className={base}>
          <div className="flex items-end gap-[3px] h-8">
            {[40, 65, 50, 80, 60].map((h, i) => (
              <div key={i} className="w-[5px] rounded-t-sm bg-gradient-to-t from-cyan-500 to-cyan-300" style={{ height: `${h}%`, animation: `barPulse 2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </div>
        </div>
      )
    case 'alert':
      return (
        <div className={base}>
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[22px] border-l-transparent border-r-transparent border-b-orange-500" style={{ filter: 'drop-shadow(0 0 6px rgba(249,115,22,0.5))' }} />
          <div className="absolute top-[10px] w-[2px] h-[8px] bg-white rounded-full" />
          <div className="absolute top-[21px] w-[2px] h-[2px] bg-white rounded-full" />
        </div>
      )
    case 'connect':
      return (
        <div className={base}>
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute left-1 top-1 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute right-1 bottom-1 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          <div className="absolute left-[14px] top-[14px] w-[20px] h-[1px] bg-cyan-400/60 rotate-45 origin-left" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 absolute right-1 top-1 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          <div className="absolute right-[12px] top-[14px] w-[16px] h-[1px] bg-green-400/40 rotate-[-30deg] origin-right" />
        </div>
      )
    case 'shield':
      return (
        <div className={base}>
          <div className="w-8 h-9 border-2 border-cyan-400/70 rounded-b-[50%] rounded-t-sm relative" style={{ clipPath: 'polygon(50% 0%, 100% 12%, 100% 60%, 50% 100%, 0% 60%, 0% 12%)' }}>
            <div className="absolute inset-0 bg-cyan-400/10" />
          </div>
          <div className="absolute w-[10px] h-[6px] border-b-2 border-l-2 border-cyan-300 rotate-[-45deg] top-[18px]" />
        </div>
      )
    case 'clock':
      return (
        <div className={base}>
          <div className="w-9 h-9 rounded-full border-2 border-cyan-400/60 relative">
            <div className="absolute top-[50%] left-[50%] w-[1px] h-[10px] bg-cyan-300 origin-bottom" style={{ transform: 'translate(-50%, -100%)', animation: 'clockHand 8s linear infinite' }} />
            <div className="absolute top-[50%] left-[50%] w-[1px] h-[7px] bg-cyan-400 origin-bottom" style={{ transform: 'translate(-50%, -100%) rotate(90deg)' }} />
            <div className="absolute top-[50%] left-[50%] w-[3px] h-[3px] bg-cyan-300 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      )
  }
}

const nodes = [
  { x: 10, y: 20 }, { x: 25, y: 35 }, { x: 40, y: 15 }, { x: 55, y: 40 },
  { x: 70, y: 22 }, { x: 85, y: 38 }, { x: 15, y: 55 }, { x: 35, y: 60 },
  { x: 50, y: 70 }, { x: 65, y: 55 }, { x: 80, y: 65 }, { x: 92, y: 50 },
  { x: 20, y: 80 }, { x: 45, y: 85 }, { x: 75, y: 80 }, { x: 90, y: 75 },
  { x: 30, y: 10 }, { x: 60, y: 8 }, { x: 5, y: 45 }, { x: 95, y: 25 },
]

const lines = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [6, 7], [7, 8], [8, 9], [9, 10],
  [10, 11], [12, 13], [13, 14], [14, 15], [0, 6], [1, 7], [2, 8], [3, 9],
  [4, 10], [5, 11], [6, 12], [7, 13], [9, 14], [10, 15], [16, 2], [17, 4],
  [18, 0], [19, 5],
]

export default function Design1() {
  const uptime = useAnimatedCounter(99.97, 2500, 2)
  const sensors = useAnimatedCounter(14832, 3000, 0)
  const latency = useAnimatedCounter(12, 2000, 0)
  const throughput = useAnimatedCounter(2.4, 2800, 1)
  const [liveValues, setLiveValues] = useState([72, 45, 88, 63, 91, 34])

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveValues(prev => prev.map(v => Math.max(10, Math.min(95, v + (Math.random() - 0.5) * 15))))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @keyframes nodePulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.8); }
        }
        @keyframes lineFlow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.6; }
        }
        @keyframes scanDown {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes barGrow {
          0% { height: 0%; }
        }
        @keyframes barPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes clockHand {
          0% { transform: translate(-50%, -100%) rotate(0deg); }
          100% { transform: translate(-50%, -100%) rotate(360deg); }
        }
        @keyframes glowBorder {
          0%, 100% { border-color: rgba(6,182,212,0.3); box-shadow: 0 0 20px rgba(6,182,212,0.1); }
          50% { border-color: rgba(6,182,212,0.7); box-shadow: 0 0 40px rgba(6,182,212,0.2), 0 0 80px rgba(6,182,212,0.1); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dataStream {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        @keyframes statusBlink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.3; }
        }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-jb { font-family: 'JetBrains Mono', monospace; }
        .fade-up { animation: fadeUp 0.8s ease-out both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.2s; }
        .fade-up-3 { animation-delay: 0.3s; }
        .fade-up-4 { animation-delay: 0.4s; }
        .fade-up-5 { animation-delay: 0.5s; }
        .fade-up-6 { animation-delay: 0.6s; }
      `}</style>

      <div className="min-h-screen text-white" style={{ background: '#030712', fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5" style={{ background: 'linear-gradient(to bottom, #030712 0%, transparent 100%)' }}>
          <Link to="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            <span className="font-mono-jb text-xs tracking-widest uppercase">All Designs</span>
          </Link>
          <div className="flex items-center gap-8">
            <span className="font-mono-jb text-[11px] tracking-wider text-zinc-500 hidden md:block">
              SYS:<span className="text-green-400 ml-1" style={{ animation: 'statusBlink 3s infinite' }}>ONLINE</span>
            </span>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
              <span className="font-mono-jb text-[11px] text-zinc-400">v4.2.1</span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Animated nodes and lines */}
          <div className="absolute inset-0">
            {lines.map(([a, b], i) => (
              <GridLine key={`line-${i}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} delay={i * 0.15} />
            ))}
            {nodes.map((node, i) => (
              <GridNode key={`node-${i}`} x={node.x} y={node.y} delay={i * 0.2} size={i % 3 === 0 ? 6 : 4} />
            ))}
            <ScanLine />
          </div>

          {/* Radial overlay */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, #030712 70%)',
          }} />

          {/* Hero content */}
          <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
            <div className="fade-up fade-up-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-800/40 mb-8" style={{ background: 'rgba(6,182,212,0.06)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                <span className="font-mono-jb text-[11px] tracking-widest text-cyan-300 uppercase">Industrial Intelligence Platform</span>
              </div>
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6 fade-up fade-up-2">
              <span className="block text-white">Command Your</span>
              <span className="block mt-2" style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 40%, #67e8f9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Industrial Universe</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed fade-up fade-up-3">
              Monitor, analyze, and control every sensor, PLC, and robotic system across your entire operation from a single unified command center.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up fade-up-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-950 font-semibold rounded-lg text-sm tracking-wide overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                <span className="relative z-10">Deploy Command Center</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="px-8 py-4 border border-zinc-700 text-zinc-300 rounded-lg text-sm tracking-wide hover:border-cyan-600/50 hover:text-cyan-300 transition-all">
                Watch Live Demo
              </button>
            </div>
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #030712 0%, transparent 100%)' }} />
        </section>

        {/* Metrics Bar */}
        <section className="relative py-4 border-y border-cyan-900/20" style={{ background: 'rgba(6,182,212,0.02)' }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'UPTIME', value: `${uptime}%`, sub: 'Last 365 days' },
              { label: 'ACTIVE SENSORS', value: sensors.toLocaleString(), sub: 'Across 47 sites' },
              { label: 'AVG LATENCY', value: `${latency}ms`, sub: 'Edge processing' },
              { label: 'THROUGHPUT', value: `${throughput}M/s`, sub: 'Data points' },
            ].map((metric, i) => (
              <div key={i} className="text-center py-4">
                <span className="font-mono-jb text-[10px] tracking-[0.2em] text-cyan-600 block mb-1">{metric.label}</span>
                <span className="font-mono-jb text-3xl font-bold text-white block">{metric.value}</span>
                <span className="text-[11px] text-zinc-600 block mt-1">{metric.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="font-mono-jb text-[11px] tracking-[0.3em] text-cyan-500 uppercase block mb-4">Capabilities</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
                Industrial-Grade <span style={{ color: '#06b6d4' }}>Intelligence</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'sensor' as const, title: 'Sensor Fusion', desc: 'Aggregate data from thousands of heterogeneous sensors into a unified real-time data stream with sub-millisecond synchronization.' },
                { icon: 'analytics' as const, title: 'Predictive Analytics', desc: 'Machine learning models trained on your operational data predict failures 72 hours before they occur with 99.2% accuracy.' },
                { icon: 'alert' as const, title: 'Smart Alerts', desc: 'Context-aware alerting eliminates noise. Correlated incident detection reduces false positives by 94%.' },
                { icon: 'connect' as const, title: 'Protocol Bridge', desc: 'Native support for Modbus, OPC-UA, MQTT, and 40+ industrial protocols. Zero-config device discovery.' },
                { icon: 'shield' as const, title: 'Cyber-Physical Security', desc: 'Air-gapped deployment options with end-to-end encryption, anomaly detection on network traffic patterns.' },
                { icon: 'clock' as const, title: 'Edge Computing', desc: 'Process data at the edge with <5ms latency. Local decision-making when cloud connectivity is unavailable.' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative p-8 rounded-xl border border-zinc-800/60 hover:border-cyan-800/40 transition-all duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.02) 0%, rgba(3,7,18,0.8) 100%)' }}
                >
                  <div className="mb-5">
                    <FeatureIcon type={feature.icon} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 0 rgba(6,182,212,0.1)' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-28 px-6" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.02) 50%, transparent 100%)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-mono-jb text-[11px] tracking-[0.3em] text-cyan-500 uppercase block mb-4">Live Preview</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
                Your Operation, <span style={{ color: '#06b6d4' }}>Visualized</span>
              </h2>
            </div>

            {/* Mock Dashboard */}
            <div className="rounded-2xl border border-zinc-800/80 overflow-hidden" style={{ background: '#0a0f1c' }}>
              {/* Dashboard header bar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-800/60" style={{ background: '#060a14' }}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="font-mono-jb text-[10px] text-zinc-600 ml-2">nexus-command.io/dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_4px_rgba(74,222,128,0.6)]" />
                    <span className="font-mono-jb text-[10px] text-green-400">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 grid grid-cols-12 gap-4">
                {/* Sidebar KPIs */}
                <div className="col-span-12 md:col-span-3 space-y-4">
                  {[
                    { label: 'Active Devices', val: '1,247', change: '+12', color: '#22d3ee' },
                    { label: 'Alerts', val: '3', change: '−2', color: '#f97316' },
                    { label: 'Data Rate', val: '847K/s', change: '+5%', color: '#06b6d4' },
                    { label: 'Efficiency', val: '96.4%', change: '+1.2%', color: '#22d3ee' },
                  ].map((kpi, i) => (
                    <div key={i} className="p-4 rounded-lg border border-zinc-800/50" style={{ background: '#0d1220' }}>
                      <span className="font-mono-jb text-[9px] tracking-[0.15em] text-zinc-600 uppercase block mb-1">{kpi.label}</span>
                      <div className="flex items-end justify-between">
                        <span className="font-mono-jb text-xl font-bold" style={{ color: kpi.color }}>{kpi.val}</span>
                        <span className="font-mono-jb text-[10px]" style={{ color: kpi.change.startsWith('−') ? '#f97316' : '#22d3ee' }}>{kpi.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main chart area */}
                <div className="col-span-12 md:col-span-9">
                  <div className="p-5 rounded-lg border border-zinc-800/50 h-full" style={{ background: '#0d1220' }}>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono-jb text-[10px] tracking-[0.15em] text-zinc-500 uppercase">Throughput / 24h</span>
                      <div className="flex gap-4">
                        {['1H', '6H', '24H', '7D'].map((t, i) => (
                          <span key={i} className={`font-mono-jb text-[10px] cursor-pointer ${i === 2 ? 'text-cyan-400' : 'text-zinc-600 hover:text-zinc-400'} transition-colors`}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* CSS Bar Chart */}
                    <div className="flex items-end gap-[3px] h-48">
                      {Array.from({ length: 48 }, (_, i) => {
                        const h = 20 + Math.sin(i * 0.3) * 25 + Math.random() * 30
                        const isHighlight = i > 40
                        return (
                          <DashboardBar
                            key={i}
                            height={Math.min(95, h)}
                            delay={i * 0.02}
                            color={isHighlight ? '#f97316' : '#06b6d4'}
                          />
                        )
                      })}
                    </div>

                    {/* Mini charts row */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {['Temperature', 'Vibration', 'Pressure'].map((label, idx) => (
                        <div key={idx} className="p-3 rounded border border-zinc-800/40" style={{ background: '#080d19' }}>
                          <span className="font-mono-jb text-[9px] text-zinc-600 uppercase block mb-2">{label}</span>
                          <div className="flex items-end gap-[2px] h-12">
                            {liveValues.map((v, i) => (
                              <div
                                key={i}
                                className="flex-1 rounded-t-sm transition-all duration-1000"
                                style={{
                                  height: `${v + idx * 5}%`,
                                  background: idx === 1 ? '#22d3ee' : idx === 2 ? '#f97316' : '#06b6d4',
                                  opacity: 0.7 + (i / liveValues.length) * 0.3,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 px-6 border-t border-zinc-800/30">
          <div className="max-w-6xl mx-auto">
            <p className="font-mono-jb text-[11px] tracking-[0.3em] text-zinc-600 uppercase text-center mb-12">
              Trusted by Industry Leaders
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-40">
              {['KRUPP STEEL', 'SIEMENS AG', 'ABB ROBOTICS', 'HONEYWELL', 'BOSCH IND.', 'SCHNEIDER'].map((name, i) => (
                <div key={i} className="flex items-center justify-center h-12">
                  <span className="font-mono-jb text-[11px] tracking-[0.25em] text-zinc-400 font-medium">{name}</span>
                </div>
              ))}
            </div>
            <div className="mt-20 max-w-3xl mx-auto text-center">
              <blockquote className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed italic">
                "We reduced unplanned downtime by 73% in the first quarter. The predictive maintenance alone saved us $4.2M annually."
              </blockquote>
              <div className="mt-6">
                <span className="text-sm text-zinc-400 font-medium">Marcus Lehmann</span>
                <span className="text-zinc-600 mx-2">—</span>
                <span className="text-sm text-zinc-500">VP of Operations, Krupp Steel</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <div
              className="relative rounded-2xl p-12 md:p-16 text-center border-2"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(3,7,18,0.9) 50%, rgba(6,182,212,0.03) 100%)',
                animation: 'glowBorder 4s ease-in-out infinite',
                borderColor: 'rgba(6,182,212,0.3)',
              }}
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Ready to Take Command?
              </h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-lg mx-auto">
                Deploy your industrial intelligence platform in under 48 hours. No infrastructure changes required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-lg text-sm tracking-wide hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all">
                  Start Free Pilot
                </button>
                <button className="px-8 py-4 text-zinc-400 text-sm hover:text-cyan-300 transition-colors">
                  Schedule a Demo →
                </button>
              </div>
              <p className="font-mono-jb text-[10px] text-zinc-600 mt-6 tracking-wider">NO CREDIT CARD · 30-DAY PILOT · SOC2 COMPLIANT</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/40 py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <span className="font-display text-lg font-bold text-white tracking-tight block mb-4">
                NEXUS<span className="text-cyan-400">.</span>IIoT
              </span>
              <p className="text-sm text-zinc-600 leading-relaxed">Industrial intelligence for the connected age.</p>
            </div>
            {[
              { title: 'Product', links: ['Platform', 'Edge Runtime', 'Analytics', 'Security'] },
              { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
              { title: 'Resources', links: ['Documentation', 'API Reference', 'Status', 'Changelog'] },
            ].map((col, i) => (
              <div key={i}>
                <span className="font-mono-jb text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-4">{col.title}</span>
                <ul className="space-y-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-800/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono-jb text-[10px] text-zinc-700">© 2026 Nexus Industrial Systems. All rights reserved.</span>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Security'].map((link, i) => (
                <a key={i} href="#" className="font-mono-jb text-[10px] text-zinc-600 hover:text-cyan-400 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
