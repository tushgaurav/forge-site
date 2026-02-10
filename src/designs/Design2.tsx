import { Link } from 'react-router-dom'

function Crosshair({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute w-4 h-4 ${className}`}>
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20" />
      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/20" />
      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
    </div>
  )
}

function DimensionLine({ label, direction = 'horizontal', className = '' }: { label: string; direction?: 'horizontal' | 'vertical'; className?: string }) {
  if (direction === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-0 ${className}`}>
        <div className="w-[1px] h-4 bg-amber-400/60" />
        <div className="w-3 h-[1px] bg-amber-400/60" />
        <div className="flex-1 w-[1px] bg-amber-400/40 relative min-h-8">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-[9px] text-amber-400/80 whitespace-nowrap">{label}</span>
        </div>
        <div className="w-3 h-[1px] bg-amber-400/60" />
        <div className="w-[1px] h-4 bg-amber-400/60" />
      </div>
    )
  }
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      <div className="h-[1px] w-2 bg-amber-400/60" />
      <div className="h-2 w-[1px] bg-amber-400/60" />
      <div className="flex-1 h-[1px] bg-amber-400/40 relative">
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-amber-400/80 whitespace-nowrap">{label}</span>
      </div>
      <div className="h-2 w-[1px] bg-amber-400/60" />
      <div className="h-[1px] w-2 bg-amber-400/60" />
    </div>
  )
}

function Callout({ label, x, y, direction = 'right' }: { label: string; x: string; y: string; direction?: 'left' | 'right' | 'up' }) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <div className="relative">
        <div className="w-2 h-2 rounded-full border border-red-400/70 bg-red-400/20" />
        {direction === 'right' && (
          <>
            <div className="absolute top-1/2 left-3 w-12 h-[1px] bg-red-400/50" />
            <div className="absolute top-1/2 left-[3.75rem] -translate-y-1/2 whitespace-nowrap">
              <span className="font-mono text-[9px] text-red-400/80 border-b border-red-400/30 pb-0.5">{label}</span>
            </div>
          </>
        )}
        {direction === 'left' && (
          <>
            <div className="absolute top-1/2 right-3 w-12 h-[1px] bg-red-400/50" />
            <div className="absolute top-1/2 right-[3.75rem] -translate-y-1/2 whitespace-nowrap">
              <span className="font-mono text-[9px] text-red-400/80 border-b border-red-400/30 pb-0.5">{label}</span>
            </div>
          </>
        )}
        {direction === 'up' && (
          <>
            <div className="absolute bottom-3 left-1/2 h-10 w-[1px] bg-red-400/50" />
            <div className="absolute bottom-[3.25rem] left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="font-mono text-[9px] text-red-400/80 border-b border-red-400/30 pb-0.5">{label}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function SchematicMachine({ x, y, w, h, label, dashed = false }: { x: number; y: number; w: number; h: number; label: string; dashed?: boolean }) {
  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
    >
      <div className={`w-full h-full border ${dashed ? 'border-dashed' : ''} border-white/25 bg-white/[0.03] relative`}>
        <span className="absolute -top-5 left-1 font-mono text-[8px] text-white/50 uppercase tracking-wider">{label}</span>
        <Crosshair className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <Crosshair className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <Crosshair className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <Crosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  )
}

function SensorDot({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      <div className="w-3 h-3 rounded-full border border-amber-400/60 bg-amber-400/10 -translate-x-1/2 -translate-y-1/2 relative">
        <div className="absolute inset-0 rounded-full border border-amber-400/30" style={{ animation: 'blueprintPulse 3s ease-out infinite' }} />
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[7px] text-amber-400/70 whitespace-nowrap">{id}</span>
      </div>
    </div>
  )
}

function DashedConnection({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)
  return (
    <div
      className="absolute origin-left border-t border-dashed border-white/15"
      style={{
        left: `${x1}%`,
        top: `${y1}%`,
        width: `${length}%`,
        transform: `rotate(${angle}deg)`,
      }}
    />
  )
}

export default function Design2() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes blueprintPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes stampAppear {
          0% { transform: scale(1.5) rotate(-15deg); opacity: 0; }
          50% { transform: scale(0.95) rotate(-12deg); opacity: 1; }
          100% { transform: scale(1) rotate(-12deg); opacity: 1; }
        }
        @keyframes drawLine {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes fadeInBlueprint {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .bp-fade { animation: fadeInBlueprint 0.6s ease-out both; }
        .bp-fade-1 { animation-delay: 0.1s; }
        .bp-fade-2 { animation-delay: 0.2s; }
        .bp-fade-3 { animation-delay: 0.3s; }
        .bp-fade-4 { animation-delay: 0.4s; }
        .bp-fade-5 { animation-delay: 0.5s; }
        .blueprint-bg {
          background-color: #0f2744;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
        }
      `}</style>

      <div className="min-h-screen blueprint-bg text-white/80 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* Outer Drawing Border */}
        <div className="fixed inset-3 border border-white/10 pointer-events-none z-40" />
        <div className="fixed inset-5 border border-white/[0.06] pointer-events-none z-40" />

        {/* Nav */}
        <nav className="relative z-50 flex items-center justify-between px-10 py-6">
          <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors pointer-events-auto">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Back to Index</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/30">DWG NO. NXS-2026-001</span>
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/30">REV. D</span>
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/30">SCALE: NTS</span>
          </div>
        </nav>

        {/* HERO — Schematic + Title Block */}
        <section className="relative min-h-screen flex items-center px-10 py-20">
          {/* Factory Floor Schematic */}
          <div className="relative w-full max-w-5xl mx-auto h-[500px]">
            {/* Machines */}
            <SchematicMachine x={5} y={10} w={18} h={25} label="CNC Mill A-01" />
            <SchematicMachine x={28} y={15} w={15} h={20} label="PLC Unit B-03" dashed />
            <SchematicMachine x={5} y={50} w={20} h={22} label="Conveyor C-12" />
            <SchematicMachine x={50} y={8} w={22} h={30} label="Robot Cell R-07" />
            <SchematicMachine x={30} y={55} w={18} h={25} label="Furnace F-04" dashed />
            <SchematicMachine x={55} y={55} w={20} h={28} label="Assembly A-09" />

            {/* Connections */}
            <DashedConnection x1={23} y1={22} x2={28} y2={22} />
            <DashedConnection x1={43} y1={25} x2={50} y2={20} />
            <DashedConnection x1={15} y1={35} x2={15} y2={50} />
            <DashedConnection x1={25} y1={61} x2={30} y2={65} />
            <DashedConnection x1={48} y1={67} x2={55} y2={67} />
            <DashedConnection x1={62} y1={38} x2={65} y2={55} />

            {/* Sensors */}
            <SensorDot x={14} y={22} id="S-01" />
            <SensorDot x={36} y={25} id="S-02" />
            <SensorDot x={61} y={22} id="S-03" />
            <SensorDot x={15} y={61} id="S-04" />
            <SensorDot x={39} y={67} id="S-05" />
            <SensorDot x={65} y={69} id="S-06" />
            <SensorDot x={50} y={45} id="S-07" />

            {/* Callouts */}
            <Callout label="TEMP SENSOR 0–500°C" x="16%" y="20%" direction="right" />
            <Callout label="VIBRATION MONITOR" x="63%" y="20%" direction="right" />
            <Callout label="PRESSURE GAUGE" x="37%" y="63%" direction="up" />

            {/* Dimension lines */}
            <div className="absolute bottom-[-30px] left-[5%] right-[28%]">
              <DimensionLine label="ZONE A — 42,000 mm" />
            </div>
            <div className="absolute bottom-[-30px] left-[50%] right-[5%]">
              <DimensionLine label="ZONE B — 28,000 mm" />
            </div>

            {/* Title Block — bottom right */}
            <div className="absolute bottom-[-80px] right-0 w-[340px] border border-white/20 bg-[#0a1e38]/80 bp-fade bp-fade-3">
              <div className="border-b border-white/10 px-4 py-2 flex justify-between">
                <span className="font-mono text-[9px] text-white/40 tracking-wider">PROJECT</span>
                <span className="font-mono text-[10px] text-white/70 font-medium">NEXUS IIoT PLATFORM</span>
              </div>
              <div className="border-b border-white/10 px-4 py-2 flex justify-between">
                <span className="font-mono text-[9px] text-white/40 tracking-wider">DRAWING</span>
                <span className="font-mono text-[10px] text-white/70">SYSTEM OVERVIEW — MARKETING</span>
              </div>
              <div className="border-b border-white/10 px-4 py-2 flex justify-between">
                <span className="font-mono text-[9px] text-white/40 tracking-wider">DATE</span>
                <span className="font-mono text-[10px] text-white/70">2026.02.09</span>
              </div>
              <div className="px-4 py-2 flex justify-between">
                <span className="font-mono text-[9px] text-white/40 tracking-wider">APPROVED</span>
                <span className="font-mono text-[10px] text-amber-400/80">PENDING REVIEW</span>
              </div>
            </div>

            {/* Main Title overlay */}
            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 bp-fade bp-fade-2">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none" style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.9)' }}>
                Engineered for
                <br />
                <span className="text-amber-400/90">Industry</span>
              </h1>
              <p className="mt-4 text-white/40 text-sm max-w-md mx-auto font-light leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                Precision monitoring and control for every sensor, actuator, and system on your factory floor.
              </p>
              <div className="flex items-center justify-center gap-6 mt-8">
                <button className="px-6 py-3 border border-amber-400/50 text-amber-400/90 font-mono text-xs tracking-[0.15em] uppercase hover:bg-amber-400/10 transition-all">
                  View Specifications
                </button>
                <button className="px-6 py-3 border border-white/15 text-white/50 font-mono text-xs tracking-[0.15em] uppercase hover:border-white/30 hover:text-white/70 transition-all">
                  Request Drawing
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SPECIFICATIONS — Tech Spec Sheet */}
        <section className="py-32 px-10">
          <div className="max-w-5xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-16">
              <Crosshair className="relative" />
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Section 02 — Specifications</span>
              <div className="flex-1 h-[1px] bg-white/10" />
              <Crosshair className="relative" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  spec: 'Protocol Support',
                  value: 'OPC-UA / Modbus / MQTT / BACnet',
                  tolerance: '± 40+ industrial protocols',
                  note: 'Zero-configuration device discovery',
                },
                {
                  spec: 'Data Throughput',
                  value: '2,400,000 points/sec',
                  tolerance: '± 0.01% accuracy',
                  note: 'Edge-processed, cloud-synced',
                },
                {
                  spec: 'Response Latency',
                  value: '< 5 ms (edge) / < 50 ms (cloud)',
                  tolerance: '± 0.5 ms jitter',
                  note: 'Deterministic real-time processing',
                },
                {
                  spec: 'Predictive Accuracy',
                  value: '99.2% failure prediction',
                  tolerance: '72-hour advance warning',
                  note: 'ML models trained on operational data',
                },
                {
                  spec: 'Uptime SLA',
                  value: '99.97% availability',
                  tolerance: '< 15 min annual downtime',
                  note: 'Redundant edge + cloud architecture',
                },
                {
                  spec: 'Security Rating',
                  value: 'SOC2 Type II / IEC 62443',
                  tolerance: 'Zero-trust architecture',
                  note: 'Air-gapped deployment option',
                },
              ].map((item, i) => (
                <div key={i} className="relative border border-white/10 p-6 group hover:border-amber-400/20 transition-all bp-fade" style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/25" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/25" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/25" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/25" />

                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase block mb-2">{item.spec}</span>
                  <span className="font-mono text-base text-white/80 font-medium block mb-2">{item.value}</span>
                  <div className="flex items-center gap-3 mb-2">
                    <DimensionLine label={item.tolerance} className="flex-1" />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 italic">{item.note}</span>

                  {/* Spec number */}
                  <span className="absolute top-2 right-3 font-mono text-[8px] text-white/15">SPEC-{String(i + 1).padStart(3, '0')}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SYSTEM ARCHITECTURE — Data Flow Diagram */}
        <section className="py-32 px-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <Crosshair className="relative" />
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Section 03 — System Architecture</span>
              <div className="flex-1 h-[1px] bg-white/10" />
              <Crosshair className="relative" />
            </div>

            {/* Architecture diagram */}
            <div className="relative py-16">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
                {[
                  { label: 'SENSORS & ACTUATORS', sub: 'Field Devices', icon: '◎', count: '10,000+' },
                  { label: 'EDGE GATEWAY', sub: 'Local Processing', icon: '⬡', count: '<5ms' },
                  { label: 'CLOUD ENGINE', sub: 'Analytics & ML', icon: '◇', count: '99.97%' },
                  { label: 'COMMAND DASHBOARD', sub: 'Visualization', icon: '▣', count: 'Real-time' },
                ].map((node, i) => (
                  <div key={i} className="relative flex-1 flex flex-col items-center bp-fade" style={{ animationDelay: `${i * 0.15}s` }}>
                    {/* Node */}
                    <div className="w-28 h-28 border border-dashed border-white/20 flex items-center justify-center relative group hover:border-amber-400/40 transition-all">
                      <span className="text-3xl text-white/20 group-hover:text-amber-400/50 transition-colors">{node.icon}</span>
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/30" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/30" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/30" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/30" />
                      {/* Count badge */}
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[9px] text-amber-400/70 whitespace-nowrap">{node.count}</span>
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.15em] text-white/50 uppercase mt-4 text-center">{node.label}</span>
                    <span className="font-mono text-[8px] text-white/25 mt-1">{node.sub}</span>

                    {/* Arrow to next */}
                    {i < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-[2px] -translate-y-1/2 w-[calc(100%-7rem)] h-[1px]">
                        <div className="w-full h-full border-t border-dashed border-white/15 relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-b-[3px] border-l-[6px] border-t-transparent border-b-transparent border-l-white/25" />
                          <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[7px] text-white/20 whitespace-nowrap">DATA FLOW</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Annotation callouts */}
              <div className="hidden md:block">
                <div className="absolute top-8 left-[8%]">
                  <div className="font-mono text-[8px] text-red-400/60 border border-red-400/20 px-2 py-1 bg-red-400/5">
                    NOTE: Supports brownfield integration with legacy SCADA systems
                  </div>
                  <div className="w-[1px] h-6 bg-red-400/30 mx-auto" />
                </div>
                <div className="absolute top-4 right-[12%]">
                  <div className="font-mono text-[8px] text-red-400/60 border border-red-400/20 px-2 py-1 bg-red-400/5">
                    REF: Role-based access with SSO/SAML
                  </div>
                  <div className="w-[1px] h-10 bg-red-400/30 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVISION TABLE — Statistics */}
        <section className="py-32 px-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <Crosshair className="relative" />
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Section 04 — Performance Data</span>
              <div className="flex-1 h-[1px] bg-white/10" />
              <Crosshair className="relative" />
            </div>

            <div className="border border-white/15 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-5 border-b border-white/15 bg-white/[0.03]">
                {['REV', 'METRIC', 'VALUE', 'DELTA', 'STATUS'].map((h, i) => (
                  <div key={i} className="px-5 py-3 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase border-r border-white/10 last:border-r-0">
                    {h}
                  </div>
                ))}
              </div>
              {/* Table rows */}
              {[
                { rev: 'A', metric: 'Devices Connected', value: '14,832', delta: '+2,341', status: 'NOMINAL' },
                { rev: 'B', metric: 'Downtime Reduction', value: '73%', delta: '+12% QoQ', status: 'EXCEEDS SPEC' },
                { rev: 'C', metric: 'Annual Savings', value: '$4.2M', delta: '+$890K', status: 'NOMINAL' },
                { rev: 'D', metric: 'Alert Accuracy', value: '99.2%', delta: '+0.8%', status: 'NOMINAL' },
                { rev: 'E', metric: 'Mean Time to Detect', value: '< 200ms', delta: '-45ms', status: 'EXCEEDS SPEC' },
                { rev: 'F', metric: 'Customer Satisfaction', value: '4.9/5.0', delta: '+0.3', status: 'NOMINAL' },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-5 border-b border-white/8 hover:bg-white/[0.02] transition-colors bp-fade`} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="px-5 py-4 font-mono text-xs text-amber-400/70 border-r border-white/10">{row.rev}</div>
                  <div className="px-5 py-4 font-mono text-xs text-white/60 border-r border-white/10">{row.metric}</div>
                  <div className="px-5 py-4 font-mono text-xs text-white/80 font-medium border-r border-white/10">{row.value}</div>
                  <div className="px-5 py-4 font-mono text-xs text-amber-400/60 border-r border-white/10">{row.delta}</div>
                  <div className="px-5 py-4 font-mono text-[10px]">
                    <span className={`px-2 py-0.5 ${row.status === 'EXCEEDS SPEC' ? 'text-amber-400/80 border border-amber-400/20 bg-amber-400/5' : 'text-white/40'}`}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGINEERING CHANGE NOTICE — Testimonial */}
        <section className="py-32 px-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <Crosshair className="relative" />
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Section 05 — Engineering Change Notice</span>
              <div className="flex-1 h-[1px] bg-white/10" />
              <Crosshair className="relative" />
            </div>

            <div className="border border-white/15 relative">
              {/* ECN Header */}
              <div className="grid grid-cols-3 border-b border-white/15 bg-white/[0.03]">
                <div className="px-5 py-3 border-r border-white/10">
                  <span className="font-mono text-[8px] text-white/30 block">ECN NUMBER</span>
                  <span className="font-mono text-xs text-white/60">ECN-2026-0847</span>
                </div>
                <div className="px-5 py-3 border-r border-white/10">
                  <span className="font-mono text-[8px] text-white/30 block">ORIGINATOR</span>
                  <span className="font-mono text-xs text-white/60">Klaus Weimer, VP Ops</span>
                </div>
                <div className="px-5 py-3">
                  <span className="font-mono text-[8px] text-white/30 block">ORGANIZATION</span>
                  <span className="font-mono text-xs text-white/60">Rheinmetall Industries</span>
                </div>
              </div>

              {/* ECN Body */}
              <div className="p-8">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider block mb-4">Reason for Change</span>
                <blockquote className="text-lg text-white/70 font-light leading-relaxed italic mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  "After deploying Nexus across three manufacturing plants, we achieved a 73% reduction in unplanned downtime within the first quarter. The predictive maintenance capabilities identified a critical bearing failure in our main turbine assembly 96 hours before it would have caused a catastrophic shutdown. That single intervention saved us an estimated $2.1M in lost production."
                </blockquote>
                <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[10px] text-white/50 block">Klaus Weimer</span>
                    <span className="font-mono text-[9px] text-white/30">VP of Manufacturing Operations</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[8px] text-white/20 block">DISPOSITION</span>
                    <span className="font-mono text-[10px] text-amber-400/70">APPROVED — IMPLEMENT IMMEDIATELY</span>
                  </div>
                </div>
              </div>

              {/* Corner details */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-white/20" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-white/20" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-white/20" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-white/20" />
            </div>
          </div>
        </section>

        {/* CTA — Approval Stamp */}
        <section className="py-32 px-10">
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="border border-dashed border-white/15 p-16 relative">
              <Crosshair className="-top-2 -left-2" />
              <Crosshair className="-top-2 -right-2" />
              <Crosshair className="-bottom-2 -left-2" />
              <Crosshair className="-bottom-2 -right-2" />

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Ready for Deployment
              </h2>
              <p className="text-white/40 font-mono text-sm max-w-md mx-auto mb-10">
                Submit your deployment request. Our engineering team will configure your instance within 48 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button className="px-8 py-4 border-2 border-amber-400/60 text-amber-400/90 font-mono text-xs tracking-[0.2em] uppercase hover:bg-amber-400/10 transition-all">
                  Submit Deployment Request
                </button>
                <button className="px-8 py-4 border border-white/15 text-white/40 font-mono text-xs tracking-[0.2em] uppercase hover:border-white/30 transition-all">
                  Download Spec Sheet
                </button>
              </div>

              {/* Stamp */}
              <div
                className="absolute top-8 right-8 md:top-12 md:right-12"
                style={{ animation: 'stampAppear 0.6s ease-out 0.5s both' }}
              >
                <div className="w-32 h-32 rounded-full border-4 border-amber-400/40 flex items-center justify-center rotate-[-12deg]">
                  <div className="text-center">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-amber-400/60 block">APPROVED</span>
                    <span className="font-mono text-[7px] text-amber-400/40 block mt-1">FOR DEPLOYMENT</span>
                    <div className="w-12 h-[1px] bg-amber-400/30 mx-auto my-1" />
                    <span className="font-mono text-[7px] text-amber-400/40">2026.02.09</span>
                  </div>
                </div>
              </div>

              <p className="font-mono text-[9px] text-white/20 tracking-wider">
                NO INFRASTRUCTURE CHANGES REQUIRED · SOC2 TYPE II · IEC 62443 COMPLIANT
              </p>
            </div>
          </div>
        </section>

        {/* Footer — Drawing Border with Revision History */}
        <footer className="border-t border-white/10 px-10 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <span className="font-mono text-xs text-white/60 font-medium tracking-wider block mb-4">
                  NEXUS<span className="text-amber-400/70">.</span>IIoT
                </span>
                <p className="font-mono text-[10px] text-white/25 leading-relaxed">
                  Precision-engineered industrial intelligence for manufacturing, energy, and process industries.
                </p>
              </div>
              {[
                { title: 'Specifications', links: ['Platform', 'Edge Runtime', 'Analytics Engine', 'Security'] },
                { title: 'Documentation', links: ['API Reference', 'Integration Guide', 'Deployment', 'Changelog'] },
                { title: 'Organization', links: ['About', 'Engineering', 'Careers', 'Contact'] },
              ].map((col, i) => (
                <div key={i}>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase block mb-4">{col.title}</span>
                  <ul className="space-y-2">
                    {col.links.map((link, j) => (
                      <li key={j}><a href="#" className="font-mono text-[11px] text-white/30 hover:text-amber-400/70 transition-colors">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Revision History Table */}
            <div className="border-t border-white/8 pt-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase">Revision History</span>
                <div className="flex-1 h-[1px] bg-white/5" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { rev: 'A', date: '2025.03', desc: 'Initial release' },
                  { rev: 'B', date: '2025.07', desc: 'Added edge computing' },
                  { rev: 'C', date: '2025.11', desc: 'Protocol bridge expansion' },
                  { rev: 'D', date: '2026.02', desc: 'Current revision' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-amber-400/50 w-4">{r.rev}</span>
                    <span className="font-mono text-[9px] text-white/20">{r.date}</span>
                    <span className="font-mono text-[9px] text-white/30">{r.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-mono text-[9px] text-white/15">© 2026 Nexus Industrial Systems. All specifications subject to change.</span>
              <div className="flex gap-6">
                {['Privacy', 'Terms', 'Security', 'Compliance'].map((l, i) => (
                  <a key={i} href="#" className="font-mono text-[9px] text-white/15 hover:text-amber-400/50 transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
