import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import VideoDemo from "../video-demo";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
            Simple Billing Software{" "}
            <span className="text-primary">for Your Shop</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed text-pretty">
            Create bills, track stock, manage credit – all in one place. Start
            free for 14 days.
          </p>

          {/* Video Container - You can embed your 2-min demo video here */}
          <div className="mb-10 max-w-3xl mx-auto">
            <VideoDemo />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="  px-8 py-6">
                Start Free Trial
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 bg-transparent"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 pt-6 border-t border-gray-800">
            <p className="text-gray-400">
              <span className="text-primary font-semibold">
                No credit card required
              </span>{" "}
              •<span className="mx-2">|</span>
              Setup in 10 minutes
              <span className="mx-2">|</span>
              Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
