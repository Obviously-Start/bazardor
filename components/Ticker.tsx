import { Product } from "@/lib/types";
import { bnPrice, bnPercent } from "@/lib/bn";

type TickerProps = {
  products: Product[];
};

export default function Ticker({ products }: TickerProps) {
  return (
    <div className="overflow-hidden border-b bg-base-200">
      <div className="flex min-w-max gap-8 py-3">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm"
          >
            <span>{product.image}</span>

            <span className="font-semibold">
              {product.nameBn}
            </span>

            <span className="text-base-content/70">
              {bnPrice(product.today)} / {product.unit}
            </span>

            <span>
              {product.change.dir === "up" && "▲ "}
              {product.change.dir === "down" && "▼ "}
              {bnPercent(product.change.pct)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}