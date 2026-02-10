import { useEffect, useState, useRef } from 'react'
import ForgeLayout from '../components/ForgeLayout'

function useCounter(target: number, dur = 2000, dec = 0) {
  const [v, setV] = useState(0)
  const r = useRef<number | null>(null)
  useEffect(() => {
    const s = performance.now()
    const tick = (n: number) => {
      const p = Math.min((n - s) / dur, 1)
      setV(Number(((1 - Math.pow(1 - p, 3)) * target).toFixed(dec)))
      if (p < 1) r.current = requestAnimationFrame(tick)
    }
    r.current = requestAnimationFrame(tick)
    return () => { if (r.current) cancelAnimationFrame(r.current) }
  }, [target, dur, dec])
  return v
}

export default function Design4() {
  const stat1 = useCounter(14832, 2500)
  const stat2 = useCounter(99.97, 3000, 2)
  const stat3 = useCounter(73, 2000)
  const stat4 = useCounter(4.2, 2200, 1)

  const stackItems = [
    'MODBUS', 'OPC-UA', 'MQTT', 'PROFINET', 'ETHERNET/IP', 'BACnet', 'CANopen',
    'HART', 'FOUNDATION', 'IO-LINK', 'POWERLINK', 'EtherCAT', 'SERCOS III',
    'CC-LINK', 'DeviceNet', 'ControlNet', 'PROFIBUS', 'AS-Interface',
  ]

  return (
    <ForgeLayout>
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 -mt-[73px] pt-[73px]">
        {/* Radial heat gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(255,107,0,0.06) 0%, transparent 60%)' }} />

        <div className="relative text-center">
          {/* FORGE title */}
          <div className="flex items-center justify-center gap-0 slam slam-1">
            <span className="font-anton text-[120px] md:text-[200px] lg:text-[260px] leading-none tracking-tighter text-white/95 select-none">F</span>
            {/* Molten O */}
            <div className="relative mx-[-4px] md:mx-[-8px]">
              <div
                className="w-[90px] h-[90px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-full relative"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fbbf24 0%, #ff6b00 40%, #cc5500 70%, #8b3a00 100%)',
                  animation: 'moltenPulse 3s ease-in-out infinite',
                }}
              >
                {/* Inner molten detail */}
                <div className="absolute inset-[15%] md:inset-[20%] rounded-full" style={{ background: 'radial-gradient(circle at 40% 30%, rgba(255,255,200,0.6) 0%, rgba(255,165,0,0.3) 50%, transparent 70%)' }} />
              </div>
            </div>
            <span className="font-anton text-[120px] md:text-[200px] lg:text-[260px] leading-none tracking-tighter text-white/95 select-none">RGE</span>
          </div>

          {/* Subtitle */}
          <div className="mt-4 md:mt-2 slam slam-2">
            <p className="font-work text-sm md:text-base tracking-[0.4em] uppercase text-white/30 font-semibold">
              Industrial Intelligence<span className="text-[#ff6b00] mx-3">&middot;</span>Raw Power
            </p>
          </div>

          {/* Body + CTA */}
          <div className="mt-10 max-w-xl mx-auto slam slam-3">
            <p className="text-white/35 text-sm md:text-base font-light leading-relaxed">
              Monitor. Predict. Control. Every sensor, every PLC, every robotic cell — unified under one relentless platform built for the factory floor.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8 slam slam-4">
            <button className="px-8 py-4 bg-[#ff6b00] text-black text-sm font-bold tracking-[0.15em] uppercase hover:bg-orange-400 transition-all hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]">
              Deploy Now
            </button>
            <button className="px-8 py-4 border-2 border-white/15 text-white/50 text-sm font-semibold tracking-[0.15em] uppercase hover:border-white/30 hover:text-white/70 transition-all">
              See It Work
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff6b00]/30 to-transparent" />
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#1a1614' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 slide-in">
            <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-3">What We Build</span>
            <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white/90">
              Forged for<br />the Floor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { num: '01', title: 'SENSOR MESH', desc: 'Aggregate data from 10,000+ heterogeneous sensors. Modbus, OPC-UA, MQTT — we speak every protocol on the factory floor.' },
              { num: '02', title: 'PREDICTIVE ENGINE', desc: 'Machine learning models forged from your operational data. Predict failures 72 hours out with 99.2% accuracy. No more surprises.' },
              { num: '03', title: 'EDGE RUNTIME', desc: 'Process data at the source. Sub-5ms latency. Local decision-making when the network goes dark. Your machines never stop thinking.' },
              { num: '04', title: 'COMMAND CENTER', desc: 'One dashboard to rule them all. Real-time visibility across every plant, every line, every device. Dark-mode only, obviously.' },
            ].map((item, i) => (
              <div
                key={i}
                className="border-l-4 border-[#ff6b00] p-8 md:p-10 border-b border-r border-white/5 group hover:bg-white/[0.02] transition-all"
                style={{ animation: `slideIn 0.5s ease-out ${i * 0.1}s both` }}
              >
                <span className="font-anton text-6xl md:text-7xl text-white/[0.06] block leading-none mb-4 group-hover:text-[#ff6b00]/10 transition-colors">{item.num}</span>
                <h3 className="font-anton text-xl md:text-2xl tracking-wider text-white/80 mb-3 group-hover:text-[#ff6b00] transition-colors">{item.title}</h3>
                <p className="text-sm text-white/30 font-light leading-relaxed max-w-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="py-28 px-6 md:px-10 overflow-hidden" style={{ background: '#111' }}>
        <div className="max-w-6xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-16">By The Numbers</span>

          {[
            { value: stat1.toLocaleString(), label: 'Active Sensors', sub: 'Across 47 global sites' },
            { value: `${stat2}%`, label: 'Platform Uptime', sub: 'Last 365 days running' },
            { value: `${stat3}%`, label: 'Downtime Reduced', sub: 'Average first-quarter impact' },
            { value: `$${stat4}M`, label: 'Annual Savings', sub: 'Per enterprise deployment' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-baseline md:items-end gap-4 md:gap-8 border-b border-white/5 py-6 md:py-4 group hover:border-[#ff6b00]/20 transition-colors"
              style={{ animation: `countUp 0.6s ease-out ${i * 0.15}s both` }}
            >
              <span className="font-anton text-7xl md:text-[120px] lg:text-[160px] leading-none tracking-tighter text-white/90 group-hover:text-[#ff6b00] transition-colors">
                {stat.value}
              </span>
              <div className="pb-2 md:pb-6">
                <span className="text-sm font-semibold tracking-[0.15em] uppercase text-white/50 block">{stat.label}</span>
                <span className="text-xs text-white/20 font-light mt-1 block">{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE STACK — Conveyor Belt */}
      <section className="py-20 overflow-hidden border-y-2 border-white/5" style={{ background: '#1a1614' }}>
        <div className="mb-10 px-6 md:px-10">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold">The Stack</span>
          <p className="text-sm text-white/25 font-light mt-2">Every protocol. Every platform. No excuses.</p>
        </div>

        {/* Conveyor strip */}
        <div className="relative overflow-hidden py-6">
          {/* Hazard stripe top */}
          <div className="h-[3px] w-full mb-4" style={{
            background: 'repeating-linear-gradient(90deg, #ff6b00 0px, #ff6b00 10px, transparent 10px, transparent 20px)',
            opacity: 0.3,
          }} />

          <div className="flex" style={{ animation: 'conveyorScroll 30s linear infinite', width: 'max-content' }}>
            {[...stackItems, ...stackItems].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-3 mx-2 border-2 border-white/8 text-xs font-bold tracking-[0.2em] uppercase text-white/40 hover:text-[#ff6b00] hover:border-[#ff6b00]/30 transition-all cursor-default"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Hazard stripe bottom */}
          <div className="h-[3px] w-full mt-4" style={{
            background: 'repeating-linear-gradient(90deg, #ff6b00 0px, #ff6b00 10px, transparent 10px, transparent 20px)',
            opacity: 0.3,
          }} />
        </div>
      </section>

      {/* HAZARD STRIPE DIVIDER */}
      <section className="relative h-32 md:h-48 overflow-hidden" style={{ background: '#111' }}>
        <div className="absolute inset-0" style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,107,0,0.08) 15px, rgba(255,107,0,0.08) 30px)',
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-[2px] bg-[#ff6b00]/30" />
            <span className="font-anton text-2xl md:text-4xl tracking-[0.3em] uppercase text-[#ff6b00]/20">&#9888; CAUTION: HIGH PERFORMANCE ZONE &#9888;</span>
            <div className="w-16 h-[2px] bg-[#ff6b00]/30" />
          </div>
        </div>
      </section>

      {/* Testimonial — Industrial style */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#1a1614' }}>
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-[#ff6b00] pl-8 md:pl-12">
            <span className="font-anton text-[120px] md:text-[180px] leading-none text-white/[0.04] block -mb-10 md:-mb-16 select-none">&ldquo;</span>
            <blockquote className="font-work text-xl md:text-3xl text-white/60 font-light leading-relaxed">
              We reduced unplanned downtime by <span className="text-[#ff6b00] font-semibold">73%</span> in the first quarter. One turbine bearing alert alone saved us <span className="text-[#ff6b00] font-semibold">$2.1M</span> in avoided production loss. This platform doesn't just monitor — it <span className="text-white/80 font-semibold italic">thinks</span>.
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#ff6b00]/20 border border-[#ff6b00]/30 flex items-center justify-center">
                <span className="font-anton text-sm text-[#ff6b00]">KW</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-white/60 block">KLAUS WEIMER</span>
                <span className="text-xs text-white/25 tracking-wider uppercase">VP Manufacturing &middot; Rheinmetall Industries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Emergency Deploy */}
      <section className="relative overflow-hidden" style={{ background: '#ff6b00' }}>
        {/* Hazard pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 40px)',
        }} />

        <div className="relative py-24 md:py-32 px-6 text-center">
          <h2 className="font-anton text-7xl md:text-[140px] lg:text-[180px] leading-none tracking-tight text-black/90 uppercase">
            Deploy Now
          </h2>
          <p className="text-black/50 text-sm md:text-base font-medium mt-4 max-w-md mx-auto tracking-wide">
            48-hour deployment. No infrastructure changes. Your factory, supercharged.
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <button className="px-8 py-4 bg-black text-[#ff6b00] text-sm font-bold tracking-[0.15em] uppercase hover:bg-zinc-900 transition-all border-2 border-black">
              Start Free Pilot
            </button>
            <button className="px-8 py-4 border-2 border-black/30 text-black/60 text-sm font-bold tracking-[0.15em] uppercase hover:border-black/60 hover:text-black/90 transition-all">
              Talk to Engineering
            </button>
          </div>
          <p className="text-[10px] text-black/30 tracking-[0.2em] uppercase mt-8 font-semibold">
            No Credit Card &middot; 30-Day Pilot &middot; SOC2 &middot; IEC 62443
          </p>
        </div>
      </section>
    </ForgeLayout>
  )
}
