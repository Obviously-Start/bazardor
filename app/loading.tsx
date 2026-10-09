
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl animate-pulse">
        
        <section className="grid gap-6 rounded-2xl border border-base-300 bg-base-100 p-6 sm:p-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <div className="h-4 w-36 rounded bg-base-300" />
            <div className="h-8 w-full max-w-md rounded bg-base-300" />
            <div className="h-8 w-4/5 rounded bg-base-300" />
            <div className="h-4 w-full max-w-sm rounded bg-base-300" />
            <div className="h-11 w-36 rounded-lg bg-base-300" />
          </div>

          <div className="h-40 rounded-xl bg-base-300 sm:h-52" />
        </section>

       
        <div className="mb-4 mt-8 h-6 w-44 rounded bg-base-300" />

        
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-base-300 bg-base-100 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-base-300" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-base-300" />
                  <div className="h-3 w-1/2 rounded bg-base-300" />
                </div>
              </div>

              <div className="mt-5 h-7 w-28 rounded bg-base-300" />
              <div className="mt-3 h-4 w-20 rounded bg-base-300" />
              <div className="mt-5 h-9 w-full rounded-lg bg-base-300" />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

