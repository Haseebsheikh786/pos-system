"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useState, useRef } from "react";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
            Simple Billing Software{" "}
            <span className="text-[#D4AF37]">for Your Shop</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed text-pretty">
            Create bills, track stock, manage credit – all in one place. Start
            free for 14 days.
          </p>

          {/* Video Container - You can embed your 2-min demo video here */}
          <div className="mb-10 max-w-3xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 bg-black">
              {/* Video */}
              <video
                ref={videoRef}
                src="/demo.mp4"
                className="w-full h-full object-cover"
                controls={isPlaying}
              />

              {/* Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="text-center">
                    <div
                      onClick={handlePlay}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#A38A2E] transition-colors cursor-pointer"
                    >
                      <PlayCircle size={40} className="text-white ml-1" />
                    </div>
                    <p className="text-gray-300 font-medium">
                      Watch 2-Minute Demo
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      See how it works in real shop
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-[#8E7525] hover:bg-[#A38A2E] text-white text-lg px-8 py-6"
              >
                Start Free Trial
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

          {/* Trust Badge */}
          <div className="mt-12 pt-6 border-t border-gray-800">
            <p className="text-gray-400">
              <span className="text-[#D4AF37] font-semibold">
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
