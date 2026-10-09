
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি একই নয়");
      return;
    }

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(
          result.error.message ||
            result.error.code ||
            "অ্যাকাউন্ট তৈরি করা যায়নি"
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        setError(
          result.error.message || `${provider} Login করা যায়নি`
        );
        setSocialLoading(null);
      }
    } catch {
      setError(`${provider} Login শুরু করা যায়নি। আবার চেষ্টা করো।`);
      setSocialLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f2f7f3] px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#17231a] sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-xs text-[#6b746d] sm:text-sm">
            বিনা খরচে সাইন আপ করুন এবং পণ্যের দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#dce5de] bg-white p-6 shadow-sm sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#273129]">
                নাম
              </label>
              <input
                id="name"
                type="text"
                placeholder="যেমন: রাসেল উদ্দিন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input h-11 w-full rounded-lg border-[#dce5de] bg-white text-sm outline-none focus:border-success"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#273129]">
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input h-11 w-full rounded-lg border-[#dce5de] bg-white text-sm outline-none focus:border-success"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#273129]">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input h-11 w-full rounded-lg border-[#dce5de] bg-white text-sm outline-none focus:border-success"
                minLength={8}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#273129]">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input h-11 w-full rounded-lg border-[#dce5de] bg-white text-sm outline-none focus:border-success"
                minLength={8}
                required
              />
            </div>

            {error && (
              <div role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || socialLoading !== null}
              className="btn h-11 min-h-11 w-full rounded-lg border-0 bg-[#008f3d] text-sm font-semibold text-white hover:bg-[#007b35]"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e1e7e2]" />
            <span className="text-xs text-[#777f79]">অথবা</span>
            <div className="h-px flex-1 bg-[#e1e7e2]" />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading || socialLoading !== null}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white px-3 text-sm font-medium text-[#273129] hover:bg-[#f7faf8] disabled:opacity-60"
            >
              <FcGoogle className="text-lg" />
              {socialLoading === "google"
                ? "Google খুলছে..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading || socialLoading !== null}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white px-3 text-sm font-medium text-[#273129] hover:bg-[#f7faf8] disabled:opacity-60"
            >
              <FaGithub className="text-lg text-[#24292f]" />
              {socialLoading === "github"
                ? "GitHub খুলছে..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-[#68716b]">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-[#008f3d] hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-[#7b837d] hover:text-[#008f3d]">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}

