import { Suspense } from "react";
import SEO from "@/components/seo";
import VerifyEmail from "@/components/verify-email/verify-email";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      <SEO
        title="Verify Your Email | FreshPrep POS Account Activation"
        description="Confirm your email address to activate your FreshPrep POS account. Check your inbox for the verification link to start your free trial and access dashboard."
        keywords={[
          "POS email verification",
          "verify POS account",
          "POS account activation",
          "email confirmation POS",
          "business software verification",
          "restaurant POS signup confirmation",
          "retail POS account setup",
          "cloud POS verification",
          "activate POS account",
          "confirm email POS",
          "POS free trial activation",
          "business software email verification",
          "POS signup completion",
          "verify business account",
          "POS dashboard access",
        ]}
        url="/verify-email"
        image="/og-pos-home.jpg"
        author="FreshPrep"
      />
      <Suspense fallback={<LoadingSpinner />}>
        <VerifyEmail />
      </Suspense>
    </div>
  );
}
