import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import SEO from "@/components/seo";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Terms & Conditions - POS Software"
        description="Read the terms and conditions for using our POS software. Understand your rights, obligations, and legal agreements with our service."
        keywords={[
          "POS software",
          "terms and conditions",
          "legal",
          "user agreement",
          "service terms",
        ]}
        url="/terms"
        image="/og-pos-terms.jpg"
        author="Your Company Name"
      />
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold  mb-6 leading-tight text-balance">
              Terms & <span className="text-primary">Conditions</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Last updated: December 14, 2024
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-400 leading-relaxed">
                By accessing and using POS System ("the Service"), you accept
                and agree to be bound by the terms and provision of this
                agreement. If you do not agree to these terms, you should not
                use the Service.
              </p>
            </div>

            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">2. Use License</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Permission is granted to temporarily access and use the Service
                for personal or commercial use. This license shall automatically
                terminate if you violate any of these restrictions and may be
                terminated by POS System at any time.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mt-3 ml-4">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose without proper
                  authorization
                </li>
                <li>
                  Attempt to decompile or reverse engineer any software
                  contained in the Service
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
                <li>
                  Transfer the materials to another person or "mirror" the
                  materials on any other server
                </li>
              </ul>
            </div>

            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">3. User Accounts</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times. Failure to
                do so constitutes a breach of the Terms, which may result in
                immediate termination of your account on our Service.
              </p>
              <p className="text-gray-400 leading-relaxed">
                You are responsible for safeguarding the password that you use
                to access the Service and for any activities or actions under
                your password. You agree not to disclose your password to any
                third party. You must notify us immediately upon becoming aware
                of any breach of security or unauthorized use of your account.
              </p>
            </div>

            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">4. Payment Terms</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you register for a paid subscription, you agree to pay all
                fees and charges associated with your account in accordance with
                the pricing and payment terms presented to you during the
                purchase process.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                All fees are quoted in U.S. Dollars and are non-refundable
                unless otherwise specified. We reserve the right to change our
                pricing at any time, but price changes will not affect any
                subscription period that has already been paid for.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Subscriptions automatically renew unless cancelled before the
                renewal date. You may cancel your subscription at any time
                through your account settings.
              </p>
            </div>

            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">
                5. Service Availability
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We strive to provide 99.9% uptime for our Service. However, we
                do not guarantee that the Service will be uninterrupted or
                error-free. We reserve the right to suspend or terminate the
                Service for maintenance, updates, or any other reason at our
                discretion.
              </p>
            </div>

            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-gray-400 leading-relaxed">
                The Service and its original content, features, and
                functionality are and will remain the exclusive property of POS
                System and its licensors. The Service is protected by copyright,
                trademark, and other laws. Our trademarks and trade dress may
                not be used in connection with any product or service without
                prior written consent.
              </p>
            </div>

            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-400 leading-relaxed">
                In no event shall POS System, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from your
                access to or use of or inability to access or use the Service.
              </p>
            </div>

            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">8. Termination</h2>
              <p className="text-gray-400 leading-relaxed">
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms. Upon termination,
                your right to use the Service will immediately cease.
              </p>
            </div>

            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">9. Changes to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will provide at least 30
                days' notice prior to any new terms taking effect. What
                constitutes a material change will be determined at our sole
                discretion.
              </p>
            </div>

            <div className="bg-card border border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold  mb-4">10. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="mt-4 text-primary">
                <p>Email: legal@possystem.com</p>
                <p>Address: 123 Business Street, San Francisco, CA 94103</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
