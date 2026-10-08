import Link from "next/link";
import { notFound } from "next/navigation";

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
  const { slug } = await params;

  const products: Product[] = await getProducts();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const marketPrices = product.markets.map((market) => ({
    ...market,
    average: (market.min + market.max) / 2,
  }));

  const lowestPrice = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const highestPrice = Math.max(
    ...product.markets.map((market) => market.max)
  );

  const averagePrice =
    (lowestPrice + highestPrice) / 2;

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-5">
      <div className="mx-auto max-w-5xl">

        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-[10px] text-base-content/55">
          <Link href="/" className="hover:text-success">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-success"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-base-content/70">
            {product.nameBn}
          </span>
        </div>

        {/* Product Header */}
        <section className="rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-4">

            {/* Product Info */}
            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f1f6f1] text-2xl">
                {product.image}
              </div>

              <div className="min-w-0">
                <h1 className="text-lg font-bold sm:text-xl">
                  {product.nameBn}
                </h1>

                <p className="mt-0.5 text-[10px] text-base-content/50">
                  প্রতি {product.unit} · {product.categoryNameBn}
                </p>

                <p className="mt-1 text-[9px] text-base-content/60">
                  বাজারভেদে সর্বশেষ বাজারদর ও মূল্য পরিবর্তনের তথ্য
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="hidden shrink-0 rounded-xl bg-[#f1f6f1] px-5 py-3 text-center sm:block">
              <p className="text-[9px] text-base-content/50">
                আজকের দাম
              </p>

              <p className="text-2xl font-bold">
                {product.today}
              </p>

              <p className="text-[9px] text-base-content/50">
                টাকা / {product.unit}
              </p>

              <p
                className={`mt-1 text-[9px] font-semibold ${
                  isUp
                    ? "text-error"
                    : isDown
                    ? "text-success"
                    : "text-base-content/50"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {product.change.pct}%
              </p>
            </div>

            {/* Mobile Today's Price */}
            <div className="shrink-0 rounded-xl bg-[#f1f6f1] px-3 py-2 text-center sm:hidden">
              <p className="text-[8px] text-base-content/50">
                আজ
              </p>

              <p className="text-xl font-bold">
                {product.today}
              </p>

              <p className="text-[8px] text-base-content/50">
                টাকা
              </p>
            </div>

          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-4 rounded-xl border border-base-300 bg-base-100 p-4">
          <h2 className="mb-3 text-sm font-bold">
            দামের সংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">

            {/* Lowest */}
            <div className="rounded-xl border border-base-300 p-3">
              <p className="text-[9px] text-base-content/50">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-lg font-bold text-success">
                {lowestPrice} টাকা
              </p>

              <p className="mt-0.5 text-[8px] text-base-content/50">
                সবচেয়ে কম পাওয়া বাজারদর
              </p>
            </div>

            {/* Highest */}
            <div className="rounded-xl border border-base-300 p-3">
              <p className="text-[9px] text-base-content/50">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-1 text-lg font-bold text-error">
                {highestPrice} টাকা
              </p>

              <p className="mt-0.5 text-[8px] text-base-content/50">
                সবচেয়ে বেশি পাওয়া বাজারদর
              </p>
            </div>

            {/* Average */}
            <div className="rounded-xl border border-base-300 p-3">
              <p className="text-[9px] text-base-content/50">
                গড় দাম
              </p>

              <p className="mt-1 text-lg font-bold">
                {averagePrice.toFixed(2)} টাকা
              </p>

              <p className="mt-0.5 text-[8px] text-base-content/50">
                প্রতি {product.unit}-এর গড় দাম
              </p>
            </div>

          </div>
        </section>

        {/* Market Price Table */}
        <section className="mt-4 rounded-xl border border-base-300 bg-base-100 p-4">

          <h2 className="mb-3 text-sm font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-hidden rounded-xl border border-base-300">
            <div className="overflow-x-auto">

              <table className="table table-sm w-full text-[10px]">

                <thead>
                  <tr className="bg-base-200/40">
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

                      <td className="font-medium">
                        {market.market}
                      </td>

                      <td>
                        {market.division}
                      </td>

                      <td>
                        {market.min} টাকা
                      </td>

                      <td>
                        {market.max} টাকা
                      </td>

                      <td className="font-semibold">
                        {market.average.toFixed(2)} টাকা
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>
        </section>

      </div>
    </main>
  );
}