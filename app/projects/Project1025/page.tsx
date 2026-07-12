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

          <h1 className="text-5xl font-bold">Project1025</h1>

          <p className="mt-4 max-w-3xl text-xl text-neutral-600">
            A simple app to track my personal pokemon collection
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
                Pokémon has been a part of my life for as long as I can remember. I grew up watching the shows,
                playing the games, and collecting cards, but over time I drifted away from the hobby. During a trip
                to Japan I decided I wanted to get back into collecting, but quickly realized that figuring out what
                to do with the huge number of bulk cards was one of the hardest parts.
              </p>

              <p>
                Around the same time I came across DeepPocketMonster's Pokédex Challenge, where the goal is to collect
                one card for every Pokémon. I loved the idea and decided to build my own complete Pokédex collection.
                I originally tracked everything in a spreadsheet, but it became frustrating to use while walking around
                card shows or local shops. Updating hundreds of entries manually was slow, and it was difficult to know
                exactly which Pokémon I still needed.
              </p>

              <p>
                Project1025 was built to solve that problem. Instead of searching through spreadsheets, I wanted a fast,
                mobile-friendly app where I could instantly see my progress, search for missing Pokémon, manage a
                wishlist, and choose the exact card that represents each Pokédex entry.
              </p>
            </div>
          </section>

          <section id="design" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Design</h2>

            <div className="max-w-4xl space-y-8 text-lg leading-8 text-neutral-700">
              <div>
                <p>
                  The app is designed around one simple goal: making it as easy as possible to track a full Pokédex
                  collection. Every Pokémon appears as a card in a regional Pokédex view, with color-coded progress,
                  quick search, expandable regions, and overall completion statistics so I always know what I'm missing.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Core Features
                </h3>

                <p>
                  Each Pokémon can be marked as collected with a simple checkbox or assigned a specific Pokémon TCG card.
                  Clicking a completed entry opens a full-size preview of the selected card, while an edit menu makes it
                  easy to swap cards, remove entries, or update ownership. Card information is cached in Supabase to keep
                  searches fast and reduce unnecessary API requests.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Scope and Priorities
                </h3>

                <p>
                  Beyond the Pokédex, the app also includes a wishlist for cards I'm searching for, progress tracking by
                  Pokémon region, search tools for quickly finding entries at card shows, and a responsive interface that
                  is being designed with an eventual Android version in mind.
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