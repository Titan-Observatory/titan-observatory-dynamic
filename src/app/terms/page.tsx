import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms of Service | Titan Observatory",
  description:
    "Terms of Service for the Titan Observatory website and online platform.",
};

const lastUpdated = "April 3, 2026";
const contactEmail = "contact@titanobservatory.org";
const orgName = "Titan Astronomical Observatory Inc.";
const website = "titanobservatory.org";

export default function TermsPage() {
  return (
    <main className="relative z-10">
      <div className="mx-auto w-full max-w-3xl space-y-14">
        {/* Header */}
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-orange sm:text-xs sm:tracking-[0.25em]">
            Legal
          </p>
          <h1 className="text-4xl font-bold text-titan-text-secondary sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-sm text-titan-text-muted">Last updated: {lastUpdated}</p>
        </header>

        <AnimatedSection className="prose-like space-y-10 text-sm leading-7 text-titan-text-primary/85">

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the {website} website and any associated services (collectively, the
              &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service
              (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use the Services.
              These Terms apply to all visitors, users, and anyone else who accesses or uses the Services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">2. About Titan Observatory</h2>
            <p>
              {orgName} (&ldquo;Titan Observatory,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) is a 501(c)(3) nonprofit organization based in Polk County, Florida.
              Our mission is to enable the public to perform real radio astronomy experiments using
              professional instrumentation through an accessible online platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">3. Use of the Services</h2>
            <p>You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Use the Services in any way that violates applicable federal, state, local, or international law or regulation.</li>
              <li>Transmit any unsolicited or unauthorized advertising or promotional material.</li>
              <li>Attempt to gain unauthorized access to any portion of the Services or any systems or networks connected to the Services.</li>
              <li>Interfere with or disrupt the integrity or performance of the Services.</li>
              <li>Use any automated means, including bots or scrapers, to access the Services without our prior written consent.</li>
              <li>Impersonate or misrepresent your affiliation with any person or organization.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">4. Intellectual Property</h2>
            <p>
              The content on the Services&mdash;including text, graphics, logos, images, audio, and
              software&mdash;is the property of {orgName} or its content suppliers and is protected by
              applicable copyright and intellectual property laws. You may not reproduce, distribute,
              modify, create derivative works of, publicly display, or exploit any content from the
              Services without our express written permission, except as permitted by applicable law.
            </p>
            <p>
              Observation data and educational materials we publish are made available for personal,
              educational, and non-commercial research use. Please credit Titan Observatory when
              referencing our published datasets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">5. Donations</h2>
            <p>
              Donations made through the Services are processed by third-party payment providers. All
              donations to {orgName} are tax-deductible to the extent permitted by law. We are not
              responsible for the privacy practices or terms of any third-party payment processor. By
              making a donation you authorize the applicable payment processor to charge the amount you
              specify. All donations are final unless otherwise required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">6. Newsletter and Communications</h2>
            <p>
              If you subscribe to our newsletter, you consent to receive periodic email communications
              from us about project milestones, fundraising campaigns, and major announcements. You may
              unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us
              at <a className="text-titan-yellow underline-offset-4 hover:underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">7. Third-Party Links and Services</h2>
            <p>
              The Services may contain links to third-party websites, community forums, social media
              platforms, or other external services. These links are provided for convenience only. We
              do not endorse, control, or assume responsibility for the content, privacy policies, or
              practices of any third-party sites or services. We encourage you to review the terms and
              privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS
              WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
              IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
              NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE,
              OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">9. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, {orgName.toUpperCase()} AND ITS
              OFFICERS, DIRECTORS, EMPLOYEES, AND VOLUNTEERS SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR
              USE OF, OR INABILITY TO USE, THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">10. Changes to These Terms</h2>
            <p>
              We may revise these Terms from time to time. When we do, we will update the &ldquo;Last
              updated&rdquo; date at the top of this page. Your continued use of the Services after any
              changes constitutes your acceptance of the revised Terms. We encourage you to review this
              page periodically.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of
              Florida, without regard to its conflict of law provisions. Any disputes arising under
              these Terms shall be subject to the exclusive jurisdiction of the courts located in Polk
              County, Florida.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">12. Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at{" "}
              <a className="text-titan-yellow underline-offset-4 hover:underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>.
            </p>
          </section>
        </AnimatedSection>
      </div>
    </main>
  );
}
