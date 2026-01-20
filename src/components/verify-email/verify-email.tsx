"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailCheck, ShieldCheck, Clock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/supabase-client";
import { useState, useEffect } from "react";
import SEO from "@/components/seo";

function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const userEmail = searchParams.get("email") || "";

  // Countdown timer for resend - automatically starts
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const checkSessionAndVerification = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session check error:", error);
        return;
      }

      if (session) {
        if (session?.user?.email_confirmed_at) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Session check error:", error);
    } finally {
    }
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResendLink = async () => {
    try {
      setIsResending(true);
      setResendSuccess(false);

      if (!userEmail) {
        console.error("No email found in URL");
        return;
      }
      await checkSessionAndVerification();

      // Resend confirmation email via Supabase
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: userEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error("Resend error:", error);
        return;
      }

      setResendSuccess(true);
      setCountdown(60); // Reset to 60 seconds after successful resend
    } catch (error) {
      console.error("Resend error:", error);
    } finally {
      setIsResending(false);
    }
  };

  const handleUseDifferentEmail = () => {
    router.push("/signup");
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center gap-2 mb-8">
        <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
          <span className="text-background font-bold text-2xl">P</span>
        </div>
        <span className=" font-bold text-2xl">POS System</span>
      </Link>

      <Card className="bg-card border-primary">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <MailCheck className="text-primary" size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold  text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Check your inbox to complete registration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-dark-gray border-primary">
            <AlertDescription className="text-gray-300">
              We've sent a verification link to{" "}
              <strong className="">{userEmail}</strong>. Click the link in the
              email to activate your account and get started with your free
              trial.
            </AlertDescription>
          </Alert>

          <div className="bg-dark-gray p-4 rounded-lg border border-primary/30">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="text-primary" size={20} />
              <h4 className="font-semibold ">What's Next?</h4>
            </div>
            <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
              <li>Check your inbox (and spam folder) for our email</li>
              <li>Click the verification link in the email</li>
              <li>You'll be automatically redirected to dashboard</li>
              <li>Or return here if you need to resend</li>
            </ul>
          </div>

          <div className="space-y-4 pt-2">
            {countdown > 0 && (
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>Resend available in {formatTime(countdown)}</span>
              </div>
            )}

            <Button
              type="button"
              onClick={handleResendLink}
              disabled={isResending || countdown > 0}
              className="w-full  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending
                ? "Sending..."
                : countdown > 0
                  ? `Resend in ${formatTime(countdown)}`
                  : "Resend Verification Email"}
            </Button>

            {resendSuccess && (
              <Alert className="bg-green-950/30 border-green-800">
                <AlertDescription className="text-green-200">
                  Verification email resent successfully! You can resend again
                  in 1 minute.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-400">
            Already verified?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Sign in
            </Link>
          </div>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-gray-500">or</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleUseDifferentEmail}
            className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            Use Different Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
export default VerifyEmail;
