export default function DemoProjectPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F2] px-6 py-16 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-5xl font-semibold text-neutral-900">
          Demo Project
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-neutral-700">
          This is where the full project writeup will go.
        </p>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">More Details</h2>

          <p className="text-neutral-600">
            Later, this page can include the problem, architecture, technical
            challenges, results, images, videos, GitHub links, and what you
            learned.
          </p>
        </div>
      </div>
    </main>
  );
}