import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
} from "lucide-react";
const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
            Transform Your Business with{" "}
            <span className="text-[#D4AF37]">Professional POS</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed text-pretty">
            Streamline sales, manage inventory, and grow your business with our
            modern, intuitive point of sale system designed for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-[#8E7525] hover:bg-[#A38A2E] text-white text-lg px-8 py-6"
              >
                Get Started Free
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-lg px-8 py-6 bg-transparent"
              >
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
