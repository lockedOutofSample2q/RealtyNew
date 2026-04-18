import { siteConfig } from '@/config/site'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Cookie Policy | ${siteConfig.name}`,
  description: `How we use cookies to improve your experience on ${siteConfig.name}.`,
}

export default function CookiesPage() {
  const lastUpdated = "April 18, 2026"

  return (
    <main className="min-h-screen bg-white pt-[var(--nav-height)]">
      <div className="container-site py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium mb-4">Cookie Policy</h1>
          <p className="text-black/40 text-sm mb-12">Last Updated: {lastUpdated}</p>

          <div className="prose-monter space-y-10 text-black/70">
            <section>
              <h2 className="text-black font-semibold text-xl mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">2. How We Use Cookies</h2>
              <p>
                {siteConfig.name} uses cookies to enhance your experience on our website. Specifically, we use them for:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function correctly (e.g., authentication, security).</li>
                <li><strong>Analytics Cookies:</strong> We use tools like Google Analytics to understand how visitors interact with our site, which helps us improve content and navigation.</li>
                <li><strong>Preference Cookies:</strong> To remember your choices, such as currency settings or language preferences.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-black">Session Cookies</p>
                  <p>These are temporary and are deleted once you close your web browser.</p>
                </div>
                <div>
                  <p className="font-bold text-black">Persistent Cookies</p>
                  <p>These remain on your device for a set period or until you delete them manually.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">4. Managing Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>View the cookies on your device and delete them individually.</li>
                <li>Block third-party cookies.</li>
                <li>Block cookies from specific sites.</li>
                <li>Block all cookies from being set.</li>
                <li>Delete all cookies when you close your browser.</li>
              </ul>
              <p className="mt-4">
                Please note that if you choose to disable cookies, some parts of our website may not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">5. Third-Party Cookies</h2>
              <p>
                In some cases, we use cookies provided by trusted third parties. This site uses Google Analytics for tracking and reporting website traffic. For more information on how Google uses your data, please visit their privacy site.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">6. Changes to This Policy</h2>
              <p>
                We may update our Cookie Policy from time to time to reflect changes in technology or legislation. We encourage you to check this page periodically for the latest information.
              </p>
            </section>

            <section>
              <h2 className="text-black font-semibold text-xl mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please email us at <span className="text-black font-medium">{siteConfig.contact.email}</span>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
