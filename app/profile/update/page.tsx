"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Current user information
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  // Login না থাকলে signin page
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [isPending, session, router]);

  // Profile picture select
  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // File type check
    if (!file.type.startsWith("image/")) {
      setError("শুধু image file নির্বাচন করুন");
      return;
    }

    // File size check - 2MB
    if (file.size > 2 * 1024 * 1024) {
      setError(
        "ছবির সাইজ সর্বোচ্চ ২MB হতে হবে"
      );
      return;
    }

    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  // Update profile
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const newName = name.trim();

    if (!newName) {
      setError("নাম লিখুন");
      return;
    }

    setLoading(true);

    const result = await authClient.updateUser({
      name: newName,
      image: image || undefined,
    });

    setLoading(false);

    if (result.error) {
      setError(
        result.error.message ||
          result.error.code ||
          "প্রোফাইল আপডেট করা যায়নি"
      );

      return;
    }

    setSuccess(
      "প্রোফাইল সফলভাবে আপডেট হয়েছে"
    );

    setTimeout(() => {
      router.push("/profile");
      router.refresh();
    }, 800);
  }

  // Loading
  if (isPending || !session?.user) {
    return (
      <main className="min-h-screen bg-[#f2f7f3] px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="h-40 animate-pulse rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f2f7f3] px-4 py-10">

      <div className="mx-auto w-full max-w-2xl">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#17231a]">
            প্রোফাইল আপডেট
          </h1>

          <p className="mt-1 text-xs text-[#6b746d]">
            আপনার প্রোফাইলের তথ্য পরিবর্তন করুন
          </p>
        </div>

        {/* Update Card */}
        <section className="rounded-2xl border border-[#dce5de] bg-white p-5 shadow-sm sm:p-6">

          <h2 className="text-sm font-bold text-[#273129]">
            আপনার তথ্য
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            {/* Profile Picture */}
            <div>

              <label className="mb-2 block text-xs font-medium text-[#273129]">
                প্রোফাইল ছবি
              </label>

              <div className="flex items-center gap-4">

                {/* Preview */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eef3ef]">

                  {image ? (
                    <img
                      src={image}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">
                      👤
                    </span>
                  )}

                </div>

                {/* File Input */}
                <div>
                  <label
                    htmlFor="profileImage"
                    className="btn btn-outline btn-sm cursor-pointer"
                  >
                    ছবি নির্বাচন করুন
                  </label>

                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <p className="mt-2 text-[10px] text-base-content/50">
                    JPG, PNG বা WEBP · সর্বোচ্চ ২MB
                  </p>
                </div>

              </div>

            </div>

            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium text-[#273129]"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="আপনার নাম"
                className="input h-11 w-full rounded-lg border-[#dce5de] bg-white text-sm outline-none focus:border-success"
                required
              />

            </div>

          

            {success && (
              <div className="rounded-lg bg-success/10 px-3 py-2 text-xs text-success">
                {success}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-error/10 px-3 py-2 text-xs text-error">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2">

              <Link
                href="/profile"
                className="btn btn-ghost h-11 flex-1"
              >
                বাতিল
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="btn h-11 flex-1 border-0 bg-[#008f3d] text-white hover:bg-[#007b35]"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    আপডেট হচ্ছে...
                  </>
                ) : (
                  "আপডেট"
                )}
              </button>

            </div>

          </form>

        </section>

      </div>

    </main>
  );
}