"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const galleryItems = [
  {
    src: "/AM_gallery/PXL_20251117_224800404.mp4",
    caption: "Finished demo",
    type: "video",
    orientation: "portrait",
  },
] as const;

export default function AMRadioProjectPage() {
  const sections = ["story", "design", "results", "gallery"] as const;
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]>("story");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const galleryRef = useRef<HTMLDivElement>(null);

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

  const scrollGallery = (direction: -1 | 1) => {
    const gallery = galleryRef.current;
    const item = gallery?.querySelector<HTMLElement>("figure");
    if (!gallery || !item) return;

    const gap = Number.parseFloat(window.getComputedStyle(gallery).columnGap) || 0;
    gallery.scrollBy({
      left: direction * (item.offsetWidth + gap),
      behavior: "smooth",
    });
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

        <div className="min-w-0 flex-1">

          <h1 className="text-5xl font-bold">AM Superheterodyne Radio Receiver</h1>

          <p className="mt-4 max-w-3xl text-xl text-neutral-600">
            An analog superheterodyne receiver designed to tune, demodulate, and play commercial AM broadcasts.
          </p>

          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-300">
            <img
              src="/Radio.png"
              alt="AM superheterodyne radio receiver"
              className="h-full w-full object-cover"
            />
          </div>

          <section id="story" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Story</h2>

            <div className="max-w-4xl space-y-5 text-lg leading-8 text-neutral-700">
              <p>
                This project connected analog circuit design, signal processing,
                and communication systems in a complete AM radio receiver.
              </p>

              <p>
                The signal path combined a frequency mixer, intermediate-frequency
                filter, envelope detector, and operational-amplifier stages. I
                designed, measured, and debugged these circuits before integrating
                them with the RF front-end.
              </p>

              <p>
                The finished receiver converted a selected broadcast to a fixed
                intermediate frequency, filtered it, recovered the audio signal,
                and amplified it for playback through a speaker.
              </p>
            </div>
          </section>

          <section id="design" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Design</h2>

            <div className="max-w-4xl space-y-8 text-lg leading-8 text-neutral-700">
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Envelope Detection
                </h3>

                <p>
                  An RC envelope detector with a germanium diode recovered the
                  low-frequency message from the AM carrier. Its time constant
                  balanced carrier-ripple suppression against the response speed
                  needed to follow the audio signal.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Audio Amplification
                </h3>

                <p>
                  Multiple 741 operational-amplifier stages buffered and amplified
                  the recovered audio before driving the speaker. I measured gain
                  and tested saturation behavior while debugging the signal path.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Intermediate Frequency Filter
                </h3>

                <p>
                  An active band-pass filter centered near the receiver&apos;s 14 kHz
                  intermediate frequency isolated the selected signal. Frequency
                  sweeps and oscilloscope FFT measurements verified its bandwidth,
                  cutoff frequencies, and out-of-band rejection.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Superheterodyne Receiver Integration
                </h3>

                <p>
                  The final receiver combined an RF front-end, local oscillator,
                  mixer, IF band-pass filter, envelope detector, and audio
                  amplifier. The mixer translated the selected AM station to the
                  fixed IF, where it could be filtered before demodulation and
                  playback.
                </p>

                <p className="mt-5">
                  Incoming AM signal → frequency mixer → intermediate frequency →
                  band-pass filter → envelope detector → audio amplifier → speaker
                </p>

                <p className="mt-5">
                  After integrating and debugging each stage, the receiver
                  successfully tuned and played commercial AM broadcasts.
                </p>
              </div>
            </div>
          </section>

          <section id="results" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Results</h2>

            <div className="max-w-4xl text-lg leading-8 text-neutral-700">
              <ul className="list-disc space-y-2 pl-6">
                <li>Built and characterized RC envelope detector circuits</li>
                <li>Designed multiple op-amp amplifier stages</li>
                <li>Designed and analyzed an active IF band-pass filter</li>
                <li>Measured frequency response using oscilloscope FFT tools</li>
                <li>Integrated the analog subsystems into a complete receiver</li>
                <li>Received and demodulated commercial AM radio stations</li>
              </ul>
            </div>
          </section>

          <section className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Skills Demonstrated</h2>

            <div className="max-w-4xl text-lg leading-8 text-neutral-700">
              <ul className="grid list-disc gap-x-10 gap-y-2 pl-6 sm:grid-cols-2">
                <li>Analog Circuit Design</li>
                <li>OP Amps</li>
                <li>RC Networks</li>
                <li>Envelope Detection</li>
                <li>Band-Pass Filters</li>
                <li>Fourier Analysis</li>
                <li>Frequency Response</li>
                <li>Oscilloscope Measurements</li>
                <li>FFT Analysis</li>
                <li>Signal Processing</li>
                <li>Amplitude Modulation</li>
                <li>Superheterodyne Receivers</li>
                <li>Communication Systems</li>
                <li>Hardware Debugging</li>
                <li>Electronic Prototyping</li>
              </ul>
            </div>
          </section>

          <section id="gallery" className="mt-16 scroll-mt-28 pb-20">
            <h2 className="mb-6 text-3xl font-semibold">Project Gallery</h2>

            <div className="relative overflow-hidden">
              <div
                ref={galleryRef}
                className="gallery-carousel flex w-full max-w-full snap-x snap-mandatory items-center gap-6 overflow-x-auto px-4 pb-4 pt-4"
              >
                {galleryItems.map((item) => (
                  <figure
                    key={item.caption}
                    className="group relative w-[82%] shrink-0 snap-start transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.04] sm:w-[calc((100%_-_1.5rem)/2)] lg:w-[calc((100%_-_3rem)/3)] motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    <div className="aspect-[9/16] overflow-hidden rounded-lg bg-neutral-300 transition-shadow duration-300 group-hover:shadow-xl motion-reduce:transition-none">
                      <video
                        src={item.src}
                        controls
                        loop
                        playsInline
                        preload="metadata"
                        onMouseEnter={(event) => {
                          void event.currentTarget.play();
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.pause();
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    </div>
                  <figcaption className="mt-2 text-sm text-neutral-600">
                      {item.caption}
                  </figcaption>
                </figure>
              ))}
              </div>

              <div className="pointer-events-none absolute bottom-4 left-0 top-4 w-3 bg-gradient-to-r from-[#F4F4F2]/70 to-transparent" />
              <div className="pointer-events-none absolute bottom-4 right-0 top-4 w-3 bg-gradient-to-l from-[#F4F4F2]/70 to-transparent" />

              <button
                type="button"
                onClick={() => scrollGallery(-1)}
                aria-label="Previous gallery item"
                className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-300 bg-[#F4F4F2]/90 text-neutral-700 shadow-sm backdrop-blur-sm transition-colors hover:border-neutral-500 hover:bg-white"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => scrollGallery(1)}
                aria-label="Next gallery item"
                className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-300 bg-[#F4F4F2]/90 text-neutral-700 shadow-sm backdrop-blur-sm transition-colors hover:border-neutral-500 hover:bg-white"
              >
                <FaChevronRight />
              </button>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
