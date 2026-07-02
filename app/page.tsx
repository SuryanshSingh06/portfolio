export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F4F2]">
      {/* Landing Section */}
      <section className="relative h-[75vh] overflow-hidden">
        <div className="scrolling-collage-bg" />
        <div className="absolute inset-0 bg-[#F4F4F2]/75" />

        <div className="relative z-10 flex h-full items-center justify-between px-16">
          {/* Left Side */}
          <div className="max-w-3xl">
            <p className="mb-4 text-lg text-[#42718A]">
              Electrical & Computer Engineering @ UIUC
            </p>

            <h1 className="mb-6 text-6xl font-semibold tracking-tight text-neutral-900">
              My Project Gallery
            </h1>

            <p className="max-w-2xl text-2xl leading-relaxed text-neutral-700">
              A collection of engineering projects spanning embedded systems,
              robotics, autonomy, and software.
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

          {/* Right Side */}
<div className="group relative mr-28 flex h-[34rem] w-[34rem] items-center justify-center">
  {/* Blue Ring */}
  <div
    className="
      absolute
      h-[31.5rem]
      w-[31.5rem]
      rounded-full
      border-[10px]
      border-[#42718A]
      transition-transform
      duration-500
      ease-out
      group-hover:scale-105
      group-hover:animate-spin-slow
    "
  />

  {/* Profile Picture */}
  <img
    src="/profile.jpg"
    alt="Profile"
    className="
      relative
      h-[30rem]
      w-[30rem]
      rounded-full
      object-cover
      shadow-2xl
      transition-transform
      duration-500
      ease-out
      group-hover:scale-105
    "
  />
</div>
        </div>
      </section>

      {/* Main Content */}
      <section className="min-h-[40vh] bg-[#F4F4F2] px-16 py-16">
        <div className="max-w-6xl">
          <h2 className="text-3xl font-semibold text-neutral-900">
            Featured Projects
          </h2>
        </div>
      </section>
    </main>
  );
}