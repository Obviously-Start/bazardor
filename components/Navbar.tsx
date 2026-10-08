"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/lib/types";
import { getTodayDate } from "@/lib/bn";

type NavbarProps = {
  categories: Category[];
};

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-base-100/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">

        {/* Top Navbar */}
        <div className="flex min-h-20 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="text-xl font-bold sm:text-2xl">
              🛒 বাজার দর
            </div>

            <div className="mt-1 text-xs text-base-content/60">
              {getTodayDate()}
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="btn btn-sm btn-outline"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="btn btn-sm btn-primary"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          <Link
            href="/"
            className={`btn btn-sm whitespace-nowrap ${
              pathname === "/"
                ? "btn-primary"
                : "btn-ghost"
            }`}
          >
            🏠 সব পণ্য
          </Link>

          {categories.map((category) => {
            const active =
              pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`btn btn-sm whitespace-nowrap ${
                  active
                    ? "btn-primary"
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