export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-5">
      <div className="mx-auto max-w-6xl">

        {/* Category Header Skeleton */}
        <div className="rounded-xl border border-base-300 bg-base-100 p-5">
          <div className="flex items-center gap-3">

            <div className="h-12 w-12 animate-pulse rounded-xl bg-base-300" />

            <div className="space-y-2">
              <div className="h-5 w-32 animate-pulse rounded bg-base-300" />
              <div className="h-3 w-48 animate-pulse rounded bg-base-300" />
            </div>

          </div>
        </div>

        {/* Product Skeleton */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-base-300 bg-base-100 p-3"
            >
              <div className="flex items-center gap-3">

                <div className="h-10 w-10 animate-pulse rounded-lg bg-base-300" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-base-300" />
                  <div className="h-3 w-20 animate-pulse rounded bg-base-300" />
                </div>

              </div>

              <div className="mt-4 h-8 w-24 animate-pulse rounded bg-base-300" />
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}