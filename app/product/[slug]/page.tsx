
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  // Get the product slug from the URL
  const { slug } = await params;

  // Check the user's login session on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect users who are not logged in
  if (!session) {
    redirect("/signin");
  }

  // Fetch all products
  const products: Product[] = await getProducts();

  // Find the requested product
  const product = products.find((item) => item.slug === slug);

  // Show 404 if the product does not exist
  if (!product) {
    notFound();
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  // Calculate the average price for each market
  const marketPrices = product.markets.map((market) => ({
    ...market,
    average: (market.min + market.max) / 2,
  }));

  // Calculate overall lowest and highest prices
  const lowestPrice = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const highestPrice = Math.max(
    ...product.markets.map((market) => market.max)
  );

  const averagePrice =
    (lowestPrice + highestPrice) / 2;

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-3 py-5 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-5xl">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-2 text-xs text-base-content/60"
        >
          <Link href="/" className="hover:text-success">
            হোম
          </Link>

          <span aria-hidden="true">›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-success"
          >
            {product.categoryNameBn}
          </Link>

          <span aria-hidden="true">›</span>

          <span className="text-base-content/80">
            {product.nameBn}
          </span>
        </nav>


        <section className="rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3 sm:gap-5">


            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f1] text-2xl sm:h-16 sm:w-16 sm:text-3xl">
                {product.image}
              </div>

              <div className="min-w-0">
                <h1 className="break-words text-lg font-bold sm:text-2xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
                  প্রতি {product.unit} · {product.categoryNameBn}
                </p>

                <p className="mt-2 text-xs text-base-content/60">
                  বাজারভেদে সর্বশেষ দাম ও মূল্য পরিবর্তনের তথ্য
                </p>
              </div>
            </div>

            <div className="hidden shrink-0 rounded-xl bg-[#f1f6f1] px-5 py-4 text-center sm:block">
              <p className="text-xs text-base-content/60">
                আজকের দাম
              </p>

              <p className="mt-1 text-2xl font-bold">
                {product.today}
              </p>

              <p className="text-xs text-base-content/60">
                টাকা / {product.unit}
              </p>

              <p
                className={`mt-2 text-xs font-semibold ${
                  isUp
                    ? "text-error"
                    : isDown
                    ? "text-success"
                    : "text-base-content/60"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {product.change.pct}%
              </p>
            </div>


            <div className="shrink-0 rounded-lg bg-[#f1f6f1] px-3 py-2 text-center sm:hidden">
              <p className="text-[10px] text-base-content/60">
                আজকের দাম
              </p>

              <p className="mt-1 text-lg font-bold">
                {product.today}
              </p>

              <p className="text-[10px] text-base-content/60">
                টাকা
              </p>

              <p
                className={`mt-1 text-[10px] font-semibold ${
                  isUp
                    ? "text-error"
                    : isDown
                    ? "text-success"
                    : "text-base-content/60"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {product.change.pct}%
              </p>
            </div>
          </div>
        </section>


        <section className="mt-4 rounded-xl border border-base-300 bg-base-100 p-4 sm:p-5">
          <h2 className="mb-4 text-base font-bold">
            দামের সংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

           
            <div className="rounded-xl border border-base-300 p-4">
              <p className="text-xs text-base-content/60">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-xl font-bold text-success">
                {lowestPrice} টাকা
              </p>

              <p className="mt-1 text-xs text-base-content/60">
                সবচেয়ে কম পাওয়া বাজারদর
              </p>
            </div>

            <div className="rounded-xl border border-base-300 p-4">
              <p className="text-xs text-base-content/60">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-2 text-xl font-bold text-error">
                {highestPrice} টাকা
              </p>

              <p className="mt-1 text-xs text-base-content/60">
                সবচেয়ে বেশি পাওয়া বাজারদর
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-base-300 p-4">
              <p className="text-xs text-base-content/60">
                গড় দাম
              </p>

              <p className="mt-2 text-xl font-bold">
                {averagePrice.toFixed(2)} টাকা
              </p>

              <p className="mt-1 text-xs text-base-content/60">
                সর্বনিম্ন ও সর্বোচ্চ দামের গড়
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-base-300 bg-base-100 p-4 sm:p-5">
          <h2 className="mb-4 text-base font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {marketPrices.length === 0 ? (
            <p className="py-6 text-center text-sm text-base-content/60">
              এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-base-300">
              <table className="table table-sm w-full">
                <thead>
                  <tr className="bg-base-200/50 text-xs sm:text-sm">
                    <th>বাজার</th>
                    <th>বিভাগ</th>
                    <th>সর্বনিম্ন</th>
                    <th>সর্বোচ্চ</th>
                    <th>গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {marketPrices.map((market) => (
                    <tr key={market.market}>
                      <td className="whitespace-nowrap font-medium">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap">
                        {market.min} টাকা
                      </td>

                      <td className="whitespace-nowrap">
                        {market.max} টাকা
                      </td>

                      <td className="whitespace-nowrap font-semibold">
                        {market.average.toFixed(2)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

       
        <div className="mt-5">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium transition hover:bg-base-200"
          >
            <span aria-hidden="true">←</span>
            {product.categoryNameBn} বিভাগে ফিরে যান
          </Link>
        </div>

      </div>
    </main>
  );
}