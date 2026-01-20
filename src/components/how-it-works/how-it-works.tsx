import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Rocket,
  Settings,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import VideoDemo from "../video-demo";

const features = [
  {
    title: "Daily sales tracking",
    description: "See today's sales, profit, and top products at a glance",
  },
  {
    title: "Stock alerts on phone",
    description: "Get WhatsApp notifications when stock is low",
  },
  {
    title: "Customer due reminders",
    description: "Track who owes you money automatically",
  },
  {
    title: "All bills saved digitally",
    description: "Access all past invoices anytime, anywhere",
  },
];

function HowItWorksPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h1 className="text-5xl md:text-6xl font-bold  mb-6 leading-tight text-balance">
              Start in <span className="text-primary">10 Minutes</span>, Not 10
              Days
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed text-pretty">
              Get started in minutes with our simple three-step process. No
              complex setup, no technical expertise required.
            </p>
          </div>

          {/* Video Demo Section - Add your 2-min demo video here */}
          <div className="mb-16 max-w-4xl mx-auto">
            <VideoDemo />
          </div>

          {/* Steps */}
          <div className="space-y-12 mb-20">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-background font-bold text-xl">1</span>
                  </div>
                  <h2 className="text-3xl font-bold ">Sign Up Free</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed ml-16">
                  Just enter your name and email. Start your 14-day free trial
                  instantly.
                </p>
              </div>
              <Card className="bg-card border-primary order-1 md:order-2">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center">
                    <UserPlus className="text-primary" size={80} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <Card className="bg-card border-primary">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-20 h-20 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-background font-bold text-xl">2</span>
                  </div>
                  <h2 className="text-3xl font-bold ">Setup Your Shop</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed ml-16">
                  Add shop name, phone, address, and logo. These will appear on
                  all your bills and invoices.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-background font-bold text-xl">3</span>
                  </div>
                  <h2 className="text-3xl font-bold ">Add Your Products</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed ml-16">
                  Type product names and prices. Or upload Excel if you have
                  many.
                </p>
              </div>
              <Card className="bg-card border-primary order-1 md:order-2">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center">
                    <Settings className="text-primary" size={80} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <Card className="bg-card border-primary">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center">
                    <Rocket className="text-primary" size={80} />
                  </div>
                </CardContent>
              </Card>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-background font-bold text-xl">4</span>
                  </div>
                  <h2 className="text-3xl font-bold ">Create First Bill</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed ml-16">
                  Click products → Set quantity → Add customer → Print/Send
                  bill.
                </p>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="bg-card border border-primary rounded-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold  mb-8 text-center">
              What You Get Immediately
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-primary flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <h3 className=" font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Teaser */}
            <div className="mt-10 pt-6 border-t border-gray-800">
              <div className="text-center">
                <p className="text-gray-300 mb-2 font-medium">
                  "Common question: 'Can my assistant also use it?'"
                </p>
                <p className="text-primary font-semibold">
                  Answer: Yes! Add multiple users free.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold  mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join thousands of businesses using our POS system
            </p>
            <Link href="/signup">
              <Button size="lg" className=" text-lg px-8 py-6">
                Start Your Free Trial
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export default HowItWorksPage;
