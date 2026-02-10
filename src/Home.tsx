import { Link } from 'react-router-dom'

export default function Home() {
  const designs = [
    { path: '/1', title: 'Neural Grid', desc: 'Dark industrial command center with live data mesh visualization' },
    { path: '/2', title: 'Blueprint', desc: 'Engineering blueprint aesthetic with technical schematics' },
    { path: '/3', title: 'Pulse', desc: 'Vibrant gradient design with animated signal pulses' },
    { path: '/4', title: 'Forge', desc: 'Brutalist industrial design with raw mechanical energy' },
    { path: '/5', title: 'Horizon', desc: 'Clean futuristic design with holographic data layers' },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold tracking-tight mb-2">IIoT Landing Pages</h1>
      <p className="text-zinc-400 mb-12 text-lg">Five unique marketing homepage designs</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        {designs.map((d, i) => (
          <Link
            key={d.path}
            to={d.path}
            className="group relative border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:bg-zinc-900/50"
          >
            <span className="text-xs font-mono text-cyan-400 mb-2 block">Design {i + 1}</span>
            <h2 className="text-xl font-semibold mb-1 group-hover:text-cyan-300 transition-colors">{d.title}</h2>
            <p className="text-sm text-zinc-500">{d.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
