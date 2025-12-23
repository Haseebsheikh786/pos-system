import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Seo from "@/components/seo";
import HowItWorks from "@/components/how-it-works/how-it-works";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="How Our POS Software Works - Streamline Your Business"
        description="Learn how our POS software simplifies sales, inventory, and customer management with an intuitive, easy-to-use interface."
        keywords={[
          "POS software",
          "how it works",
          "point of sale",
          "inventory management",
          "sales tracking",
        ]}
        url="/how-it-works"
        image="/og-pos-how-it-works.jpg"
        author="Your Company Name"
      />
      <Navbar />
      <HowItWorks />
      <Footer />
    </div>
  );
}
