import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I get started with POS System?",
          answer:
            "Getting started is easy! Simply sign up for a free account, configure your products and payment methods, and you're ready to start processing transactions. Our setup wizard will guide you through each step.",
        },
        {
          question: "Is there a free trial available?",
          answer:
            "Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can upgrade to a paid plan at any time during or after the trial period.",
        },
        {
          question: "What equipment do I need?",
          answer:
            "Our POS system works on any modern device with a web browser - desktop, laptop, tablet, or smartphone. For payment processing, you'll need a compatible card reader. We can recommend hardware based on your business needs.",
        },
      ],
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "Can I manage inventory with this system?",
          answer:
            "Our system includes comprehensive inventory management features. Track stock levels, set low-stock alerts, manage multiple locations, and get detailed reports on your inventory performance.",
        },
        {
          question: "Does it work offline?",
          answer:
            "Yes, our POS system includes offline mode. You can continue processing transactions even without an internet connection, and all data will sync automatically when you're back online.",
        },
        {
          question: "Can I accept multiple payment methods?",
          answer:
            "Yes! Our system supports credit cards, debit cards, mobile payments (Apple Pay, Google Pay), cash, and more. You can also split payments across multiple methods for a single transaction.",
        },
        {
          question: "What kind of reports can I generate?",
          answer:
            "We offer comprehensive reporting including sales reports, inventory reports, employee performance, customer analytics, tax reports, and custom reports. All reports can be exported to CSV or PDF.",
        },
      ],
    },
    {
      category: "Pricing & Billing",
      questions: [
        {
          question: "How much does it cost?",
          answer:
            "We offer flexible pricing plans to fit businesses of all sizes. Pricing starts at $49/month for our Basic plan. Contact our sales team for custom enterprise pricing or to discuss your specific needs.",
        },
        {
          question: "Are there any setup fees?",
          answer:
            "No, there are no setup fees or hidden costs. You only pay the monthly subscription fee for your chosen plan. Hardware costs are separate if you need physical equipment.",
        },
        {
          question: "Can I cancel anytime?",
          answer:
            "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your service will remain active until the end of your current billing period.",
        },
      ],
    },
    {
      category: "Support & Security",
      questions: [
        {
          question: "What kind of support do you offer?",
          answer:
            "We provide 24/7 customer support via email, chat, and phone. All plans include access to our comprehensive knowledge base, video tutorials, and dedicated onboarding assistance.",
        },
        {
          question: "Is my data secure?",
          answer:
            "Security is our top priority. We use bank-level encryption, comply with PCI DSS standards, and conduct regular security audits. Your data is backed up daily and stored in secure, redundant data centers.",
        },
        {
          question: "Can I export my data?",
          answer:
            "Yes! You own your data and can export it at any time. We provide easy data export tools in various formats including CSV, Excel, and JSON.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight text-balance">
              Frequently Asked <span className="text-[#D4AF37]">Questions</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed text-pretty">
              Find answers to common questions about our POS system. Can't find
              what you're looking for? Contact our support team.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqs.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {section.category}
                </h2>
                <Card className="bg-[#0A0A0A] border-[#D4AF37]">
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((faq, qIdx) => (
                      <AccordionItem
                        key={qIdx}
                        value={`item-${idx}-${qIdx}`}
                        className="border-[#D4AF37]/30"
                      >
                        <AccordionTrigger className="text-left text-white hover:text-[#D4AF37] px-6 py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-400 px-6 pb-4 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <Card className="bg-[#0A0A0A] border-[#D4AF37] mt-12">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-[#D4AF37]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Still Have Questions?
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our support team is here to help. Get in touch and we'll answer
                your questions.
              </p>
              <Link href="/contact">
                <Button className="bg-[#8E7525] hover:bg-[#A38A2E] text-white">
                  Contact Support
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
