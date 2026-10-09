import { notFound } from "next/navigation";

import CategoryProducts from "@/components/CategoryProducts";

import { getCategories, getProducts } from "@/lib/api";
import { Category, Product } from "@/lib/types";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const category = categories.find(
    (item: Category) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product: Product) =>
      product.category === category.slug
  );

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-5">
      <div className="mx-auto max-w-4xl">

        {/* Category Header */}
        <section className="rounded-xl border border-base-300 bg-base-100 px-4 py-4">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f1] text-2xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-xl font-bold leading-none">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-[10px] text-base-content/55">
                {categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>

          </div>
        </section>

       
        <section className="mt-4">
          <CategoryProducts
            products={categoryProducts}
          />
        </section>

      </div>
    </main>
  );
}