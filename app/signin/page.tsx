"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password,
    });

    console.log("SIGN IN RESULT:", result);

    setLoading(false);

    if (result.error) {
      console.log("SIGN IN ERROR:", result.error);

      setError(
        result.error.message ||
          result.error.code ||
          "সাইন ইন করা যায়নি"
      );

      return;
    }

    console.log("LOGIN SUCCESSFUL");

    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f2f7f3] px-4 py-10">

      <div className="mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-6 text-center">

          <h1 className="text-2xl font-bold text-[#17231a] sm:text-3xl">
            সাইন ইন
          </h1>

          <p className="mt-2 text-xs text-[#6b746d] sm:text-sm">
            বিস্তারিত দাম, বাজারের তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>

        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#dce5de] bg-white p-6 shadow-sm sm:p-7">

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#273129]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="input h-11 w-full rounded-lg border-[#dce5de] bg-white text-sm outline-none focus:border-success"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#273129]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="input h-11 w-full rounded-lg border-[#dce5de] bg-white text-sm outline-none focus:border-success"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn h-11 min-h-11 w-full rounded-lg border-0 bg-[#008f3d] text-sm font-semibold text-white hover:bg-[#007b35]"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  সাইন ইন হচ্ছে...
                </>
              ) : (
                "সাইন ইন"
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">

            <div className="h-px flex-1 bg-[#e1e7e2]" />

            <span className="text-xs text-[#777f79]">
              অথবা
            </span>

            <div className="h-px flex-1 bg-[#e1e7e2]" />

          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-2">

            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white px-2 text-xs font-medium text-[#273129] hover:bg-[#f7faf8]"
            >
              <FcGoogle className="shrink-0 text-lg" />

              <span className="whitespace-nowrap">
                Google দিয়ে চালিয়ে যান
              </span>
            </button>

            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white px-2 text-xs font-medium text-[#273129] hover:bg-[#f7faf8]"
            >
              <FaGithub className="shrink-0 text-lg text-[#24292f]" />

              <span className="whitespace-nowrap">
                GitHub দিয়ে চালিয়ে যান
              </span>
            </button>

          </div>

          {/* Sign Up */}
          <p className="mt-5 text-center text-xs text-[#68716b]">

            অ্যাকাউন্ট নেই?{" "}

            <Link
              href="/signup"
              className="font-semibold text-[#008f3d] hover:underline"
            >
              সাইন আপ করুন
            </Link>

          </p>

        </div>

        {/* Back Home */}
        <div className="mt-6 text-center">

          <Link
            href="/"
            className="text-xs text-[#7b837d] hover:text-[#008f3d]"
          >
            ← হোম পেজে ফিরে যান
          </Link>

        </div>

      </div>

    </main>
  );
}