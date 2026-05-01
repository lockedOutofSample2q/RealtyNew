import { siteConfig } from '@/config/site'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Terms and conditions for using the services and website of ${siteConfig.name}.`,
}

export default function TermsPage() {
  const lastUpdated = "April 18, 2026"

  return (
    <main className="min-h-screen">
      <div className="bg-white text-black pt-[calc(var(--nav-height)+4rem)] pb-24 px-6 border-b border-black/10 relative overflow-hidden">
        <div className="container-site">
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium mb-4">Terms & Conditions</h1>
          <p className="text-black/40 text-sm">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="container-site py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="prose-monter space-y-10 text-black/70">
            <section>
              <h2 className="text-black font-semibold text-xl mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in India. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">2. Services Provided</h2>
              <p>
                {siteConfig.name} provides independent real estate advisory, due diligence, and market analysis services in Mohali and Greater Punjab. Our role is that of a consultant and advisor. 
              </p>
              <p className="mt-4">
                <strong>Disclaimer:</strong> While we provide data-driven insights and verified information, {siteConfig.name} does not guarantee future investment returns or property appreciation. Real estate investments are subject to market risks.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">3. User Responsibilities</h2>
              <p>When using our website or booking a consultation, you agree to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Provide accurate, current, and complete information about yourself and your property requirements.</li>
                <li>Use the information provided by us for personal, non-commercial purposes only.</li>
                <li>Not engage in any activity that interferes with or disrupts the website’s functionality.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">4. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and blog articles, is the property of {siteConfig.name} and is protected by copyright and intellectual property laws. Unauthorized reproduction or distribution of this content is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">5. Limitation of Liability</h2>
              <p>
                In no event shall {siteConfig.name} or its MD be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if we have been notified of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">6. Third-Party Links</h2>
              <p>
                This website may contain links to external websites (such as RERA Punjab, GMADA, or developer sites). {siteConfig.name} is not responsible for the content or privacy practices of these third-party sites.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">7. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Mohali, Punjab.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">8. Modifications</h2>
              <p>
                {siteConfig.name} may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms and conditions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
