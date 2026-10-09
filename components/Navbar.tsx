"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { authClient } from "@/lib/auth-client";
import { Category } from "@/lib/types";

type NavbarProps = {
  categories: Category[];
};

export default function Navbar({
  categories,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [today, setToday] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  // Today's date
  useEffect(() => {
    const date = new Date();

    const formattedDate =
      date.toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

    setToday(formattedDate);
  }, []);

  // Close dropdown outside click
  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Sign out
  async function handleSignOut() {
    await authClient.signOut();

    setMenuOpen(false);

    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-base-300 bg-base-100">

      <div className="mx-auto max-w-6xl px-4">

        {/* Top Navbar */}
        <div className="flex min-h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >

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

          {/* Right Side */}
          <div
            className="relative"
            ref={menuRef}
          >

            {isPending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : session?.user ? (

              /* Logged In */
              <div>

                {/* User Button */}
                <button
                  type="button"
                  onClick={() =>
                    setMenuOpen(!menuOpen)
                  }
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-base-200"
                >

                  {/* Profile Picture */}
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#eef3ef]">

                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={
                          session.user.name ||
                          "User"
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm">
                        👤
                      </span>
                    )}

                  </div>

                  {/* User Name */}
                  <span className="hidden text-xs font-medium sm:block">
                    {session.user.name}
                  </span>

                  {/* Arrow */}
                  <span
                    className={`text-[9px] transition-transform ${
                      menuOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    ▾
                  </span>

                </button>

                {/* Dropdown */}
                {menuOpen && (
                  <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-base-300 bg-white p-2 shadow-lg">

                    {/* User Info */}
                    <div className="border-b border-base-200 px-3 py-2">

                      <div className="flex items-center gap-3">

                        {/* Larger Picture */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eef3ef]">

                          {session.user.image ? (
                            <img
                              src={session.user.image}
                              alt={
                                session.user.name ||
                                "User"
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span>
                              👤
                            </span>
                          )}

                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold">
                            {session.user.name}
                          </p>

                          <p className="truncate text-[10px] text-base-content/55">
                            {session.user.email}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Profile */}
                    <Link
                      href="/profile"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-base-200"
                    >
                      <span>👤</span>

                      <span>
                        আপনার প্রোফাইল
                      </span>
                    </Link>

                    {/* Sign Out */}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-error hover:bg-error/10"
                    >
                      <span>↪</span>

                      <span>
                        সাইন আউট
                      </span>
                    </button>

                  </div>
                )}

              </div>

            ) : (

              /* Logged Out */
              <div className="flex items-center gap-2">

                <Link
                  href="/signin"
                  className="btn btn-ghost btn-xs hidden sm:flex"
                >
                 সাইন-ইন
                </Link>

                <Link
                  href="/signup"
                  className="btn btn-success btn-xs"
                >
                   সাইন আপ
                </Link>

              </div>

            )}

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
              pathname ===
              `/category/${category.slug}`;

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
                {category.icon}{" "}
                {category.nameBn}
              </Link>
            );
          })}

        </nav>

      </div>

    </header>
  );
}