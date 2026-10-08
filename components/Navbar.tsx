"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Category } from "@/lib/types";

type NavbarProps = {
  categories: Category[];
};

export default function Navbar({
  categories,
}: NavbarProps) {
  const pathname = usePathname();

  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date();

    const formattedDate = date.toLocaleDateString(
      "bn-BD",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    setToday(formattedDate);
  }, []);

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto max-w-6xl px-4">

        {/* Top Navbar */}
        <div className="flex min-h-16 items-center justify-between">

          {/* Logo + Date */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success text-lg">
              🛒
            </div>

            <div>
              <h1 className="text-base font-bold">
                বাজার দর
              </h1>

              <p className="text-[9px] text-base-content/50">
                {today || "আজকের বাজার দর"}
              </p>
            </div>
          </Link>

          {/* Auth */}
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="btn btn-ghost btn-xs hidden sm:flex"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="btn btn-success btn-xs"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Categories */}
        <nav className="flex gap-1 overflow-x-auto pb-2">

          <Link
            href="/"
            className={`btn btn-xs whitespace-nowrap ${
              pathname === "/"
                ? "btn-success"
                : "btn-ghost"
            }`}
          >
            🏠 সব
          </Link>

          {categories.map((category) => {
            const active =
              pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`btn btn-xs whitespace-nowrap ${
                  active
                    ? "btn-success"
                    : "btn-ghost"
                }`}
              >
                {category.icon} {category.nameBn}
              </Link>
            );
          })}

        </nav>
      </div>
    </header>
  );
}