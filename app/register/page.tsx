"use client";

import { CustomButton, SectionTitle } from "@/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmpassword") || ""
    );

    setError("");

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be 8 characters long");
      toast.error("Password must be 8 characters long");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords are not equal");
      toast.error("Passwords are not equal");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful");
        router.push("/login");
        return;
      }

      if (data.details && Array.isArray(data.details)) {
        const errorMessage = data.details
          .map((err: any) => err.message)
          .join(", ");

        setError(errorMessage);
        toast.error(errorMessage);
      } else if (data.error) {
        setError(data.error);
        toast.error(data.error);
      } else {
        setError("Registration failed");
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
      setError("Error, try again");
      toast.error("Error, try again");
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

      <div className="mx-auto flex max-w-screen-2xl justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Register
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign up to continue exploring Singitronic.
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Name + Lastname */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    First name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    required
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
                    placeholder="John"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastname"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Last name
                  </label>

                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    autoComplete="family-name"
                    required
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
                    placeholder="Doe"
                  />
                </div>
              </div>

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
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
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
                  placeholder="At least 8 characters"
                />
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirm password
                </label>

                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  autoComplete="new-password"
                  required
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
                  placeholder="Repeat your password"
                />
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  required
                  className="
                    mt-0.5
                    h-4
                    w-4
                    rounded
                    border-slate-300
                    text-brand
                    accent-[rgb(var(--brand-color))]
                    focus:ring-brand/20
                  "
                />

                <span className="text-xs leading-5 text-slate-500">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-slate-700 transition hover:text-brand"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-slate-700 transition hover:text-brand"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-100 bg-red-50 px-3.5 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div>
                <CustomButton
                  buttonType="submit"
                  text="Create account"
                  paddingX={3}
                  paddingY={2.5}
                  customWidth="full"
                  textSize="sm"
                />
              </div>
            </form>

            {/* Login */}
            <div className="mt-6 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-brand transition hover:text-brand/80"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
