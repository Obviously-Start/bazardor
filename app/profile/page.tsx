"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const [signingOut, setSigningOut] = useState(false);

  
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [isPending, session, router]);

  // Sign out
  async function handleSignOut() {
    setSigningOut(true);

    await authClient.signOut();

    router.push("/");
    router.refresh();
  }

  
  if (isPending || !session?.user) {
    return (
      <main className="min-h-screen bg-[#f2f7f3] px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="h-24 animate-pulse rounded-xl bg-white" />
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-[#f2f7f3] px-4 py-8 sm:py-10">

      <div className="mx-auto w-full max-w-2xl">

      
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#17231a]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-xs text-[#6b746d]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </div>

        {/* User Information */}
        <section className="rounded-2xl border border-[#dce5de] bg-white p-4 shadow-sm sm:p-5">

          <div className="flex items-center justify-between gap-4">

            {/* Avatar + User Info */}
            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eef3ef]">

                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">
                    👤
                  </span>
                )}

              </div>

              <div className="min-w-0">

                <h2 className="truncate text-base font-bold text-[#273129]">
                  {user.name}
                </h2>

                <p className="truncate text-xs text-[#68716b]">
                  {user.email}
                </p>

              </div>

            </div>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="btn btn-error btn-outline btn-xs shrink-0"
            >
              {signingOut ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  অপেক্ষা করুন
                </>
              ) : (
                "↪ সাইন আউট"
              )}
            </button>

          </div>

        </section>

        {/* Update Section */}
        <section className="mt-5 rounded-2xl border border-[#dce5de] bg-white p-5 shadow-sm sm:p-6">

          <h2 className="text-sm font-bold text-[#273129]">
            তথ্য
          </h2>

          <div className="mt-5">

            <p className="text-xs text-[#68716b]">
             প্রোফাইল তথ্য পরিবর্তন করতে নিচের
              বাটনে ক্লিক করুন।
            </p>

            <Link
              href="/profile/update"
              className="btn mt-4 h-11 min-h-11 w-full rounded-lg border-0 bg-[#008f3d] text-sm font-semibold text-white hover:bg-[#007b35]"
            >
              প্রোফাইল আপডেট
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}