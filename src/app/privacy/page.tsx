import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight text-balance">
              Privacy <span className="text-[#D4AF37]">Policy</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Last updated: December 14, 2024
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-400 leading-relaxed">
                POS System ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our point
                of sale service ("the Service"). Please read this privacy policy
                carefully.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>
                  Account information (name, email address, password, business
                  name)
                </li>
                <li>
                  Payment information (credit card numbers, billing address)
                </li>
                <li>
                  Transaction data (sales records, inventory information,
                  customer data)
                </li>
                <li>
                  Communication data (customer support messages, feedback)
                </li>
                <li>Usage data (how you interact with our Service)</li>
              </ul>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process transactions and send related information</li>
                <li>
                  Send you technical notices, updates, security alerts, and
                  support messages
                </li>
                <li>
                  Respond to your comments, questions, and customer service
                  requests
                </li>
                <li>
                  Monitor and analyze trends, usage, and activities in
                  connection with our Service
                </li>
                <li>
                  Detect, prevent, and address technical issues and fraudulent
                  activities
                </li>
                <li>Personalize and improve your experience</li>
              </ul>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>
                  <strong className="text-white">Service Providers:</strong> We
                  share information with third-party vendors who perform
                  services on our behalf
                </li>
                <li>
                  <strong className="text-white">Legal Requirements:</strong> We
                  may disclose information if required by law or in response to
                  valid requests by public authorities
                </li>
                <li>
                  <strong className="text-white">Business Transfers:</strong> In
                  connection with any merger, sale of company assets, or
                  acquisition
                </li>
                <li>
                  <strong className="text-white">With Your Consent:</strong> We
                  may share information with your explicit consent
                </li>
              </ul>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures
                to protect the security of your personal information, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>
                  Encryption of data in transit and at rest using
                  industry-standard protocols
                </li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>PCI DSS compliance for payment card data</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Data Retention
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We retain your information for as long as necessary to fulfill
                the purposes outlined in this Privacy Policy, unless a longer
                retention period is required or permitted by law. When we no
                longer need your information, we will securely delete or
                anonymize it.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Your Rights and Choices
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Depending on your location, you may have certain rights
                regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>
                  <strong className="text-white">Access:</strong> Request access
                  to your personal information
                </li>
                <li>
                  <strong className="text-white">Correction:</strong> Request
                  correction of inaccurate information
                </li>
                <li>
                  <strong className="text-white">Deletion:</strong> Request
                  deletion of your personal information
                </li>
                <li>
                  <strong className="text-white">Portability:</strong> Request a
                  copy of your data in a portable format
                </li>
                <li>
                  <strong className="text-white">Objection:</strong> Object to
                  processing of your information
                </li>
              </ul>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We use cookies and similar tracking technologies to track
                activity on our Service and hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our Service.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Our Service is not intended for children under the age of 13. We
                do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and believe we have
                collected information from your child, please contact us
                immediately.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                10. International Data Transfers
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Your information may be transferred to and maintained on
                computers located outside of your state, province, country, or
                other governmental jurisdiction where data protection laws may
                differ. We take appropriate safeguards to ensure your data is
                treated securely and in accordance with this Privacy Policy.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Contact Us
              </h2>
              <p className="text-gray-400 leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className="mt-4 text-[#D4AF37]">
                <p>Email: privacy@possystem.com</p>
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
