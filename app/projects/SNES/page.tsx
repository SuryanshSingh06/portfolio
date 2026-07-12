"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaYoutube, FaFilePdf, FaArrowLeft } from "react-icons/fa";

export default function SNESProjectPage() {
  const sections = ["story", "design", "gallery"] as const;
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]>("story");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as (typeof sections)[number];
            setActiveSection(id);
            setVisibleSections((current) => {
              const next = new Set(current);
              next.add(id);
              return next;
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: (typeof sections)[number]) => {
    const target = document.getElementById(id);
    if (!target) return;

    const start = window.scrollY;
    const headerOffset = 112;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    const distance = targetPosition - start;
    const duration = 1100;
    const startTime = performance.now();

    const easeInOutCubic = (progress: number) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * easeInOutCubic(progress));

      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <main className="min-h-screen scroll-smooth bg-[#F4F4F2] text-neutral-900">
      <div className="mx-auto flex max-w-7xl gap-12 px-6 py-12 lg:px-16">

        <aside className="sticky top-28 hidden h-fit w-56 shrink-0 lg:block">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            <FaArrowLeft />
            Back to Projects
          </Link>

          <nav className="relative border-l-2 border-neutral-300 pl-4">
            <span
              className="absolute -left-[2px] top-0 h-6 w-[3px] rounded-full bg-[var(--accent)] transition-transform duration-500 ease-out"
              style={{
                transform: `translateY(${sections.indexOf(activeSection) * 40}px)`,
              }}
            />

            <div className="flex flex-col gap-4">
              {sections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => scrollToSection(section)}
                  className={`group relative w-fit origin-left text-left capitalize transition-all duration-300 hover:translate-x-2 hover:scale-110 hover:text-black ${
                    activeSection === section
                      ? "font-semibold text-black"
                      : "text-neutral-500"
                  }`}
                >
                  {section}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-black transition-all duration-300 ${
                      activeSection === section
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>
          </nav>
        </aside>

        <div className="flex-1">

          <h1 className="text-5xl font-bold">FPGA SNES Emulator</h1>

          <p className="mt-4 max-w-3xl text-xl text-neutral-600">
            Recreating the Super Nintendo Entertainment System on an FPGA using SystemVerilog
          </p>

          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-300">
            <img
              src="/project-demo.jpg"
              alt="SNES Hero"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-lg">
            <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)]"><FaGithub /> GitHub</a>
            <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)]"><FaYoutube /> Video</a>
            <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)]"><FaFilePdf /> Report</a>
          </div>


          <section id="story" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Story</h2>

            <div className="max-w-4xl space-y-5 text-lg leading-8 text-neutral-700">
              <p>
                This project began as the final assignment for UIUC&apos;s digital
                design course: build something meaningful with the FPGA. As
                lifelong Nintendo fans, my partner and I knew early on that we
                wanted to create some kind of game system.
              </p>

              <p>
                After learning that no previous team had successfully built a
                Super Nintendo emulator on the Urbana FPGA board, the direction
                became clear. We wanted to push our FPGA and computer architecture
                skills as far as possible and attempt something that had not been
                completed in the course before.
              </p>

              <p>
                That simple goal carried us through five intensive weeks of
                architecture work, debugging, timing analysis, and rendering
                experiments.
              </p>
            </div>
          </section>

          <section id="design" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Design</h2>

            <div className="max-w-4xl space-y-8 text-lg leading-8 text-neutral-700">
              <div>
                <p>
                  The emulator was built primarily on the Urbana FPGA board, with
                  nearly every subsystem developed from the ground up. The only
                  major components adapted from the open-source SNEStang project
                  were the APU and the 65C816 CPU core.
                </p>

                <p className="mt-5">
                  We designed and integrated the following modules ourselves:
                </p>

                <ul className="mt-4 grid list-disc gap-x-10 gap-y-2 pl-6 sm:grid-cols-2">
                  <li>PPU (Picture Processing Unit)</li>
                  <li>DMA Controller</li>
                  <li>VRAM Controller</li>
                  <li>Sprite Renderer</li>
                  <li>Controller Interface</li>
                  <li>HDMI Video Output</li>
                  <li>Memory Arbitration Logic</li>
                  <li>USB Controller Support</li>
                  <li>DDR3 Support for ROMs</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Memory Constraints
                </h3>

                <p>
                  Roughly 90% of the system runs directly on the Urbana board.
                  ROMs are stored in DDR3 memory, while BRAM is used for WRAM,
                  VRAM, OAM, CGRAM, rendering buffers, and controller state.
                </p>

                <p className="mt-5">
                  During development, we exceeded the available BRAM after adding
                  the line and frame buffers required by the rendering pipeline.
                  To recover that space, we moved the controller logic onto a
                  Raspberry Pi 4, which communicates with the FPGA through GPIO
                  and jumper wires.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Rendering Pipeline
                </h3>

                <p>
                  The most difficult part of the project was fetching and
                  processing enough graphics data within the available clock
                  cycles. The FPGA&apos;s BRAM introduces a one-cycle read latency,
                  while each pixel may depend on as many as four background
                  layers, one object layer, and the color palette.
                </p>

                <p className="mt-5">
                  At native SNES timing, our first implementation could not fetch
                  all of that information quickly enough, which produced visible
                  rendering bugs. We explored several solutions, including frame
                  buffering, line buffering, pre-rendering portions of the screen,
                  and splitting the pipeline across multiple processes.
                </p>

                <p className="mt-5">
                  Because we began the project with limited experience in graphics
                  pipelines, a significant portion of the work involved studying
                  and comparing different approaches before converging on an
                  architecture that could reliably produce the expected output.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Scope and Priorities
                </h3>

                <p>
                  We chose not to recreate the CPU because the main goal was to
                  understand the rest of the console&apos;s architecture and rendering
                  behavior. Our course had already provided substantial experience
                  designing processors and instruction-set state machines, so we
                  focused our limited time on the PPU, memory system, controllers,
                  and video pipeline instead.
                </p>

                <p className="mt-5">
                  The linked report contains the complete architecture, design
                  decisions, and memory breakdown. A high-level system diagram and
                  memory usage summary will be included below.
                </p>
              </div>
            </div>
          </section>

          <section id="gallery" className="mt-16 scroll-mt-28 pb-20">
            <h2 className="mb-6 text-3xl font-semibold">Project Gallery</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="aspect-video rounded-lg bg-neutral-300" />
              <div className="aspect-video rounded-lg bg-neutral-300" />
              <div className="aspect-video rounded-lg bg-neutral-300" />
              <div className="aspect-video rounded-lg bg-neutral-300" />
              <div className="aspect-video rounded-lg bg-neutral-300" />
              <div className="aspect-video rounded-lg bg-neutral-300" />
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}