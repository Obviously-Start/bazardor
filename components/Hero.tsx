"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
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
    <section className="px-4 py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between overflow-hidden rounded-2xl border border-base-300 bg-base-100 px-5 py-5 shadow-sm sm:px-7 md:py-6">

        <div className="max-w-2xl">

          
          <span className="inline-block rounded-full bg-success/10 px-3 py-1 text-[10px] font-semibold text-success">
            {today || "আজকের বাজার দর"}
          </span>

          
          <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

        
          <p className="mt-3 max-w-xl text-xs leading-5 text-base-content/60 sm:text-sm">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
            দাম — বাজারভিত্তিক বিভিন্ন পণ্যের আজকের
            সর্বশেষ বাজারদর এক জায়গায়।
          </p>

        
          <Link
            href="#সব-পণ্য"
            className="btn btn-success btn-sm mt-4 text-xs"
          >
            সব পণ্য দেখুন
          </Link>

        </div>

        <div className="hidden shrink-0 sm:block">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={190}
            height={160}
            priority
          />
        </div>

      </div>
    </section>
  );
}