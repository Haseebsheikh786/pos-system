import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const CtaSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold  mb-6">
          Try Free for 14 Days
        </h2>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          No card needed. Cancel anytime. Setup help included.
        </p>
        <Link href="/signup">
          <Button size="lg" className=" text-lg px-8 py-6">
            Start Your Free Trial
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
