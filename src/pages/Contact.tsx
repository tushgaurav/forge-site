import { useState } from 'react'
import ForgeLayout from '../components/ForgeLayout'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <ForgeLayout>
      {/* Header */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#111' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-4 slam slam-1">Get In Touch</span>
          <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase text-white/90 slam slam-2">
            Contact<br />Us
          </h1>
          <p className="text-white/30 text-sm md:text-base font-light leading-relaxed max-w-xl mt-6 slam slam-3">
            Ready to deploy industrial intelligence? Have a technical question? Our engineering team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* Hazard divider */}
      <div className="h-[3px] w-full" style={{
        background: 'repeating-linear-gradient(90deg, #ff6b00 0px, #ff6b00 10px, transparent 10px, transparent 20px)',
        opacity: 0.3,
      }} />

      {/* Form + Info */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#1a1614' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-8">Send a Message</span>

              {submitted ? (
                <div className="border-l-4 border-[#ff6b00] p-8 bg-white/[0.02]">
                  <h3 className="font-anton text-2xl tracking-wider text-[#ff6b00] mb-3">MESSAGE RECEIVED</h3>
                  <p className="text-sm text-white/40 font-light">
                    Our engineering team will review your message and respond within 24 hours. For urgent production issues, use the emergency contact below.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/30 block mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-2 border-white/10 px-5 py-4 text-sm text-white/80 font-light placeholder-white/15 focus:border-[#ff6b00] focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/30 block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-2 border-white/10 px-5 py-4 text-sm text-white/80 font-light placeholder-white/15 focus:border-[#ff6b00] focus:outline-none transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/30 block mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border-2 border-white/10 px-5 py-4 text-sm text-white/80 font-light placeholder-white/15 focus:border-[#ff6b00] focus:outline-none transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/30 block mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-2 border-white/10 px-5 py-4 text-sm text-white/80 font-light placeholder-white/15 focus:border-[#ff6b00] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your deployment needs, technical questions, or how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#ff6b00] text-black text-sm font-bold tracking-[0.15em] uppercase hover:bg-orange-400 transition-all hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] w-full md:w-auto"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-6">Headquarters</span>
                <div className="border-l-4 border-[#ff6b00] pl-6">
                  <p className="text-sm text-white/50 font-light leading-relaxed">
                    Forge Industrial Systems GmbH<br />
                    Invalidenstr. 112<br />
                    10115 Berlin<br />
                    Germany
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-6">Direct Lines</span>
                <div className="space-y-4">
                  <div className="border-2 border-white/5 p-4 hover:border-white/10 transition-colors">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 block mb-1">Sales &amp; Deployments</span>
                    <span className="text-sm text-white/50">deploy@forge.industrial</span>
                  </div>
                  <div className="border-2 border-white/5 p-4 hover:border-white/10 transition-colors">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 block mb-1">Technical Support</span>
                    <span className="text-sm text-white/50">support@forge.industrial</span>
                  </div>
                  <div className="border-2 border-white/5 p-4 hover:border-white/10 transition-colors">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 block mb-1">Security Issues</span>
                    <span className="text-sm text-white/50">security@forge.industrial</span>
                  </div>
                  <div className="border-2 border-[#ff6b00]/20 p-4 bg-[#ff6b00]/[0.03]">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#ff6b00]/60 block mb-1">Emergency — Production Down</span>
                    <span className="text-sm text-[#ff6b00] font-semibold">+49 30 8888 0911</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-6">Response Times</span>
                <div className="border-2 border-white/5">
                  <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <span className="text-xs text-white/30 font-semibold uppercase tracking-wider">General</span>
                    <span className="text-xs text-white/50">&lt; 24 hours</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <span className="text-xs text-white/30 font-semibold uppercase tracking-wider">Technical</span>
                    <span className="text-xs text-white/50">&lt; 4 hours</span>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <span className="text-xs text-[#ff6b00]/60 font-semibold uppercase tracking-wider">P1 Emergency</span>
                    <span className="text-xs text-[#ff6b00]">&lt; 15 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ForgeLayout>
  )
}
