"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });

    console.log("SIGN UP RESULT:", result);

    setLoading(false);

    if (result.error) {
      console.log("SIGN UP ERROR:", result.error);

      setError(
        result.error.message ||
          result.error.code ||
          "Account তৈরি করা যায়নি"
      );

      return;
    }

    console.log("ACCOUNT CREATED SUCCESSFULLY");

    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f8f4] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">

        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-success text-2xl">
            🛒
          </div>

          <h1 className="mt-4 text-2xl font-bold">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1 text-sm text-base-content/55">
            বাজার দর-এ যোগ দিন
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              placeholder="আপনার নাম"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="input input-bordered w-full"
              minLength={8}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-full"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Account তৈরি হচ্ছে...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Sign In */}
        <p className="mt-5 text-center text-sm text-base-content/60">
          আগে থেকেই account আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-success hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}