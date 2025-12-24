import Seo from "@/components/seo";
import ResetPassword from "@/components/reset-password/reset-password";
export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Reset Your Password | FreshPrep POS Account Recovery"
        description="Reset your FreshPrep POS password securely. Enter your email to receive password reset instructions. Get back to managing your business quickly."
        keywords={[
          "POS password reset",
          "reset POS password",
          "forgot POS password",
          "POS account recovery",
          "business software password reset",
          "restaurant POS password help",
          "retail POS password recovery",
          "cloud POS account access",
          "secure password reset",
          "password recovery",
          "lost POS password",
          "can't login to POS",
          "POS login help",
          "account access recovery",
          "business software support",
        ]}
        url="/reset-password"
        image="/og-pos-home.jpg"
      />
      <ResetPassword />
    </div>
  );
}
