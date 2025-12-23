import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
} from "lucide-react";
const CtaSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          Join thousands of businesses already using our POS system
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
    </section>
  );
};

export default CtaSection;
