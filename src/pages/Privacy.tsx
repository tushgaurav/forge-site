import ForgeLayout from '../components/ForgeLayout'

const sections = [
  {
    title: 'Data Collection',
    content: [
      'We collect operational telemetry data from industrial sensors, PLCs, and edge devices connected to the Forge platform. This includes machine state, environmental readings, and performance metrics.',
      'Account information such as name, email, company, and role is collected during registration. Payment information is processed by our PCI-compliant payment processor and never stored on our servers.',
      'We collect minimal analytics data on platform usage to improve the product. This includes page views, feature usage, and error reports. No industrial process data is used for analytics.',
    ],
  },
  {
    title: 'Data Usage',
    content: [
      'Industrial telemetry data is used exclusively to power the monitoring, predictive maintenance, and alerting features you have configured. Your data trains models for your deployment only — never shared across tenants.',
      'Account data is used for authentication, billing, support, and platform communications. We do not sell personal data to third parties.',
      'Aggregated, anonymized performance benchmarks may be published in industry reports. No individual company or facility can be identified from these benchmarks.',
    ],
  },
  {
    title: 'Data Retention',
    content: [
      'Raw telemetry data: retained for the duration specified in your service agreement (default: 13 months rolling window).',
      'Processed analytics and model outputs: retained for the contract term plus 90 days.',
      'Account data: retained for the duration of the account plus 30 days after deletion request.',
      'Audit logs: retained for 7 years per regulatory requirements.',
      'Upon contract termination, all tenant data is purged within 30 days. A certificate of destruction is provided upon request.',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'All data is encrypted at rest (AES-256-GCM) and in transit (TLS 1.3 with mutual TLS for edge nodes).',
      'Tenant data is logically and physically isolated. Each deployment operates within a dedicated VPC with no shared infrastructure.',
      'Access to production systems requires hardware security keys and is logged immutably. All access is reviewed quarterly.',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'Access: Request a complete export of all data associated with your account and deployment.',
      'Rectification: Request correction of inaccurate account information.',
      'Deletion: Request deletion of your account and all associated data (subject to regulatory retention requirements).',
      'Portability: Receive your data in a machine-readable format (JSON, CSV, or Parquet).',
      'Objection: Opt out of non-essential data processing including analytics and benchmarking.',
      'To exercise any of these rights, contact privacy@forge.industrial or your assigned account representative.',
    ],
  },
  {
    title: 'Cookies & Tracking',
    content: [
      'The Forge platform uses strictly necessary cookies for authentication and session management. These cannot be disabled.',
      'Optional analytics cookies are used only with explicit consent. No third-party advertising cookies are used anywhere on the platform.',
    ],
  },
  {
    title: 'International Transfers',
    content: [
      'For EU-based deployments, all data is processed and stored within EU data centers (Frankfurt, Amsterdam).',
      'When international transfers are necessary, they are governed by Standard Contractual Clauses (SCCs) approved by the European Commission.',
    ],
  },
]

export default function Privacy() {
  return (
    <ForgeLayout>
      {/* Header */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#111' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-4 slam slam-1">Legal</span>
          <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase text-white/90 slam slam-2">
            Privacy<br />Policy
          </h1>
          <p className="text-white/30 text-sm md:text-base font-light leading-relaxed max-w-xl mt-6 slam slam-3">
            Last updated: January 15, 2026. This policy describes how Forge Industrial Systems GmbH collects, uses, and protects your data.
          </p>
        </div>
      </section>

      {/* Hazard divider */}
      <div className="h-[3px] w-full" style={{
        background: 'repeating-linear-gradient(90deg, #ff6b00 0px, #ff6b00 10px, transparent 10px, transparent 20px)',
        opacity: 0.3,
      }} />

      {/* Sections */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#1a1614' }}>
        <div className="max-w-4xl mx-auto">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className="mb-16 last:mb-0"
              style={{ animation: `slideIn 0.5s ease-out ${i * 0.06}s both` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[3px] bg-[#ff6b00]" />
                <h2 className="font-anton text-2xl md:text-3xl tracking-wider uppercase text-white/80">
                  {section.title}
                </h2>
              </div>
              <div className="pl-12 space-y-4">
                {section.content.map((paragraph, j) => (
                  <p key={j} className="text-sm text-white/35 font-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 md:px-10" style={{ background: '#111' }}>
        <div className="max-w-4xl mx-auto">
          <div className="border-2 border-white/5 p-8">
            <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-3">Data Protection Officer</span>
            <p className="text-sm text-white/40 font-light mb-4">
              For questions about this privacy policy or to exercise your data rights, contact our Data Protection Officer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 block mb-1">Email</span>
                <span className="text-sm text-[#ff6b00]">privacy@forge.industrial</span>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 block mb-1">Address</span>
                <span className="text-sm text-white/40">Forge Industrial Systems GmbH, Invalidenstr. 112, 10115 Berlin, Germany</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ForgeLayout>
  )
}
