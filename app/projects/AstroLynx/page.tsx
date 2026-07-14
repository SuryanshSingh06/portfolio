"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaYoutube, FaGlobe, FaArrowLeft } from "react-icons/fa";

export default function AstroLynxProjectPage() {
  const sections = ["story", "design", "challenges", "results", "gallery"] as const;
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

          <h1 className="text-5xl font-bold">AstroLynx: Wearable Safety System for Space Exploration</h1>

          <p className="mt-4 max-w-3xl text-xl text-neutral-600">
            A distributed wearable system that detects hazards, tracks astronaut movement without GPS, and coordinates teammate assistance in real time.
          </p>

          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-300">
            <img
              src="/AstroLynx.png"
              alt="AstroLynx wearable safety system"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-lg">
            <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)]"><FaGithub /> GitHub</a>
            <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)]"><FaGlobe /> Devpost</a>
            <a href="#gallery" className="flex items-center gap-2 hover:text-[var(--accent)]"><FaYoutube /> Demo Video</a>
          </div>


          <section id="story" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Story</h2>

            <div className="max-w-4xl space-y-5 text-lg leading-8 text-neutral-700">
              <p>
                AstroLynx was built during a hackathon around the challenges of
                planetary exploration. Without GPS and immediate communication
                with Earth, small environmental hazards could quickly become
                serious emergencies.
              </p>

              <p>
                Our goal was to build a wearable system that could recognize when
                an astronaut entered a dangerous state, locate the nearest safe
                teammate, and coordinate assistance between them.
              </p>

              <p>
                The concept was intentionally futuristic and playful, but the
                prototype explored practical questions in human-centered design,
                safety-critical feedback, wearable hardware, and distributed
                sensing.
              </p>
            </div>
          </section>

          <section id="design" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Design</h2>

            <div className="max-w-4xl space-y-8 text-lg leading-8 text-neutral-700">
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Distributed Wearable Architecture
                </h3>

                <p>
                  AstroLynx divided sensing and feedback across four body-mounted
                  modules. An Arduino and IMU were mounted on the chest, a camera
                  and RGB LEDs on the head, a Raspberry Pi on the back, and an
                  LCD, buzzer, and gas sensor on the wrist. Each module handled a
                  focused sensing, processing, or feedback role.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Relative Positioning
                </h3>

                <p>
                  Because GPS was assumed to be unavailable, the system estimated
                  movement from IMU heading and step detection, then maintained a
                  simplified local map of each teammate. This was a practical
                  hackathon alternative to full SLAM, not a high-accuracy
                  localization system.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Hazard Detection and Rescue Coordination
                </h3>

                <p>
                  Gas exposure, excessive motion, or camera-detected obstacles
                  could trigger a danger state. AstroLynx then selected the
                  nearest safe teammate and guided both users through visual,
                  audible, and screen-based feedback.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  User Feedback
                </h3>

                <p>
                  Green LEDs indicated a safe state, red indicated danger, and
                  blue indicated that the wearer was assisting a teammate. The
                  wrist LCD displayed status and environmental readings, while
                  the buzzer provided an immediate alert.
                </p>
              </div>
            </div>
          </section>

          <section id="challenges" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Challenges</h2>

            <div className="max-w-4xl space-y-5 text-lg leading-8 text-neutral-700">
              <p>
                Localization was the largest scope decision. Full SLAM would have
                consumed most of the hackathon, so we accepted a rough relative
                position estimate based on heading and detected steps. It was less
                accurate, but sufficient to demonstrate the assistance workflow.
              </p>

              <p>
                We also had to integrate several devices and communication paths
                while deciding where each sensor could be worn comfortably and
                still collect useful data. Reliable behavior during the live demo
                mattered more than adding another unfinished feature, so we kept
                interfaces and failure states simple.
              </p>
            </div>
          </section>

          <section id="results" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Results</h2>

            <div className="max-w-4xl text-lg leading-8 text-neutral-700">
              <ul className="list-disc space-y-2 pl-6">
                <li>Built a working multi-module wearable prototype</li>
                <li>Integrated sensing across Arduino and Raspberry Pi hardware</li>
                <li>Demonstrated relative positioning without GPS</li>
                <li>Added obstacle, gas, and motion hazard detection</li>
                <li>Implemented teammate-assistance logic</li>
                <li>Delivered real-time visual, audible, and screen feedback</li>
                <li>Completed the system within the hackathon timeframe</li>
              </ul>
            </div>
          </section>

          <section className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Skills Demonstrated</h2>

            <div className="max-w-4xl text-lg leading-8 text-neutral-700">
              <ul className="grid list-disc gap-x-10 gap-y-2 pl-6 sm:grid-cols-2">
                <li>Embedded C++</li>
                <li>Python</li>
                <li>Arduino</li>
                <li>Raspberry Pi</li>
                <li>IMU Integration</li>
                <li>Gas Sensing</li>
                <li>OpenCV</li>
                <li>Camera-Based Obstacle Detection</li>
                <li>LCD Interfaces</li>
                <li>Buzzer Alerts</li>
                <li>RGB LED Feedback</li>
                <li>Inter-Device Communication</li>
                <li>Wearable Prototyping</li>
                <li>Human-Centered Design</li>
                <li>Distributed Systems</li>
                <li>Rapid Prototyping</li>
              </ul>
            </div>
          </section>

          <section id="gallery" className="mt-16 scroll-mt-28 pb-20">
            <h2 className="mb-6 text-3xl font-semibold">Project Gallery</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Full AstroLynx suit",
                "Chest module",
                "Head-mounted camera and LEDs",
                "Raspberry Pi back module",
                "Wrist display",
                "Gas sensor and buzzer",
                "Team testing the system",
                "Final demo",
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
