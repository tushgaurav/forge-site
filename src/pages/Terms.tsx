import ForgeLayout from '../components/ForgeLayout'

const sections = [
  {
    num: '01',
    title: 'Acceptance of Terms',
    content: 'By accessing or using the Forge Industrial Intelligence Platform ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not agree to these Terms, you may not access or use the Platform.',
  },
  {
    num: '02',
    title: 'Service Description',
    content: 'Forge provides an industrial IoT platform for sensor data aggregation, predictive maintenance, edge computing, and operational monitoring ("the Service"). The Service includes the cloud platform, edge runtime software, APIs, documentation, and associated support services as described in your service agreement.',
  },
  {
    num: '03',
    title: 'Account Obligations',
    content: 'You are responsible for maintaining the confidentiality of your account credentials, including API keys and access tokens. You must immediately notify Forge of any unauthorized use of your account. You are responsible for all activities that occur under your account, including actions taken by users you have authorized to access the Platform.',
  },
  {
    num: '04',
    title: 'Data Ownership',
    content: 'You retain all rights to your industrial data, telemetry, and operational information ("Your Data") that is processed by the Platform. Forge does not claim ownership of Your Data. You grant Forge a limited license to process Your Data solely for the purpose of providing the Service. Forge will not access, use, or disclose Your Data except as necessary to provide the Service or as required by law.',
  },
  {
    num: '05',
    title: 'Service Level Agreement',
    content: 'Forge commits to 99.95% platform availability measured monthly, excluding scheduled maintenance windows communicated at least 72 hours in advance. Edge runtime components operate independently during network outages and are not subject to cloud availability SLAs. Service credits are issued automatically for SLA breaches exceeding 0.05% monthly downtime.',
  },
  {
    num: '06',
    title: 'Acceptable Use',
    content: 'You agree not to: (a) reverse engineer, decompile, or disassemble the Platform; (b) use the Platform to develop a competing product; (c) exceed the usage limits specified in your service agreement; (d) transmit malicious code or attempt to compromise Platform security; (e) use the Platform in violation of applicable laws or regulations, including export control laws.',
  },
  {
    num: '07',
    title: 'Intellectual Property',
    content: 'The Platform, including its source code, algorithms, user interface, documentation, and all related intellectual property, is owned by Forge Industrial Systems GmbH. Your use of the Platform does not grant you any ownership rights. Machine learning models trained on Your Data remain the property of your organization.',
  },
  {
    num: '08',
    title: 'Limitation of Liability',
    content: 'To the maximum extent permitted by law, Forge\'s total liability for any claims arising from or related to the Service shall not exceed the amounts paid by you to Forge in the twelve (12) months preceding the claim. Forge shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of production, lost profits, or data loss.',
  },
  {
    num: '09',
    title: 'Termination',
    content: 'Either party may terminate the service agreement with 30 days written notice. Forge may suspend access immediately if you breach these Terms or if continued service poses a security risk. Upon termination, Forge will make Your Data available for export for 30 days, after which all data will be permanently deleted.',
  },
  {
    num: '10',
    title: 'Governing Law',
    content: 'These Terms are governed by the laws of the Federal Republic of Germany. Any disputes arising from these Terms shall be resolved exclusively in the courts of Berlin, Germany. If any provision of these Terms is found unenforceable, the remaining provisions will continue in full force and effect.',
  },
]

export default function Terms() {
  return (
    <ForgeLayout>
      {/* Header */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#111' }}>
        <div className="max-w-5xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase text-[#ff6b00] font-bold block mb-4 slam slam-1">Legal</span>
          <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase text-white/90 slam slam-2">
            Terms of<br />Service
          </h1>
          <p className="text-white/30 text-sm md:text-base font-light leading-relaxed max-w-xl mt-6 slam slam-3">
            Last updated: January 15, 2026. These terms govern your use of the Forge Industrial Intelligence Platform.
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
              key={section.num}
              className="border-l-4 border-[#ff6b00] pl-8 md:pl-10 mb-14 last:mb-0"
              style={{ animation: `slideIn 0.5s ease-out ${i * 0.05}s both` }}
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-anton text-4xl md:text-5xl text-white/[0.06] leading-none">
                  {section.num}
                </span>
                <h2 className="font-anton text-xl md:text-2xl tracking-wider uppercase text-white/80">
                  {section.title}
                </h2>
              </div>
              <p className="text-sm text-white/35 font-light leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Effective date */}
      <section className="py-12 px-6 md:px-10" style={{ background: '#111' }}>
        <div className="max-w-4xl mx-auto">
          <div className="border-2 border-white/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 block mb-1">Effective Date</span>
              <span className="text-sm text-white/50">January 15, 2026</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 block mb-1">Legal Contact</span>
              <span className="text-sm text-[#ff6b00]">legal@forge.industrial</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/25 block mb-1">Entity</span>
              <span className="text-sm text-white/40">Forge Industrial Systems GmbH</span>
            </div>
          </div>
        </div>
      </section>
    </ForgeLayout>
  )
}
