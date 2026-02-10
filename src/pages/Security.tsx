import ForgeLayout from '../components/ForgeLayout'

const certifications = [
  { code: 'SOC 2 Type II', status: 'Certified', detail: 'Annual audit by Deloitte. Full report available under NDA.' },
  { code: 'IEC 62443', status: 'Compliant', detail: 'Industrial automation cybersecurity. SL-2 target security level.' },
  { code: 'ISO 27001', status: 'Certified', detail: 'Information security management system. Certified since 2023.' },
  { code: 'GDPR', status: 'Compliant', detail: 'EU data protection. Data processed exclusively in EU data centers.' },
  { code: 'NIST CSF', status: 'Aligned', detail: 'Cybersecurity framework alignment verified annually.' },
]

const architectureItems = [
  { label: 'Encryption at rest', value: 'AES-256-GCM' },
  { label: 'Encryption in transit', value: 'TLS 1.3 (mutual TLS for edge nodes)' },
  { label: 'Key management', value: 'HSM-backed, automatic rotation every 90 days' },
  { label: 'Authentication', value: 'SSO (SAML 2.0 / OIDC), hardware token MFA' },
  { label: 'Network isolation', value: 'VPC per tenant, no shared infrastructure' },
  { label: 'Audit logging', value: 'Immutable append-only log, 7-year retention' },
  { label: 'Penetration testing', value: 'Quarterly by independent third party' },
  { label: 'Incident response', value: 'P1: 15-minute acknowledgement SLA' },
]

export default function Security() {
  return (
    <ForgeLayout>
      {/* Header */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#111' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-4 slam slam-1">Security Overview</span>
          <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase text-white/90 slam slam-2">
            Built Like<br />a Vault
          </h1>
          <p className="text-white/30 text-sm md:text-base font-light leading-relaxed max-w-xl mt-6 slam slam-3">
            Industrial systems are critical infrastructure. Our security posture reflects that reality — zero trust architecture, defense in depth, and continuous verification at every layer.
          </p>
        </div>
      </section>

      {/* Hazard divider */}
      <div className="h-[3px] w-full" style={{
        background: 'repeating-linear-gradient(90deg, #ff6b00 0px, #ff6b00 10px, transparent 10px, transparent 20px)',
        opacity: 0.3,
      }} />

      {/* Certifications */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#1a1614' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-10">Certifications &amp; Compliance</span>

          <div className="space-y-0">
            {certifications.map((cert, i) => (
              <div
                key={cert.code}
                className="border-l-4 border-[#ff6b00] border-b border-white/5 p-6 md:p-8 group hover:bg-white/[0.02] transition-all"
                style={{ animation: `slideIn 0.5s ease-out ${i * 0.08}s both` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-4 shrink-0 md:w-64">
                    <span className="font-anton text-lg md:text-xl tracking-wider text-white/80 group-hover:text-[#ff6b00] transition-colors">
                      {cert.code}
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#ff6b00]/80 border border-[#ff6b00]/30 px-3 py-1 shrink-0 self-start">
                    {cert.status}
                  </span>
                  <p className="text-sm text-white/30 font-light leading-relaxed flex-1">
                    {cert.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Spec Sheet */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#111' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-10">Security Architecture</span>

          <div className="border-2 border-white/5">
            {architectureItems.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col md:flex-row md:items-center p-5 md:p-6 ${i < architectureItems.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-all`}
              >
                <span className="text-xs tracking-[0.15em] uppercase font-bold text-white/40 md:w-56 shrink-0 mb-1 md:mb-0">
                  {item.label}
                </span>
                <span className="text-sm text-white/60 font-light">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vulnerability Disclosure */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#1a1614' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-6">Vulnerability Disclosure</span>
          <div className="border-l-4 border-[#ff6b00] pl-8 md:pl-12">
            <h3 className="font-anton text-2xl md:text-3xl tracking-wider text-white/80 mb-4">
              Responsible Disclosure Policy
            </h3>
            <p className="text-sm text-white/30 font-light leading-relaxed max-w-2xl mb-6">
              We take security vulnerabilities seriously. If you discover a security issue in our platform, we encourage responsible disclosure. Report findings to our security team and we will acknowledge receipt within 24 hours and provide a detailed response within 72 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="border-2 border-white/10 p-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/30 block mb-1">Security Contact</span>
                <span className="text-sm text-[#ff6b00] font-semibold">security@forge.industrial</span>
              </div>
              <div className="border-2 border-white/10 p-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/30 block mb-1">PGP Key</span>
                <span className="text-sm text-white/50 font-mono">0xAB12 CD34 EF56</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ForgeLayout>
  )
}
