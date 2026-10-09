
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

export default function ConnectionsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("linked") === "github") {
      setMessage("GitHub account link করার প্রক্রিয়া সম্পন্ন হয়েছে।");
      window.history.replaceState({}, "", "/profile/connections");
    }
  }, []);

  async function handleLinkGitHub() {
    setLoading(true);
    setMessage("");

    try {
      const result = await authClient.linkSocial({
        provider: "github",
        callbackURL: "/profile/connections?linked=github",
      });

      if (result.error) {
        setMessage(
          result.error.message || "GitHub account link করা যায়নি।"
        );
        setLoading(false);
      }
    } catch {
      setMessage("সমস্যা হয়েছে। আবার চেষ্টা করো।");
      setLoading(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f2f7f3]">
        <span className="loading loading-spinner loading-lg text-success" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f2f7f3] px-4 py-10">
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl border border-[#dce5de] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-[#17231a]">
            Connected Accounts
          </h1>

          <p className="mt-2 text-sm text-[#6b746d]">
            তোমার BazarDor account-এর সঙ্গে GitHub যুক্ত করো।
          </p>

          <div className="mt-6 rounded-xl border border-[#dce5de] p-4">
            <div className="flex items-center gap-3">
              <FaGithub className="text-3xl text-[#24292f]" />

              <div className="flex-1">
                <h2 className="font-semibold text-[#273129]">
                  GitHub
                </h2>
                <p className="text-xs text-[#6b746d]">
                  GitHub দিয়ে ভবিষ্যতে লগইন করতে পারবে।
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLinkGitHub}
              disabled={loading}
              className="btn mt-4 h-11 w-full rounded-lg border-0 bg-[#24292f] text-white hover:bg-black disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  GitHub খুলছে...
                </>
              ) : (
                "GitHub Account Link করো"
              )}
            </button>
          </div>

          {message && (
            <p
              role="status"
              className="mt-4 rounded-lg bg-[#f2f7f3] p-3 text-sm text-[#273129]"
            >
              {message}
            </p>
          )}

          <Link
            href="/profile"
            className="mt-6 inline-block text-sm font-medium text-[#008f3d] hover:underline"
          >
            ← প্রোফাইলে ফিরে যাও
          </Link>
        </div>
      </div>
    </main>
  );
}

