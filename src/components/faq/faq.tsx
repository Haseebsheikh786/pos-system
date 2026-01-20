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

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "Do I need computer knowledge?",
        answer: "No. If you can use WhatsApp, you can use this.",
      },
      {
        question: "What do I need to start?",
        answer: "Just a smartphone or computer. Printer optional.",
      },
      {
        question: "Is there setup help?",
        answer: "Yes! We'll call you within 1 hour of signup to help setup.",
      },
    ],
  },
  {
    category: "Features",
    questions: [
      {
        question: "How do I track credit?",
        answer:
          "When saving an invoice, enter '0' or a partial payment amount. The remaining balance becomes credit for that customer. All credits are tracked automatically in the Customer section.",
      },
      {
        question: "What if internet stops?",
        answer: "Works completely offline. Syncs when internet returns.",
      },
      {
        question: "Can I use on mobile and computer?",
        answer: "Yes! Access from anywhere.",
      },
      {
        question: "How do stock alerts work?",
        answer: "Get WhatsApp notification when stock is low.",
      },
    ],
  },
  {
    category: "Pricing",
    questions: [
      {
        question: "What happens after 14 days?",
        answer:
          "If you like it: $5/month (billed monthly) or $50/year (save $10). If not, cancel free.",
      },
      {
        question: "Are there hidden charges?",
        answer: "No. No setup fee, no per-transaction fee.",
      },
      {
        question: "Can I cancel?",
        answer: "Yes, anytime. No questions asked.",
      },
    ],
  },
  {
    category: "Data & Security",
    questions: [
      {
        question: "Is my data safe?",
        answer: "Daily backups. Your data never deleted even if you cancel.",
      },
      {
        question: "Can I download my bills?",
        answer: "Yes, download all bills as PDF anytime.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold  mb-6 leading-tight text-balance">
            Frequently Asked <span className="text-primary">Questions</span>
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
              <h2 className="text-2xl font-bold  mb-4">{section.category}</h2>
              <Card className="bg-card border-primary">
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((faq, qIdx) => (
                    <AccordionItem
                      key={qIdx}
                      value={`item-${idx}-${qIdx}`}
                      className="border-primary/30"
                    >
                      <AccordionTrigger className="text-left  hover:text-primary px-6 py-4">
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
        <Card className="bg-card border-primary mt-12">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl font-bold  mb-2">Still Have Questions?</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Our support team is here to help. Get in touch and we'll answer
              your questions.
            </p>
            <Link href="/contact">
              <Button className="">Contact Support</Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;
