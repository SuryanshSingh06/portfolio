import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const projects = [
  {
    title: "FPGA SNES Emulator",
    href: "/projects/SNES",
    image: "/SNES.gif",
    skills: ["SystemVerilog", "FPGA", "Computer Architecture"],
  },
  {
    title: "F1TENTH Autonomy",
    href: "/projects/F1Tenth",
    image: "/f1.gif",
    skills: ["ROS", "LiDAR", "Autonomy"],
  },
  {
    title: "Isaac Lab Training Practice",
    href: "/projects/IsaacLab",
    image: "/Isaac.png",
    skills: ["Isaac Lab", "Reinforcement Learning", "Python"],
  },
  {
    title: "Pokémon Tracker App",
    href: "/projects/Project1025",
    image: "/project1025.png",
    imagePosition: "object-left",
    skills: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "2024 FRC Robot Mushu",
    href: "/projects/Mushu",
    image: "/mushu.gif",
    skills: ["Robotics", "CAD", "Systems Integration"],
  },
  {
    title: "AstroLynx Wearable",
    href: "/projects/AstroLynx",
    image: "/AstroLynx.png",
    skills: ["Embedded Systems", "Sensors", "Rapid Prototyping"],
  },
  {
    title: "AM Radio Receiver",
    href: "/projects/AMRadio",
    image: "/Radio.png",
    skills: ["Analog Circuits", "Signals", "RF"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F2] px-6 py-14 text-neutral-900 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-semibold tracking-tight">Projects</h1>
        <hr className="mt-6 border-neutral-300" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group flex aspect-square flex-col overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="min-h-0 flex-1 overflow-hidden bg-neutral-200">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${project.imagePosition ?? "object-center"}`}
                />
              </div>

              <div className="shrink-0 px-5 pb-4 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold leading-tight">
                    {project.title}
                  </h2>
                  <FaArrowRight className="shrink-0 text-[var(--accent)] transition group-hover:translate-x-1" />
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-sm bg-[var(--accent)] px-2 py-0.5 text-[10px] font-medium uppercase text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
