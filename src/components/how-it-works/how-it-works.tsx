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
const features = [
  {
    title: "Dashboard Overview",
    description: "Real-time insights and key metrics at a glance",
  },
  {
    title: "Product Management",
    description: "Easy product catalog and inventory control",
  },
  {
    title: "Sales Processing",
    description: "Fast, secure transaction processing",
  },
  {
    title: "Inventory Tracking",
    description: "Automated stock management and alerts",
  },
  {
    title: "Analytics & Reports",
    description: "Comprehensive reporting and insights",
  },
  {
    title: "Settings & Configuration",
    description: "Customize your system to fit your needs",
  },
];

function HowItWorksPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight text-balance">
              How <span className="text-[#D4AF37]">It Works</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed text-pretty">
              Get started in minutes with our simple three-step process. No
              complex setup, no technical expertise required.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold text-xl">1</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    Sign Up & Create Account
                  </h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed ml-16">
                  Create your account in seconds. No credit card required for
                  the free trial. Simply enter your business details and you're
                  ready to go.
                </p>
              </div>
              <Card className="bg-[#0A0A0A] border-[#D4AF37] order-1 md:order-2">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center">
                    <UserPlus className="text-[#D4AF37]" size={80} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <Card className="bg-[#0A0A0A] border-[#D4AF37]">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center">
                    <Settings className="text-[#D4AF37]" size={80} />
                  </div>
                </CardContent>
              </Card>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold text-xl">2</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    Configure Your System
                  </h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed ml-16">
                  Add your products, set up inventory, configure payment
                  methods, and customize settings to match your business needs.
                  Our intuitive interface makes it easy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold text-xl">3</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    Start Selling
                  </h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed ml-16">
                  You're all set! Start processing transactions, tracking sales,
                  and managing your business. Access real-time analytics and
                  reports to make informed decisions.
                </p>
              </div>
              <Card className="bg-[#0A0A0A] border-[#D4AF37] order-1 md:order-2">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center">
                    <Rocket className="text-[#D4AF37]" size={80} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Overview */}
          <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              What You'll Get
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-[#D4AF37] flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join thousands of businesses using our POS system
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-[#8E7525] hover:bg-[#A38A2E] text-white text-lg px-8 py-6"
              >
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
