export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-6rem)] overflow-hidden">
      <div className="scrolling-collage-bg" />

      <div className="absolute inset-0 bg-[#F4F4F2]/80" />

      <section className="relative z-10 flex min-h-[calc(100vh-6rem)] items-center px-10">
        <div className="max-w-4xl">
          <p className="mb-4 text-lg text-[#42718A]">
            Electrical & Computer Engineering @ UIUC
          </p>

          <h1 className="mb-6 text-6xl font-semibold tracking-tight text-neutral-900">
            Suryansh Singh
          </h1>

          <p className="max-w-2xl text-2xl leading-relaxed text-neutral-700">
            I build embedded systems, robotics software, autonomy projects, and
            engineering tools.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="/projects"
              className="rounded-md bg-[#42718A] px-6 py-3 text-white transition hover:bg-[#365f75]"
            >
              View Projects
            </a>

            <a
              href="/resume"
              className="rounded-md border border-[#42718A] px-6 py-3 text-[#42718A] transition hover:bg-[#42718A] hover:text-white"
            >
              Resume
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}