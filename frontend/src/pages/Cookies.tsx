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

const Cookies = () => (
  <div className="min-h-screen w-full">
    <PageSEO
      title="Cookie Policy - ColorPeek"
      description="ColorPeek's cookie policy. Learn about the cookies used on our free design tools website, including analytics and advertising cookies, and how to manage them."
      path="/cookies"
      keywords="colorpeek cookie policy, browser cookies, analytics cookies, adsense cookies, manage cookies"
    />
    <Navbar onColorSelect={() => {}} />

    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <span className="section-label mb-3 inline-block">Legal</span>
          <h1 className="text-4xl font-bold mt-2 mb-2 text-[var(--text-primary)]">Cookie Policy</h1>
          <p className="text-sm text-[var(--text-muted)]">Last updated: April 26, 2026</p>
        </div>

        <div className="glass-card p-8 rounded-2xl">

          <Section title="What Are Cookies?">
            <p>
              Cookies are small text files that a website stores on your browser when you visit.
              They are widely used to make websites work correctly, remember your preferences,
              and provide information to website owners about how visitors use the site.
            </p>
          </Section>

          <Section title="Cookies ColorPeek Uses">
            <p>ColorPeek uses three categories of cookies:</p>

            <div className="mt-4 space-y-5">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">1. Preference Cookies (Essential)</h3>
                <p className="text-sm">
                  We store your dark/light mode preference in your browser's localStorage under the
                  key <code className="text-indigo-500 text-xs">colorpeek-theme-v2</code>.
                  This is essential to remember your display preference between visits.
                  No data is sent to any server. You can clear this by clearing your browser's
                  local storage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">2. Analytics Cookies (Google Analytics)</h3>
                <p className="text-sm mb-2">
                  We use Google Analytics to understand how visitors use ColorPeek. Google Analytics
                  sets the following cookies:
                </p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><code className="text-indigo-500 text-xs">_ga</code> — Distinguishes users. Expires after 2 years.</li>
                  <li><code className="text-indigo-500 text-xs">_gid</code> — Distinguishes users. Expires after 24 hours.</li>
                  <li><code className="text-indigo-500 text-xs">_ga_*</code> — Maintains session state. Expires after 2 years.</li>
                </ul>
                <p className="text-sm mt-2">
                  All analytics data is anonymous. We cannot identify you personally from it.
                  To opt out:{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:underline"
                  >
                    Google Analytics Opt-out Add-on
                  </a>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">3. Advertising Cookies (Google AdSense)</h3>
                <p className="text-sm mb-2">
                  ColorPeek displays ads via Google AdSense. Google may use cookies to show you
                  ads based on your interests and previous browsing activity across the internet.
                  Common AdSense cookies include:
                </p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><code className="text-indigo-500 text-xs">IDE</code> — Used by Google DoubleClick for ad targeting. Expires after 1 year.</li>
                  <li><code className="text-indigo-500 text-xs">DSID</code> — Used for signed-in user targeting. Expires after 2 weeks.</li>
                  <li><code className="text-indigo-500 text-xs">test_cookie</code> — Checks if your browser accepts cookies. Expires after 1 day.</li>
                </ul>
                <p className="text-sm mt-2">
                  To opt out of personalized ads:{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:underline"
                  >
                    Google Ads Settings
                  </a>{' '}
                  or{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:underline"
                  >
                    aboutads.info/choices
                  </a>.
                </p>
              </div>
            </div>
          </Section>

          <Section title="How to Manage Cookies">
            <p>
              You can control and delete cookies through your browser settings. All major browsers
              allow you to view, block, and delete cookies. Note that blocking certain cookies
              may affect how ColorPeek functions.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Chrome: Manage cookies</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Firefox: Manage cookies</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Safari: Manage cookies</a></li>
              <li><a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Edge: Manage cookies</a></li>
            </ul>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Cookie Policy from time to time. Changes will be posted on this page
              with an updated date. Continued use of ColorPeek after changes constitutes acceptance.
            </p>
          </Section>

          <Section title="Questions?">
            <p>
              Questions about our use of cookies? <Link to="/contact" className="text-indigo-500 hover:underline">Contact us</Link> or
              read our full <Link to="/privacy" className="text-indigo-500 hover:underline">Privacy Policy</Link>.
            </p>
          </Section>

        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default Cookies;
