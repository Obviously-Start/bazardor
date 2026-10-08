import { Product } from "@/lib/types";

type TickerProps = {
  products: Product[];
};

export default function Ticker({
  products,
}: TickerProps) {
  const tickerProducts = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-base-300 bg-base-100">
      <div className="animate-[ticker_25s_linear_infinite] flex w-max gap-8 px-4 py-2">
        {tickerProducts.map((product, index) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex items-center gap-2 whitespace-nowrap text-[10px]"
            >
              <span>{product.image}</span>

              <span className="font-semibold">
                {product.nameBn}
              </span>

              <span className="text-base-content/60">
                {product.today} টাকা/{product.unit}
              </span>

              <span
                className={
                  isUp
                    ? "text-error"
                    : isDown
                    ? "text-success"
                    : "text-base-content/50"
                }
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {product.change.pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}