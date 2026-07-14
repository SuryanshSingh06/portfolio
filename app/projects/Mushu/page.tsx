"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaYoutube, FaFilePdf, FaGlobe, FaArrowLeft } from "react-icons/fa";

export default function MushuProjectPage() {
  const sections = ["story", "roles","gallery"] as const;
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

          <h1 className="text-5xl font-bold">Mushu</h1>

          <p className="mt-4 max-w-3xl text-xl text-neutral-600">
            Team 1325&apos;s robot for the 2024 FIRST Robotics Competition season.
          </p>

          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-300">
            <img
              src="/mushu.gif"
              alt="Mushu, Team 3683's 2024 competition robot"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-lg">
            <a href="#gallery" className="flex items-center gap-2 hover:text-[var(--accent)]">
              <FaYoutube /> Reveal Video
            </a>
            <a href="#gallery" className="flex items-center gap-2 hover:text-[var(--accent)]">
              <FaYoutube /> Match Highlights
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)]">
              <FaFilePdf /> Engineering Notebook
            </a>
            <a
              href="https://www.thebluealliance.com/team/1325/2024"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--accent)]"
            >
              <FaGlobe /> The Blue Alliance
            </a>
          </div>


          <section id="story" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Story</h2>

            <div className="max-w-4xl space-y-5 text-lg leading-8 text-neutral-700">
              <p>
                Mushu was Team 1325&apos;s robot for the 2024 FIRST Robotics
                Competition season. It used a roller intake, elevator, and
                flywheel shooter to collect and shoot orange disks. I helped
                design, build, wire, test, and drive the robot throughout the
                build season and competition schedule.
              </p>
            </div>
          </section>

          <section id="roles" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">My Roles</h2>

            <div className="max-w-4xl text-lg leading-8 text-neutral-700">
              <ul className="grid list-disc gap-x-10 gap-y-2 pl-6 sm:grid-cols-2">
                <li>Mechanical design</li>
                <li>Mechanical assembly</li>
                <li>Electrical wiring</li>
                <li>Robot integration and testing</li>
              </ul>
            </div>
          </section>


          <section id="gallery" className="mt-16 scroll-mt-28 pb-20">
            <h2 className="mb-6 text-3xl font-semibold">Project Gallery</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Finished robot",
                "CAD render",
                "Build season",
                "Wiring",
                "Practice field",
                "Competition action shot",
                "Driver station",
                "Team photo",
              ].map((caption) => (
                <figure key={caption}>
                  <div className="aspect-video rounded-lg bg-neutral-300" />
                  <figcaption className="mt-2 text-sm text-neutral-600">
                    {caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
