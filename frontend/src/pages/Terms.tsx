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

const Terms = () => (
  <div className="min-h-screen w-full">
    <PageSEO
      title="Terms of Service - ColorPeek"
      description="Terms of service for using ColorPeek's free online color and CSS design tools. Read about acceptable use, intellectual property, and limitations of liability."
      path="/terms"
      keywords="colorpeek terms of service, user agreement, acceptable use, free tools terms"
    />
    <Navbar onColorSelect={() => {}} />

    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <span className="section-label mb-3 inline-block">Legal</span>
          <h1 className="text-4xl font-bold mt-2 mb-2 text-[var(--text-primary)]">Terms of Service</h1>
          <p className="text-sm text-[var(--text-muted)]">Last updated: April 26, 2026</p>
        </div>

        <div className="glass-card p-8 rounded-2xl">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using ColorPeek (color-peek.com), you agree to be bound by these Terms
              of Service. If you do not agree with any part of these terms, please do not use the site.
            </p>
            <p>
              These terms apply to all visitors and users of ColorPeek.
            </p>
          </Section>

          <Section title="2. What ColorPeek Provides">
            <p>
              ColorPeek provides a collection of free, browser-based design and CSS tools including
              (but not limited to) color palette generators, CSS code generators, typography tools,
              and accessibility checkers.
            </p>
            <p>
              All tools are provided free of charge and run entirely in your browser. We reserve the
              right to add, modify, or remove any tool or feature at any time without notice.
            </p>
            <p>
              ColorPeek is provided "as is" and "as available" without warranties of any kind,
              express or implied. We do not guarantee continuous, uninterrupted, or error-free access.
            </p>
          </Section>

          <Section title="3. Use of Generated Content">
            <p>
              Any CSS code, color values, palettes, gradients, type scales, or other output generated
              by ColorPeek tools is yours to use freely in personal and commercial projects.
              No attribution to ColorPeek is required.
            </p>
            <p>
              We make no guarantees about the accuracy or fitness for purpose of any generated output.
              You are responsible for testing and validating any code or values before using them in
              production environments.
            </p>
          </Section>

          <Section title="4. Acceptable Use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Attempt to disrupt, overload, or interfere with the normal operation of ColorPeek</li>
              <li>Scrape or programmatically access the site at a rate that constitutes excessive load</li>
              <li>Use the site for any purpose that is unlawful under applicable laws</li>
              <li>Attempt to reverse-engineer, copy, or replicate ColorPeek's source code for competing products</li>
              <li>Use automated tools to generate large volumes of requests without permission</li>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              The ColorPeek brand, logo, visual design, and underlying source code are owned by
              Abhijit Ramesh Chapke and are protected by applicable intellectual property laws.
            </p>
            <p>
              You may not copy, reproduce, or redistribute the ColorPeek website, its design, or its
              source code without explicit written permission.
            </p>
            <p>
              The <em>output</em> of ColorPeek tools (CSS code, color values, palettes) is free for
              you to use as described in Section 3. The site itself is not.
            </p>
          </Section>

          <Section title="6. Third-Party Services">
            <p>
              ColorPeek uses third-party services including Google Analytics (for usage analytics)
              and Google AdSense (for advertising). By using ColorPeek, you acknowledge that these
              services operate under their own terms and privacy policies.
            </p>
            <p>
              Google Fonts previewed on font pairing pages are subject to Google's terms of service.
              The fonts themselves are licensed under open-source licenses (SIL Open Font License or
              Apache License 2.0).
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, ColorPeek and Abhijit Ramesh Chapke shall not
              be liable for any direct, indirect, incidental, special, consequential, or punitive
              damages arising from your use of, or inability to use, the site or its tools.
            </p>
            <p>
              This includes, without limitation, any loss of data, loss of revenue, or damage to
              your systems resulting from reliance on ColorPeek output.
            </p>
            <p>
              ColorPeek is a free service operated without charge. Use it at your own risk.
            </p>
          </Section>

          <Section title="8. No Warranties">
            <p>
              ColorPeek is provided without any warranty, express or implied. We do not warrant that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>The service will be uninterrupted or error-free</li>
              <li>Generated code is suitable for any particular purpose</li>
              <li>Color values or contrast ratios are accurate to standards beyond reasonable precision</li>
              <li>The site will be available at any specific time</li>
            </ul>
          </Section>

          <Section title="9. Governing Law">
            <p>
              These terms are governed by the laws of India. Any disputes arising from these terms
              or your use of ColorPeek shall be subject to the exclusive jurisdiction of the courts
              of India.
            </p>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>
              We may update these terms at any time. When we do, we will update the "Last updated"
              date at the top of this page. Continued use of ColorPeek after changes are posted
              constitutes your acceptance of the revised terms.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Questions about these terms? <Link to="/contact" className="text-indigo-500 hover:underline">Contact us</Link>.
            </p>
          </Section>

        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default Terms;
