import Seo from "@/components/seo";
import UpdatePassword from "@/components/reset-password/update-password";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Update Password | FreshPrep POS Account Security"
        description="Create a new secure password for your FreshPrep POS account. Set a strong password to protect your business data and access dashboard."
        keywords={[
          "POS password update",
          "create new POS password",
          "business software security",
          "restaurant POS password reset",
          "retail POS account security",
          "password recovery",
          "account access recovery",
          "secure password setup",
          "business data protection",
          "POS login security",
        ]}
        image="/og-pos-security.jpg"
        author="FreshPrep"
      />
      <Suspense fallback={<LoadingSpinner />}>
        <UpdatePassword />
      </Suspense>
    </div>
  );
}
