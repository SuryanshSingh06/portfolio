"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaGlobe, FaArrowLeft } from "react-icons/fa";

export default function F1TenthProjectPage() {
  const sections = ["story", "design", "results"] as const;
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

          <h1 className="text-5xl font-bold">Ten Tenths: F1TENTH Autonomous Vehicle</h1>

          <p className="mt-4 max-w-3xl text-xl text-neutral-600">
            A LiDAR-based autonomy stack combining an always-on wall-balance PID controller with health-gated quadratic wall fitting for safer and faster autonomous racing.
          </p>

          <div className="mt-8 flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-300">
            <img
              src="/f1.gif"
              alt="F1TENTH autonomous vehicle"
              className="h-[177.78%] w-[56.25%] rotate-90 object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-lg">
            <a
              href="https://github.com/arjunchainani/ece-484-f1tenth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--accent)]"
            >
              <FaGithub /> GitHub
            </a>

            <a
              href="https://safeautonomy-illinois-students.github.io/project-site-ten-tenths/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--accent)]"
            >
              <FaGlobe /> Project Website
            </a>
          </div>


          <section id="story" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Story</h2>

            <div className="max-w-4xl space-y-5 text-lg leading-8 text-neutral-700">
              <p>
                This project was completed for UIUC&apos;s ECE 484 autonomous
                vehicles course. Our goal was to build a LiDAR-only autonomy
                stack capable of driving an unknown closed track without relying
                on a pre-built map.
              </p>

              <p>
                We began with a reliable wall-balance PID controller that used
                the distances to the left and right walls as its primary steering
                signal. Although the baseline consistently completed laps, it did
                not always follow the true geometric centerline of the track.
              </p>

              <p>
                To improve performance without sacrificing robustness, we added
                a bounded augmentation layer based on quadratic wall fitting. The
                final system improved centerline tracking and lap time while
                preserving the original controller as an always-available safety
                fallback. Our team ultimately placed third in the class race.
              </p>
            </div>
          </section>

          <section id="design" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Design</h2>

            <div className="max-w-4xl space-y-8 text-lg leading-8 text-neutral-700">
              <figure className="overflow-hidden rounded-xl border border-neutral-200 bg-[#111827]">
                <img
                  src="/F1_gallery/ProjectArch.png"
                  alt="Architecture of the F1TENTH autonomy controller"
                  loading="lazy"
                  className="w-full object-contain"
                />
                <figcaption className="border-t border-neutral-700 px-4 py-3 text-sm leading-6 text-neutral-300">
                  Controller architecture from LiDAR sensing through the baseline
                  PID, bounded augmentation, and final actuation commands.
                </figcaption>
              </figure>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Wall-Balance PID
                </h3>

                <p>
                  The baseline controller continuously samples LiDAR windows on
                  the left and right sides of the vehicle. The difference between
                  the average wall distances drives a PID controller, while
                  forward LiDAR clearance determines the commanded speed.
                </p>

                <p className="mt-5">
                  This controller remains active at all times and acts as the
                  system&apos;s safety floor.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Quadratic Wall Fitting
                </h3>

                <p>
                  Wider LiDAR sectors are converted into point clouds and fitted
                  with quadratic wall models. The fitted wall slopes provide a
                  heading estimate, while the fitted curvature produces a
                  conservative speed cap for tighter turns.
                </p>

                <p className="mt-5">
                  Rather than replacing the PID controller, the heading estimate
                  is clipped and added as a bounded feedforward term. The
                  curvature-based command may only reduce the baseline speed,
                  never increase it.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Health-Gated Fallback
                </h3>

                <p>
                  Early versions of the fit-based controller became unstable at
                  corner entry when temporary LiDAR geometry reversed the
                  estimated wall direction. To prevent these transient estimates
                  from reaching the controller, we introduced a multi-frame health
                  window.
                </p>

                <p className="mt-5">
                  The advanced layer is trusted only after consecutive scans agree
                  on fit validity, slope direction, and stability. If those checks
                  fail, the vehicle immediately falls back to the wall-balance PID.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Bounded Combiner
                </h3>

                <p>
                  The final steering command combines the PID output with a
                  clipped heading feedforward. The final speed command is the
                  minimum of the wall-balance speed and the curvature-based cap.
                  This structure ensures that the advanced layer can improve the
                  baseline when its estimates are healthy, while its worst-case
                  behavior is identical to the original controller.
                </p>
              </div>
            </div>
          </section>

          <section id="results" className="mt-16 scroll-mt-28 pb-20">
            <h2 className="mb-4 text-3xl font-semibold">Results</h2>

            <div className="max-w-4xl space-y-5 text-lg leading-8 text-neutral-700">
              <p>
                The bounded augmentation reduced mean cross-track error by
                approximately <strong>30%</strong> and improved average lap time
                by <strong>2.7%</strong>. Both tested controllers completed their
                runs with zero collisions.
              </p>

              <p>
                The largest improvement occurred on straight sections, where the
                heading feedforward pulled the vehicle closer to the geometric
                centerline. The curvature-based speed cap remained intentionally
                conservative in tight corners.
              </p>
            </div>
          </section>


        </div>
      </div>
    </main>
  );
}
