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
import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";

// Define validation schema with Zod
const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled]);

  // Format countdown to MM:SS
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);

      // Clear any previous errors
      clearErrors("root");

      // Simulate API call (will be replaced with Supabase)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle reset password logic here
      console.log("Reset password link sent to:", data.email);

      // Start countdown for resend (60 seconds)
      setIsResendDisabled(true);
      setCountdown(60);

      // Show success state
      // In a real app, you would trigger the success state here
    } catch (error) {
      // Handle API errors
      if (error.message?.includes("user not found")) {
        setError("email", {
          type: "manual",
          message: "No account found with this email address",
        });
      } else if (error.message?.includes("rate limit")) {
        setError("root", {
          type: "manual",
          message: "Too many attempts. Please try again in a few minutes.",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "Failed to send reset link. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendLink = async () => {
    const email = watch("email");

    if (!email) {
      setError("root", {
        type: "manual",
        message: "Please enter your email address first",
      });
      return;
    }

    try {
      setIsLoading(true);
      clearErrors("root");

      // Simulate API call for resend (will be replaced with Supabase)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Resend reset link to:", email);

      // Restart countdown
      setIsResendDisabled(true);
      setCountdown(60);

      // Show success message
      // In a real app, you would show a success toast here
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Failed to resend link. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change to clear errors
  const handleInputChange = (fieldName: keyof ResetPasswordFormData) => {
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
    if (errors.root) {
      clearErrors("root");
    }
  };

  // For demo purposes - track if we should show success
  const [showSuccess, setShowSuccess] = useState(false);
  const email = watch("email");

  // Handle form submission (demo version)
  const handleDemoSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      clearErrors("root");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success state
      setShowSuccess(true);
      setIsResendDisabled(true);
      setCountdown(60);

      console.log("Reset password link sent to:", data.email);
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Failed to send reset link. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetForm = () => {
    setShowSuccess(false);
    reset();
    setIsResendDisabled(false);
    setCountdown(0);
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
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              {showSuccess
                ? "Check your email for reset instructions"
                : "Enter your email to receive a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showSuccess ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-[#D4AF37]" size={32} />
                  </div>
                </div>
                <Alert className="bg-[#1A1A1A] border-[#D4AF37]">
                  <AlertDescription className="text-gray-300 text-center">
                    We've sent a password reset link to{" "}
                    <strong className="text-white">{email}</strong>. Please
                    check your inbox and follow the instructions.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <p className="text-sm text-gray-400 text-center leading-relaxed">
                    Didn't receive the email? Check your spam folder or:
                  </p>

                  <Button
                    type="button"
                    onClick={handleResendLink}
                    disabled={isResendDisabled || isLoading}
                    className="w-full bg-[#1A1A1A] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    <RefreshCw
                      className={`mr-2 ${isLoading ? "animate-spin" : ""}`}
                      size={16}
                    />
                    {isLoading
                      ? "Sending..."
                      : isResendDisabled
                      ? `Resend available in ${formatCountdown(countdown)}`
                      : "Resend Reset Link"}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleResetForm}
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white hover:bg-gray-900"
                  >
                    Reset with a different email
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(handleDemoSubmit)}
                className="space-y-4"
              >
                {errors.root && (
                  <Alert
                    variant="destructive"
                    className="bg-red-950/50 border-red-900 text-red-200"
                  >
                    <AlertDescription>{errors.root.message}</AlertDescription>
                  </Alert>
                )}

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

                <Button
                  type="submit"
                  className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Link href="/login" className="w-full">
              <Button
                variant="ghost"
                className="w-full text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ResetPassword;
