import Seo from "@/components/seo";
import Signup from "@/components/signup/signup";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Start Your Free POS Trial | FreshPrep POS - Sign Up Today"
        description="Try FreshPrep POS free for 14 days. No credit card required. Streamline your restaurant or retail business with our all-in-one point of sale software. Sign up in minutes."
        keywords={[
          "POS free trial",
          "sign up for POS",
          "POS software demo",
          "restaurant POS signup",
          "retail POS free trial",
          "business software trial",
          "cloud POS sign up",
          "POS for small business",
          "start POS free trial",
          "no credit card POS trial",
          "point of sale software demo",
          "POS system sign up",
          "try POS free",
          "business management software trial",
          "14-day POS trial",
        ]}
        url="/signup"
        image="/og-pos-home.jpg"
        author="FreshPrep"
      />
      <Signup />
    </div>
  );
}
