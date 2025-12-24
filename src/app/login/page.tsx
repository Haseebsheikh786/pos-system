import Seo from "@/components/seo";
import Login from "@/components/login/login";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Login to Your POS Dashboard | FreshPrep POS"
        description="Sign in to access your FreshPrep POS dashboard. Manage your sales, inventory, employees, and business analytics from our secure cloud platform."
        keywords={[
          "POS login",
          "sign in to POS",
          "POS dashboard",
          "business software login",
          "restaurant POS login",
          "retail POS login",
          "cloud POS access",
          "secure login",
          "account access",
          "business management login",
        ]}
        url="/login"
        image="/og-pos-home.jpg"
        author="FreshPrep"
      />
      <Login />
    </div>
  );
}
