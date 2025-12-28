"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/authSlice";
import { supabase } from "@/supabase-client";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      dispatch(setUser(session?.user || null));

      // If user is logged in and on auth pages, redirect to dashboard
      if (
        session?.user &&
        (pathname === "/login" ||
          pathname === "/signup" ||
          pathname === "/reset-password" ||
          pathname === "/verify-email")
      ) {
        router.push("/dashboard");
      }

      // If user is NOT logged in and on dashboard, redirect to home
      if (!session && pathname?.startsWith("/dashboard")) {
        router.push("/");
      }
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      dispatch(setUser(session?.user || null));

      // Handle redirects
      if (
        session?.user &&
        (pathname === "/login" ||
          pathname === "/signup" ||
          pathname === "/reset-password" ||
          pathname === "/verify-email")
      ) {
        router.push("/dashboard");
      }

      if (!session && pathname?.startsWith("/dashboard")) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch, router, pathname]);

  return <>{children}</>;
}
