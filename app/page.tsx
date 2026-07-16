"use client";

import { useRef } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from "react-icons/fa";

const projects = [
  {
    title: "FPGA SNES Emulator",
    href: "projects/SNES",
    image: "/SNES.gif",
    skills: ["SystemVerilog", "FPGA", "RTL", "Computer Architecture"],
    size: "md:col-span-4 md:row-span-4",
  },
  {
    title: "F1TENTH Autonomy",
    href: "projects/F1Tenth",
    image: "/f1.gif",
    skills: ["ROS", "LiDAR", "Python", "Autonomy"],
    size: "md:col-span-2 md:row-span-6",
  },
  {
    title: "Isaac Lab Training Practice",
    href: "projects/IsaacLab",
    image: "/Isaac.png",
    skills: ["Isaac Lab", "RL", "Python"],
    size: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Pokemon Tracker App",
    href: "projects/Project1025",
    image: "/project1025.png",
    imagePosition: "object-left",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    size: "md:col-span-2 md:row-span-3",
  },
  {
    title: "2024 FRC Robot Mushu",
    href: "projects/Mushu",
    image: "/mushu.gif",
    skills: ["FRC", "Robotics", "CAD", "Control Systems", "C++"],
    size: "md:col-span-2 md:row-span-4",
  },
  {
    title: "AstroLynx: Wearable Device for Space",
    href: "projects/AstroLynx",
    image: "/AstroLynx.png",
    skills: ["Embedded Systems", "IoT", "PCB Design", "Sensors", "C++"],
    size: "md:col-span-2 md:row-span-4",
  },
  {
    title: "AM Radio Station Receiver",
    href: "projects/AMRadio",
    image: "/Radio.png",
    skills: ["Circuits", "Signals", "Analog"],
    size: "md:col-span-2 md:row-span-3",
  },
  
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-[#F4F4F2]">
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="scrolling-collage-bg" />
        <div className="absolute inset-0 bg-[#F4F4F2]/55" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col items-center justify-center gap-10 px-6 py-12 lg:min-h-[65vh] lg:flex-row lg:justify-between lg:px-16">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="mb-3 text-base text-[var(--accent)] sm:text-lg">
              Electrical & Computer Engineering @ UIUC
            </p>

            <h1 className="mb-5 text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
              Suryansh Singh
            </h1>

            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-neutral-700 sm:text-2xl lg:mx-0">
              A museum of my projects
            </p>

            <div className="mt-8 flex items-center justify-center gap-5 lg:justify-start">
              <Link
                href="/resume"
                className="rounded-md bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:bg-[var(--accent-hover)]"
              >
                Resume
              </Link>

              <a
                href="https://github.com/SuryanshSingh06"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-[var(--accent)] transition hover:scale-110 hover:text-[var(--accent-hover)]"
              >
                <FaGithub size={30} />
              </a>

              <a
                href="https://www.linkedin.com/in/suryansh-singh-3b4b9927b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-[var(--accent)] transition hover:scale-110 hover:text-[var(--accent-hover)]"
              >
                <FaLinkedin size={30} />
              </a>

              <Link
                href="/contact"
                aria-label="Contact"
                className="text-[var(--accent)] transition hover:scale-110 hover:text-[var(--accent-hover)]"
              >
                <FaEnvelope size={30} />
              </Link>
            </div>
          </div>

          <div
            ref={groupRef}
            className="group relative flex h-64 w-64 shrink-0 items-center justify-center sm:h-80 sm:w-80 lg:mr-12 lg:h-[34rem] lg:w-[34rem]"
          >
            <div
              ref={ringRef}
              className="absolute z-10 h-[16.5rem] w-[16.5rem] rounded-full border-[8px] border-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-105 sm:h-[20.5rem] sm:w-[20.5rem] lg:h-[31.5rem] lg:w-[31.5rem] lg:border-[10px]"
            />

            <div className="relative z-20 h-60 w-60 sm:h-76 sm:w-76 lg:h-[30rem] lg:w-[30rem] [perspective:1200px]">
              <div className="relative h-full w-full rounded-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="absolute inset-0 h-full w-full rounded-full object-cover shadow-2xl [backface-visibility:hidden]"
                />
                <div className="absolute inset-0 flex h-full w-full rotate-y-180 flex-col items-center justify-center rounded-full bg-[var(--accent)] p-10 text-center text-white shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h2 className="text-3xl font-semibold">About Me</h2>
                  <p className="mt-4 text-base leading-7 text-white/90">
                    Hey there! I'm a Comp E at UIUC passionate about all robotics, autonomy, and embedded systems, and am always eager to learn! 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F4F2] px-6 py-14 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-4xl font-semibold text-neutral-900">
            Featured Projects
          </h2>

          <div className="grid auto-rows-[120px] grid-cols-1 gap-6 md:grid-cols-6">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className={`group col-span-1 row-span-4 flex flex-col overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${project.size}`}
              >
                <div className="min-h-0 flex-1 overflow-hidden bg-neutral-200">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${project.imagePosition ?? "object-center"}`}
                  />
                </div>

                <div className="flex shrink-0 flex-col gap-2 px-5 pt-4 pb-3">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold leading-tight text-neutral-900">
                      {project.title}
                    </h3>

                    <FaArrowRight className="shrink-0 text-[var(--accent)] transition group-hover:translate-x-1" />
                  </div>

                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-sm bg-[var(--accent)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-normal text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="group relative inline-block text-2xl font-bold tracking-tight text-black transition-transform duration-300 hover:-translate-y-1"
            >
              View All
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--accent)] px-6 py-10 text-white lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Suryansh Singh</h2>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/resume"
              className="rounded-md border border-white px-5 py-2 font-medium text-white transition hover:bg-white hover:text-[var(--accent)]"
            >
              Resume
            </Link>

            <a
              href="https://github.com/SuryanshSingh06"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-white transition hover:scale-110 hover:text-white/80"
            >
              <FaGithub size={28} />
            </a>

            <a
              href="https://www.linkedin.com/in/suryansh-singh-3b4b9927b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-white transition hover:scale-110 hover:text-white/80"
            >
              <FaLinkedin size={28} />
            </a>

            <Link
              href="/contact"
              aria-label="Contact"
              className="text-white transition hover:scale-110 hover:text-white/80"
            >
              <FaEnvelope size={28} />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
