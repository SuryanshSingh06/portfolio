"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaYoutube, FaArrowLeft } from "react-icons/fa";

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

          <h1 className="text-5xl font-bold">Project1025</h1>

          <p className="mt-4 max-w-3xl text-xl text-neutral-600">
            A mobile-first Pokédex tracker for building and managing a complete Pokémon card collection
          </p>

          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-300">
            <img
              src="/project1025.png"
              alt="SNES Hero"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-lg">
            <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)]"><FaGithub /> GitHub</a>
            <a
              href="https://www.youtube.com/watch?v=gv-r3pfVmvI&list=PLwctlkUeYpzV42z5lNWXDKhfRhylWN_C1&index=9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--accent)]"
            >
              <FaYoutube /> DPM&apos;s Video
            </a>
          </div>


          <section id="story" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Story</h2>

            <div className="max-w-4xl space-y-5 text-lg leading-8 text-neutral-700">
              <p>
                I grew up watching Pokémon, playing the games, and collecting
                cards, but gradually drifted away from the hobby. A trip to
                Japan inspired me to start collecting again and left me looking
                for a more purposeful way to organize the bulk cards I already
                owned.
              </p>

              <p>
                Around the same time, I discovered DeepPocketMonster&apos;s
                Pokédex Challenge: collect one card for every Pokémon. I began
                tracking my own collection in a spreadsheet, but the workflow
                broke down at card shows and local shops. Updating hundreds of
                rows on a phone was slow, and checking which Pokémon were still
                missing took too many steps.
              </p>

              <p>
                I built Project1025 as a faster, mobile-first alternative. The
                app lets me check collection progress, find missing Pokémon,
                maintain a wishlist, and select the specific card used for each
                Pokédex entry while I am actively browsing cards.
              </p>
            </div>
          </section>

          <section id="design" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Design</h2>

            <div className="max-w-4xl space-y-8 text-lg leading-8 text-neutral-700">
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Mobile Collection Workflow
                </h3>

                <p>
                  The primary use case is checking the collection while walking
                  through a convention or card shop, so the interface is designed
                  around short mobile interactions. Pokémon can be browsed by
                  region or found through a full Pokédex search, while progress
                  indicators make completed and missing entries easy to identify
                  at a glance.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Data and Persistence
                </h3>

                <p>
                  The application uses <strong>Next.js</strong>, <strong>React</strong>,
                  and <strong>TypeScript</strong>. <strong>Supabase </strong> provides
                  the PostgreSQL database used to persist collection entries,
                  selected cards, and wishlist state. The data model separates a
                  Pokémon&apos;s Pokédex entry from the specific card assigned to it,
                  allowing each entry to be updated without changing the overall
                  collection structure.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Card Search and Caching
                </h3>

                <p>
                  Card information and artwork are retrieved from the
                  <strong> Pokémon TCG API</strong>. Frequently requested results
                  are cached in Supabase so repeated searches do not depend on a
                  new external API request. This reduces latency on mobile
                  connections and keeps the browsing experience responsive while
                  limiting unnecessary API traffic.
                </p>
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                Technologies
              </h3>

              <ul className="grid list-disc gap-x-10 gap-y-2 pl-6 sm:grid-cols-2">
                <li>Next.js & React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Supabase (PostgreSQL Database)</li>
                <li>Pokémon TCG REST API</li>
                <li>API Response Caching</li>
                <li>Responsive Mobile-First UI Design</li>
                <li>Component-Based Architecture</li>
                <li>State Management with React Hooks</li>
              </ul>
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
