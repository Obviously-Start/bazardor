export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">
          পেজটি পাওয়া যায়নি
        </h2>

        <p className="mt-2 text-base-content/70">
          আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
        </p>

        <a href="/" className="btn btn-primary mt-6">
          হোম পেজে ফিরে যান
        </a>
      </div>
    </main>
  );
}