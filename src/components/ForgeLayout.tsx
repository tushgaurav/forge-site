import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

const footerLinks = [
  { label: 'Platform', href: '/' },
  { label: 'Careers', href: '/careers' },
  { label: 'Security', href: '/security' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

const navLinks = [
  { label: 'Careers', href: '/careers' },
  { label: 'Security', href: '/security' },
  { label: 'Contact', href: '/contact' },
]

export default function ForgeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-anton { font-family: 'Anton', sans-serif; }
        .font-work { font-family: 'Work Sans', sans-serif; }
        @keyframes moltenPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(255,107,0,0.4), 0 0 80px rgba(255,107,0,0.2), inset 0 0 30px rgba(255,107,0,0.3); }
          50% { box-shadow: 0 0 60px rgba(255,107,0,0.6), 0 0 120px rgba(255,107,0,0.3), inset 0 0 50px rgba(255,107,0,0.4); }
        }
        @keyframes slamDown {
          0% { transform: translateY(-60px); opacity: 0; }
          60% { transform: translateY(4px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideIn {
          0% { transform: translateX(-40px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes grainShift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          20% { transform: translate(1%, 3%); }
          30% { transform: translate(-3%, 1%); }
          40% { transform: translate(3%, -1%); }
          50% { transform: translate(-1%, 2%); }
          60% { transform: translate(2%, -3%); }
          70% { transform: translate(-2%, 1%); }
          80% { transform: translate(1%, -2%); }
          90% { transform: translate(-1%, 3%); }
        }
        @keyframes conveyorScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes hazardScroll {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
        @keyframes countUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .slam { animation: slamDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .slam-1 { animation-delay: 0s; }
        .slam-2 { animation-delay: 0.1s; }
        .slam-3 { animation-delay: 0.2s; }
        .slam-4 { animation-delay: 0.3s; }
        .slam-5 { animation-delay: 0.4s; }
        .slide-in { animation: slideIn 0.5s ease-out both; }
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
          animation: grainShift 0.5s steps(10) infinite;
        }
      `}</style>

      <div className="min-h-screen text-white relative font-work" style={{ background: '#111' }}>
        {/* Grain overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 grain-overlay opacity-60" />

        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 border-b-2 border-white/5" style={{ background: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(8px)' }}>
          <Link to="/" className="font-anton text-xl tracking-wider text-white/80 hover:text-white transition-colors">
            FORGE<span className="text-orange-500">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs tracking-[0.2em] uppercase font-semibold text-white/30 hover:text-[#ff6b00] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/contact"
            className="px-5 py-2 bg-[#ff6b00] text-black text-xs font-bold tracking-[0.15em] uppercase hover:bg-orange-400 transition-colors"
          >
            DEPLOY
          </Link>
        </nav>

        {/* Page content */}
        <div className="pt-[73px]">
          {children}
        </div>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-10 border-t-2 border-white/5" style={{ background: '#0a0a0a' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <Link to="/" className="font-anton text-2xl tracking-wider text-white/60 hover:text-white/80 transition-colors">
                  FORGE<span className="text-[#ff6b00]">.</span>
                </Link>
                <p className="text-xs text-white/15 mt-1 font-light">Industrial intelligence. No compromises.</p>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-xs text-white/20 hover:text-[#ff6b00] transition-colors font-medium tracking-wider uppercase"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-white/10 tracking-wider uppercase">&copy; 2026 Forge Industrial Systems. Built without compromise.</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#ff6b00]" />
                <span className="text-[10px] text-white/20 tracking-wider">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
