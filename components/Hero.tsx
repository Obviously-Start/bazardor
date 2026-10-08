import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-base-200 px-4 py-6 md:py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 px-6 py-8 shadow-sm md:px-10 md:py-10">

        {/* Left Side */}
        <div className="max-w-2xl">

          {/* Date */}
          <span className="inline-block rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-success">
            সোমবার, ৬ অক্টোবর, ২০২৬
          </span>

          {/* Heading */}
          <h1 className="mt-4 text-3xl font-bold leading-tight text-base-content md:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-6 text-base-content/60 md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারদরটি দেখুন সহজভাবে, দ্রুত এবং নির্ভরযোগ্যভাবে।
          </p>

          {/* Button */}
          <Link
            href="#সব-পণ্য"
            className="btn btn-success mt-6"
          >
            সব পণ্য দেখুন
          </Link>

        </div>

        {/* Right Side */}
        <div className="hidden shrink-0 md:block">
          <div className="flex h-48 w-56 items-end justify-center">

            {/* Fruits */}
            <div className="absolute -translate-y-16 text-6xl">
              🍎 🍊
            </div>

            {/* Basket */}
            <div className="relative">
              <div className="text-8xl">
                🧺
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}