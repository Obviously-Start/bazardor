"use client";

import { useMemo, useState } from "react";

import ProductCard from "@/components/ProductCard";
import SortingDropdown from "@/components/SortDropdown";

import { Product } from "@/lib/types";

type CategoryProductsProps = {
  products: Product[];
};

type SortType = "default" | "low" | "high";

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sortType, setSortType] =
    useState<SortType>("default");

  const sortedProducts = useMemo(() => {
    const copiedProducts = [...products];

    if (sortType === "low") {
      copiedProducts.sort(
        (a, b) => a.today - b.today
      );
    }

    if (sortType === "high") {
      copiedProducts.sort(
        (a, b) => b.today - a.today
      );
    }

    return copiedProducts;
  }, [products, sortType]);

  return (
    <>
     
      <div className="rounded-xl border border-base-300 bg-base-100 px-4 py-3">
        <div className="flex justify-end">
          <SortingDropdown
            value={sortType}
            onChange={setSortType}
          />
        </div>
      </div>

      
      <p className="mt-3 text-[10px] text-base-content/60">
        মোট {products.length}টি পণ্য দেখানো হচ্ছে
      </p>

      
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}