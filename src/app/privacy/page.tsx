import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy Policy | Titan Observatory",
  description:
    "Privacy Policy for the Titan Observatory website — how we collect, use, and protect your information.",
};

const lastUpdated = "April 3, 2026";
const contactEmail = "contact@titanobservatory.org";
const orgName = "Titan Astronomical Observatory Inc.";

export default function PrivacyPage() {
  return (
    <main className="relative z-10">
      <div className="mx-auto w-full max-w-3xl space-y-14">
        {/* Header */}
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-orange sm:text-xs sm:tracking-[0.25em]">
            Legal
          </p>
          <h1 className="text-4xl font-bold text-titan-text-secondary sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-titan-text-muted">Last updated: {lastUpdated}</p>
        </header>

        <AnimatedSection className="space-y-10 text-sm leading-7 text-titan-text-primary/85">

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">1. Overview</h2>
            <p>
              {orgName} (&ldquo;Titan Observatory,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains
              what information we collect when you visit our website or use our services, how we use it,
              and the choices you have regarding your information. By using our Services, you agree to
              the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">2. Information We Collect</h2>
            <p className="font-medium text-titan-text-secondary">Information you provide directly:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong>Newsletter subscriptions:</strong> If you sign up for our newsletter, we collect
                your email address to send you project updates and announcements.
              </li>
              <li>
                <strong>Donations:</strong> If you donate through our platform, payment and contact
                information is collected and processed by our third-party payment processor (Givebutter).
                We receive a record of the donation, including your name and message if you choose to
                provide one, but we do not store full payment card details.
              </li>
              <li>
                <strong>Contact inquiries:</strong> If you email us directly, we receive the information
                you include in your message.
              </li>
            </ul>

            <p className="pt-2 font-medium text-titan-text-secondary">Information collected automatically:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong>Usage data:</strong> We use Google Analytics to collect anonymized information
                about how visitors interact with the site, such as pages visited, time on page, and
                referral sources. This data is aggregated and does not personally identify you.
              </li>
              <li>
                <strong>Log data:</strong> Our hosting infrastructure may automatically record standard
                server log information including your IP address, browser type, pages requested, and
                timestamps. This data is used for security and operational purposes.
              </li>
              <li>
                <strong>Cookies and local storage:</strong> We use browser local storage to remember
                your accessibility preferences (animation and text size settings). We do not use
                tracking cookies for advertising purposes.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Send newsletters and project update emails to subscribers.</li>
              <li>Process and acknowledge donations.</li>
              <li>Respond to your inquiries and provide support.</li>
              <li>Analyze aggregate usage trends to improve our website and content.</li>
              <li>Maintain the security and integrity of our Services.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal information to third parties for marketing
              purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">4. Third-Party Services</h2>
            <p>
              We use the following third-party services that may process your data in accordance with
              their own privacy policies:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong>Givebutter</strong> — donation processing and donor messaging.
              </li>
              <li>
                <strong>Brevo (Sendinblue)</strong> — newsletter delivery and email list management.
              </li>
              <li>
                <strong>Google Analytics</strong> — anonymized website traffic analysis.
              </li>
              <li>
                <strong>Discord</strong> — community presence widget (publicly available data only).
              </li>
            </ul>
            <p>
              We encourage you to review the privacy policies of these providers for more information on
              how they handle your data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">5. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes
              described in this policy, or as required by law. Newsletter subscriber data is retained
              until you unsubscribe. Donation records may be retained for tax and legal compliance
              purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">6. Your Rights and Choices</h2>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong>Unsubscribe:</strong> You may unsubscribe from our newsletter at any time using
                the link in any email we send, or by contacting us directly.
              </li>
              <li>
                <strong>Access and correction:</strong> You may request access to, correction of, or
                deletion of personal information we hold about you by contacting us at{" "}
                <a className="text-titan-yellow underline-offset-4 hover:underline" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>.
              </li>
              <li>
                <strong>Analytics opt-out:</strong> You can opt out of Google Analytics tracking by
                installing the{" "}
                <a
                  className="text-titan-yellow underline-offset-4 hover:underline"
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">7. Children&apos;s Privacy</h2>
            <p>
              Our Services are not directed to children under the age of 13. We do not knowingly collect
              personal information from children under 13. If you believe we have inadvertently collected
              such information, please contact us and we will take prompt steps to delete it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">8. Security</h2>
            <p>
              We take reasonable administrative, technical, and physical measures to protect your
              information against unauthorized access, alteration, disclosure, or destruction. However,
              no method of transmission over the internet or electronic storage is completely secure.
              We cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will update the
              &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this
              policy periodically. Your continued use of the Services after changes are posted
              constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-titan-text-secondary">10. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or how we handle your
              information, please contact us at{" "}
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
