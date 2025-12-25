"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { supabase } from "@/supabase-client";

// Define validation schema with Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (authError) {
        // Handle specific Supabase errors
        if (authError.message.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password. Please try again.");
        } else if (authError.message.includes("Email not confirmed")) {
          throw new Error(
            "Please confirm your email address before logging in."
          );
        } else if (authError.message.includes("User not found")) {
          throw new Error("No account found with this email address.");
        } else if (authError.message.includes("rate limit")) {
          throw new Error(
            "Too many attempts. Please try again in a few minutes."
          );
        } else {
          throw new Error(
            authError.message || "Login failed. Please try again."
          );
        }
      }

      router.push("/dashboard");
    } catch (error) {
      // Handle API errors
      setError("root", {
        type: "manual",
        message: "Login failed. Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true); // Add loading state

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error("Google OAuth error:", error);
        // Handle error (show toast or set error state)
        setError("root", {
          type: "manual",
          message: "Google sign in failed. Please try again.",
        });
      }
      // No need to redirect manually - Supabase handles it
    } catch (error) {
      console.error("Google sign up error:", error);
      setError("root", {
        type: "manual",
        message: "Google sign in failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change to clear errors
  const handleInputChange = (fieldName: keyof LoginFormData) => {
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
    if (errors.root) {
      clearErrors("root");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[#D4AF37] rounded flex items-center justify-center">
            <span className="text-black font-bold text-2xl">P</span>
          </div>
          <span className="text-white font-bold text-2xl">POS System</span>
        </Link>

        <Card className="bg-[#0A0A0A] border-[#D4AF37]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {errors.root && (
                <Alert
                  variant="destructive"
                  className="bg-red-950/50 border-red-900 text-red-200"
                >
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}

              <Button
                type="button"
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full border-[#D4AF37]/30 text-white hover:bg-[#D4AF37]/10 bg-[#1A1A1A] flex items-center justify-center gap-3"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#D4AF37]/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0A0A0A] px-2 text-gray-500">
                    or continue with email
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  onChange={(e) => {
                    handleInputChange("email");
                    register("email").onChange(e);
                  }}
                  className={`bg-[#1A1A1A] border text-white placeholder:text-gray-500 focus:border-[#D4AF37] ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#D4AF37]/30"
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    onChange={(e) => {
                      handleInputChange("password");
                      register("password").onChange(e);
                    }}
                    className={`bg-[#1A1A1A] border text-white placeholder:text-gray-500 focus:border-[#D4AF37] pr-10 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#D4AF37]/30"
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37]"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="remember"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        id="remember"
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          handleInputChange("remember");
                        }}
                        className="w-4 h-4 rounded border-[#D4AF37] bg-[#1A1A1A] text-[#D4AF37] focus:ring-[#D4AF37]"
                        disabled={isLoading}
                      />
                    )}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-400 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/reset-password"
                  className="text-sm text-[#D4AF37] hover:text-[#D4AF37]/80"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#D4AF37] hover:text-[#D4AF37]/80 font-semibold"
              >
                Sign up
              </Link>
            </div>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#D4AF37]/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0A0A0A] px-2 text-gray-500">or</span>
              </div>
            </div>
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 bg-transparent"
                disabled={isLoading}
              >
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;
