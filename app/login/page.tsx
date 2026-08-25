// *********************
// Role of the component: Modern login page
// Name of the component: LoginPage.tsx
// Developer: Shahwaiz Karim
// Version: 2.0
// Component call: <LoginPage />
// Input parameters: no input parameters
// Output: Minimal, modern and responsive login page
// *********************

"use client";

import { CustomButton, SectionTitle } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    const expired = searchParams.get("expired");

    if (expired === "true") {
      const message = "Your session has expired. Please log in again.";

      setError(message);
      toast.error(message);
    }

    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router, searchParams]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    setError("");

    if (!isValidEmailAddressFormat(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      toast.error("Password is invalid");
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        const message = "Invalid email or password";

        setError(message);
        toast.error(message);
        return;
      }

      setError("");
      toast.success("Successful login");
    } catch (error) {
      console.error(error);

      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* <SectionTitle title="Login" path="Home | Login" /> */}

      <div className="mx-auto flex max-w-screen-2xl justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Sign in
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to Singitronic.
            </p>
          </div>

          {/* Login card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="
                    block
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3.5
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-brand
                    focus:ring-4
                    focus:ring-brand/10
                  "
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-brand transition hover:text-brand/80"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="
                    block
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3.5
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-brand
                    focus:ring-4
                    focus:ring-brand/10
                  "
                />
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="
                    h-4
                    w-4
                    rounded
                    border-slate-300
                    text-brand
                    accent-[rgb(var(--brand-color))]
                    focus:ring-brand/20
                  "
                />

                <span className="text-sm text-slate-500">
                  Remember me
                </span>
              </label>

              {/* Submit */}
              <CustomButton
                buttonType="submit"
                text="Sign in"
                paddingX={3}
                paddingY={2.5}
                customWidth="full"
                textSize="sm"
              />

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-100 bg-red-50 px-3.5 py-3 text-center text-sm text-red-600">
                  {error}
                </div>
              )}
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs font-medium text-slate-400">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  font-medium
                  text-slate-700
                  transition
                  hover:border-slate-300
                  hover:bg-slate-50
                  focus:outline-none
                  focus:ring-4
                  focus:ring-brand/10
                "
              >
                <FcGoogle className="text-lg" />
                Google
              </button>

              {/* <button
                type="button"
                onClick={() => signIn("github")}
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-slate-900
                  px-4
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-slate-800
                  focus:outline-none
                  focus:ring-4
                  focus:ring-slate-900/10
                "
              >
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </button> */}
            </div>

            {/* Register */}
            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-brand transition hover:text-brand/80"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
