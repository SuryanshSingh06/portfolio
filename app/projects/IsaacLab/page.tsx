"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaYoutube, FaBook, FaArrowLeft } from "react-icons/fa";

export default function IsaacLabProjectPage() {
  const sections = ["story", "design", "results", "technologies", "gallery"] as const;
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

          <h1 className="text-5xl font-bold">Isaac Lab Locomotion Training</h1>

          <p className="mt-4 max-w-3xl text-xl text-neutral-600">
            Training quadruped and humanoid locomotion policies with deep reinforcement learning.
          </p>

          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-300">
            <img
              src="/Isaac.png"
              alt="Legged robot locomotion training in Isaac Lab"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-lg">
            <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)]"><FaGithub /> GitHub</a>
            <a href="#gallery" className="flex items-center gap-2 hover:text-[var(--accent)]"><FaYoutube /> Videos</a>
            <a
              href="https://isaac-sim.github.io/IsaacLab/main/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--accent)]"
            >
              <FaBook /> Isaac Lab Documentation
            </a>
          </div>


          <section id="story" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Story</h2>

            <div className="max-w-4xl space-y-5 text-lg leading-8 text-neutral-700">
              <p>
                I started this project to understand how locomotion policies are
                built rather than simply running Isaac Lab examples. I focused on
                how observations, rewards, and curricula shape robot behavior.
              </p>

              <p>
                I deployed Isaac Lab on an AWS EC2 instance with an NVIDIA A10G.
                The setup required resolving driver and Vulkan issues, running
                Isaac Sim headlessly, and streaming it through WebRTC.
              </p>

              <p>
                I then trained Ant, Anymal-C, and H1 policies. Ant and H1 learned
                useful motion, while Anymal-C exposed how a policy can improve
                its reward without learning the intended gait.
              </p>

            </div>
          </section>

          <section id="design" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Design</h2>

            <div className="max-w-4xl space-y-8 text-lg leading-8 text-neutral-700">
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Infrastructure &amp; Simulation
                </h3>

                <p>
                  I ran Isaac Lab on Ubuntu using an AWS EC2 instance with an
                  NVIDIA A10G. Building a usable remote simulator required
                  matching the NVIDIA driver, fixing Vulkan initialization, and
                  separating rendering failures from training failures.
                </p>

                <p className="mt-5">
                  The final setup combined headless training, WebRTC, TensorBoard,
                  and tmux so long runs could be monitored and recovered remotely.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Reinforcement Learning Pipeline
                </h3>

                <p>
                  I used RSL-RL&apos;s PPO implementation with PyTorch to train many
                  environments in parallel. For each robot, I selected the
                  observations, joint actions, commands, and termination
                  conditions that defined its MDP.
                </p>

                <p className="mt-5">
                  A terrain curriculum increased difficulty as the policy became
                  more reliable. TensorBoard tracked individual reward terms and
                  episode statistics throughout training.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
                  Reward Engineering
                </h3>

                <p>
                  Anymal-C&apos;s reward increased from 0.02 to 3.29 and its average
                  episode length grew from 33 to 679 steps, but it learned to
                  balance instead of walking forward.
                </p>

                <p className="mt-5">
                  Stability and survival outweighed velocity tracking, making
                  standing still a useful solution. H1 began walking within a few
                  hundred iterations, reinforcing the need to judge reward curves
                  alongside the robot&apos;s actual behavior.
                </p>
              </div>

            </div>
          </section>

          <section id="results" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Results</h2>

            <div className="max-w-4xl text-lg leading-8 text-neutral-700">
              <ul className="list-disc space-y-3 pl-6">
                <li>Trained the Ant policy to produce stable locomotion.</li>
                <li>
                  Trained Anymal-C for <strong>19,000 iterations</strong>; reward
                  rose from <strong>0.02 to 3.29</strong> and episode length from
                  <strong> 33 to 679 steps</strong>, revealing a reward design that
                  favored balance over walking.
                </li>
                <li>
                  Produced walking behavior on the H1 humanoid within the first
                  few hundred iterations.
                </li>
              </ul>
            </div>
          </section>

          <section id="technologies" className="mt-16 scroll-mt-28">
            <h2 className="mb-4 text-3xl font-semibold">Technologies</h2>

            <div className="max-w-4xl text-lg leading-8 text-neutral-700">
              <ul className="grid list-disc gap-x-10 gap-y-2 pl-6 sm:grid-cols-2">
                <li>Isaac Lab</li>
                <li>Isaac Sim</li>
                <li>RSL-RL</li>
                <li>PyTorch</li>
                <li>AWS EC2</li>
                <li>Ubuntu</li>
                <li>NVIDIA Vulkan</li>
                <li>WebRTC</li>
                <li>TensorBoard</li>
                <li>Python</li>
                <li>tmux</li>
              </ul>
            </div>
          </section>

          <section id="gallery" className="mt-16 scroll-mt-28 pb-20">
            <h2 className="mb-6 text-3xl font-semibold">Project Gallery</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Anymal-C rough terrain",
                "Ant locomotion",
                "Reward curve",
                "Episode length curve",
                "H1 humanoid",
                "Isaac Sim WebRTC",
                "Training terminal",
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
