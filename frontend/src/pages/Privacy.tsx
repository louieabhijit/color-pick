import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import Footer from '../components/Footer';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">{title}</h2>
    <div className="text-[var(--text-secondary)] leading-relaxed space-y-3">{children}</div>
  </section>
);

const Privacy = () => (
  <div className="min-h-screen w-full">
    <PageSEO
      title="Privacy Policy - ColorPeek"
      description="ColorPeek's privacy policy. Learn how we handle your data, cookies, Google Analytics, and Google AdSense on our free design tools website."
      path="/privacy"
      keywords="colorpeek privacy policy, data collection, cookies, google adsense privacy, gdpr"
    />
    <Navbar onColorSelect={() => {}} />

    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <span className="section-label mb-3 inline-block">Legal</span>
          <h1 className="text-4xl font-bold mt-2 mb-2 text-[var(--text-primary)]">Privacy Policy</h1>
          <p className="text-sm text-[var(--text-muted)]">Last updated: April 26, 2026</p>
        </div>

        <div className="glass-card p-8 rounded-2xl">

          <Section title="1. Introduction">
            <p>
              ColorPeek (color-peek.com) is operated by Abhijit Ramesh Chapke ("we", "our", or "us").
              This Privacy Policy explains what information we collect when you use our website,
              how we use it, and your rights regarding that information.
            </p>
            <p>
              By using ColorPeek, you agree to the terms of this policy. If you do not agree,
              please do not use the site.
            </p>
          </Section>

          <Section title="2. What Data We Collect">
            <p>
              <strong className="text-[var(--text-primary)]">We do NOT collect personal information.</strong> ColorPeek has
              no accounts, no sign-up forms, and no login. We do not store your name, email address,
              or any other personal identifier unless you voluntarily contact us.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">We do NOT store anything you create.</strong> All tools on
              ColorPeek - palettes, gradients, CSS code, color conversions, font pairings - run
              entirely in your browser. Nothing you create is sent to or stored on our servers.
              Your data stays on your device.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">We may collect anonymous usage data</strong> through
              Google Analytics. This includes: pages visited, time spent, browser type and version,
              operating system, screen resolution, approximate geographic region (country/city level),
              and referral source. This data is aggregated and cannot be used to identify you personally.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Contact messages.</strong> If you contact us via the
              contact form, we receive your name, email address, and the contents of your message.
              This information is used only to respond to your inquiry and is not sold or shared.
            </p>
          </Section>

          <Section title="3. Cookies">
            <p>ColorPeek uses cookies for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>
                <strong className="text-[var(--text-primary)]">Preference cookies:</strong> We store your
                dark/light mode preference locally in your browser (via localStorage). This is essential
                for the site to work as expected. No server is involved.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Analytics cookies:</strong> Google Analytics
                uses cookies to collect anonymous usage data as described above. These cookies include
                <code className="text-indigo-500 text-xs mx-1">_ga</code> and
                <code className="text-indigo-500 text-xs mx-1">_gid</code>.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Advertising cookies:</strong> Google AdSense
                may set cookies to serve ads relevant to your interests. See Section 5 for full details.
              </li>
            </ul>
            <p className="mt-3">
              You can disable or delete cookies at any time in your browser settings. Disabling cookies
              will not prevent you from using any ColorPeek tools.
            </p>
          </Section>

          <Section title="4. Google Analytics">
            <p>
              We use Google Analytics to understand how visitors use ColorPeek - which tools are popular,
              how long people spend on each page, and where traffic comes from. All data collected
              is anonymous and aggregated; we cannot identify individual users.
            </p>
            <p>
              To opt out of Google Analytics tracking across all websites, you can install the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
              Google's privacy policy applies to data collected by Google Analytics:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                policies.google.com/privacy
              </a>.
            </p>
          </Section>

          <Section title="5. Google AdSense">
            <p>
              ColorPeek displays advertisements through Google AdSense to support the free tools on
              this site. Google AdSense uses cookies and similar tracking technologies to serve ads
              based on your prior visits to this website and other websites across the internet.
            </p>
            <p>
              Google's use of advertising cookies enables it and its partners to serve ads based on
              your visit to this site and/or other sites on the internet. You may opt out of
              personalized advertising by visiting{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                Google's Ads Settings
              </a>.
            </p>
            <p>
              Alternatively, you can opt out of a third-party vendor's use of cookies for personalized
              advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                www.aboutads.info/choices
              </a>.
            </p>
            <p>
              For more information on how Google uses data when you use our site, see:{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                How Google uses data when you use our partners' sites or apps
              </a>.
            </p>
          </Section>

          <Section title="6. Third-Party Services">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[var(--text-primary)]">Google Fonts:</strong> Some pages load
                Google Fonts to preview typography combinations. When a font preview is active,
                your browser makes a request to fonts.googleapis.com. Google's privacy policy applies.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Netlify:</strong> ColorPeek is hosted
                on Netlify. Netlify may log standard server access logs (IP address, user agent,
                timestamp) for security and operational purposes. See{' '}
                <a
                  href="https://www.netlify.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:underline"
                >
                  Netlify's privacy policy
                </a>.
              </li>
            </ul>
          </Section>

          <Section title="7. Data Security">
            <p>
              All tools run client-side in your browser. No color values, palettes, or designs are
              transmitted to our servers. The ColorPeek website is served over HTTPS. Contact form
              submissions are handled securely via Netlify Forms.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              ColorPeek is not directed at children under the age of 13. We do not knowingly collect
              personal information from children. If you are a parent or guardian and believe your
              child has provided us with personal information, please contact us and we will delete it.
            </p>
          </Section>

          <Section title="9. Your Rights (GDPR / CCPA)">
            <p>
              If you are located in the European Economic Area (EEA) or California, you may have
              rights regarding your personal data, including the right to access, correct, or delete
              it. Since we collect essentially no personal data (except contact form messages),
              there is very little to act on in most cases.
            </p>
            <p>
              To exercise any rights or ask questions about your data, <Link to="/contact" className="text-indigo-500 hover:underline">contact us</Link>.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this policy from time to time. When we do, we will update the "Last updated"
              date at the top of this page. Continued use of ColorPeek after changes constitutes
              acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              For privacy-related questions or to exercise your data rights, please{' '}
              <Link to="/contact" className="text-indigo-500 hover:underline">contact us</Link>.
            </p>
          </Section>

        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default Privacy;
