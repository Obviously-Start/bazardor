import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

export default async function Home() {
  const products: Product[] = await getProducts();

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f3f8f4]">
    
      <Hero />

      <section className="px-4 py-5">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs text-error">▲</span>

            <h2 className="text-base font-bold">
              আজ দাম বাড়ছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {risingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-5">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs text-success">▼</span>

            <h2 className="text-base font-bold">
              আজ দাম কমছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fallingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      

      <section
        id="সব-পণ্য"
        className="px-4 py-5 pb-12"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-1 text-base font-bold">
            সব পণ্য
          </h2>

          <p className="mb-3 text-xs text-base-content/55">
            মোট {products.length}টি পণ্যের বর্তমান বাজারদর
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}