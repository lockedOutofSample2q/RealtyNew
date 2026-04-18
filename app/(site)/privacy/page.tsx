import { siteConfig } from '@/config/site'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `How we handle and protect your personal data at ${siteConfig.name}.`,
}

export default function PrivacyPage() {
  const lastUpdated = "April 18, 2026"

  return (
    <main className="min-h-screen bg-white pt-[var(--nav-height)]">
      <div className="container-site py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium mb-4">Privacy Policy</h1>
          <p className="text-black/40 text-sm mb-12">Last Updated: {lastUpdated}</p>

          <div className="prose-monter space-y-10 text-black/70">
            <section>
              <h2 className="text-black font-semibold text-xl mb-4">1. Introduction</h2>
              <p>
                At {siteConfig.name}, we value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or engage our real estate advisory services.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">2. Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide to us, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Contact Information: Name, email address, phone number, and mailing address.</li>
                <li>Property Preferences: Information regarding the types of properties you are interested in, budget ranges, and preferred locations.</li>
                <li>Communication Records: Details of your inquiries, consultation bookings, and feedback.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">3. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>To provide personalized real estate advisory and due diligence services.</li>
                <li>To process your inquiries and schedule consultation calls.</li>
                <li>To send relevant market insights, property listings, and updates (with your consent).</li>
                <li>To improve our website functionality and user experience.</li>
                <li>To comply with legal and regulatory requirements in India.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">4. Data Protection and Security</h2>
              <p>
                We implement robust security measures to protect your data from unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the internet is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">5. Sharing Information with Third Parties</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share data with trusted partners (such as legal consultants or verification agencies) only when necessary to fulfill the services you have requested, or when required by law.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Access the personal information we hold about you.</li>
                <li>Request corrections to inaccurate or incomplete data.</li>
                <li>Opt-out of marketing communications at any time.</li>
                <li>Request the deletion of your data, subject to legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">7. Contact Us</h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-black/5 rounded-2xl border border-black/5">
                <p className="font-bold text-black">{siteConfig.name}</p>
                <p>{siteConfig.contact.address}</p>
                <p>Email: {siteConfig.contact.email}</p>
                <p>Phone: {siteConfig.contact.phone}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
