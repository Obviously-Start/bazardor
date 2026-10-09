import Link from "next/link";

import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-base-300 bg-base-100 p-3 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-base-200 text-2xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold">
            {product.nameBn}
          </h3>

          <p className="text-[10px] text-base-content/55">
            প্রতি {product.unit}
          </p>
        </div>

      </div>

      
      <div className="mt-3 flex items-end justify-between">

        <div>
          <p className="text-[10px] text-base-content/50">
            আজকের দাম
          </p>

          <p className="text-base font-bold">
            {product.today} টাকা
          </p>
        </div>

       
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
            isUp
              ? "bg-error/10 text-error"
              : isDown
              ? "bg-success/10 text-success"
              : "bg-base-200 text-base-content/60"
          }`}
        >
          {isUp && "▲ "}
          {isDown && "▼ "}
          {product.change.pct}%
        </span>

      </div>
    </Link>
  );
}