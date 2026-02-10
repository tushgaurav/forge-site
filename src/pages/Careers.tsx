import { Link } from 'react-router-dom'
import ForgeLayout from '../components/ForgeLayout'

const positions = [
  {
    num: '01',
    title: 'Senior Platform Engineer',
    team: 'Core Infrastructure',
    location: 'Berlin / Remote',
    type: 'Full-time',
    desc: 'Build and scale the real-time data pipeline that processes millions of sensor readings per second. Rust, Kafka, ClickHouse.',
  },
  {
    num: '02',
    title: 'ML Engineer — Predictive Maintenance',
    team: 'Intelligence',
    location: 'Munich / Remote',
    type: 'Full-time',
    desc: 'Design and deploy machine learning models that predict industrial equipment failures before they happen. PyTorch, time-series forecasting, edge deployment.',
  },
  {
    num: '03',
    title: 'DevOps / Site Reliability Engineer',
    team: 'Operations',
    location: 'Berlin / Remote',
    type: 'Full-time',
    desc: 'Keep the platform running at 99.97% uptime across 47 global deployments. Kubernetes, Terraform, bare-metal edge nodes.',
  },
  {
    num: '04',
    title: 'Embedded Systems Engineer',
    team: 'Edge Runtime',
    location: 'Stuttgart',
    type: 'Full-time',
    desc: 'Write the firmware and runtime that executes ML models on industrial edge hardware. C/C++, RTOS, sub-5ms latency targets.',
  },
  {
    num: '05',
    title: 'Product Designer',
    team: 'Design',
    location: 'Berlin / Remote',
    type: 'Full-time',
    desc: 'Design the command center that plant operators rely on 24/7. Dark interfaces, real-time data visualization, zero-error tolerance.',
  },
  {
    num: '06',
    title: 'Technical Writer',
    team: 'Developer Experience',
    location: 'Remote',
    type: 'Contract',
    desc: 'Document APIs, SDKs, and deployment guides for industrial engineers who have zero patience for ambiguity.',
  },
]

export default function Careers() {
  return (
    <ForgeLayout>
      {/* Header */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#111' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-4 slam slam-1">Open Positions</span>
          <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase text-white/90 slam slam-2">
            Join the<br />Forge
          </h1>
          <p className="text-white/30 text-sm md:text-base font-light leading-relaxed max-w-xl mt-6 slam slam-3">
            We build industrial intelligence software that runs in the harshest environments on earth. If you want to write code that moves atoms, not just pixels — you belong here.
          </p>
        </div>
      </section>

      {/* Hazard divider */}
      <div className="h-[3px] w-full" style={{
        background: 'repeating-linear-gradient(90deg, #ff6b00 0px, #ff6b00 10px, transparent 10px, transparent 20px)',
        opacity: 0.3,
      }} />

      {/* Positions */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#1a1614' }}>
        <div className="max-w-5xl mx-auto">
          <div className="space-y-0">
            {positions.map((pos, i) => (
              <div
                key={pos.num}
                className="border-l-4 border-[#ff6b00] border-b border-white/5 p-8 md:p-10 group hover:bg-white/[0.02] transition-all"
                style={{ animation: `slideIn 0.5s ease-out ${i * 0.08}s both` }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                  <span className="font-anton text-5xl md:text-6xl text-white/[0.06] leading-none group-hover:text-[#ff6b00]/10 transition-colors shrink-0">
                    {pos.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-anton text-xl md:text-2xl tracking-wider text-white/80 group-hover:text-[#ff6b00] transition-colors mb-2">
                      {pos.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#ff6b00]/60 border border-[#ff6b00]/20 px-3 py-1">
                        {pos.team}
                      </span>
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 border border-white/10 px-3 py-1">
                        {pos.location}
                      </span>
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 border border-white/10 px-3 py-1">
                        {pos.type}
                      </span>
                    </div>
                    <p className="text-sm text-white/30 font-light leading-relaxed max-w-lg">
                      {pos.desc}
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="shrink-0 px-6 py-3 border-2 border-white/10 text-xs font-bold tracking-[0.15em] uppercase text-white/40 hover:border-[#ff6b00] hover:text-[#ff6b00] transition-all self-start"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#111' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-anton text-3xl md:text-5xl tracking-tight uppercase text-white/60 mb-4">
            Don't see your role?
          </h2>
          <p className="text-sm text-white/25 font-light max-w-md mx-auto mb-8">
            We're always looking for exceptional engineers. Send us a note and tell us what you'd build.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-[#ff6b00] text-black text-sm font-bold tracking-[0.15em] uppercase hover:bg-orange-400 transition-all"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </ForgeLayout>
  )
}
