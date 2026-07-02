import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Navbar() {
  return (
    <nav className="w-full bg-[#42718A] text-white">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <a
          href="/"
          className={`group relative flex h-16 w-16 items-center justify-center ${inconsolata.className}`}
        >
          {/* Drawn Circle */}
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 64 64"
          >
            <circle
              cx="32"
              cy="32"
              r="29"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              className="
                [stroke-dasharray:182]
                [stroke-dashoffset:182]
                transition-[stroke-dashoffset]
                duration-500
                ease-out
                group-hover:[stroke-dashoffset:0]
              "
            />
          </svg>

          {/* Letter */}
          <span className="z-10 text-5xl font-normal leading-none">S</span>
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-lg">
          <a href="/projects" className="transition hover:text-gray-200">
            Projects
          </a>

          <a href="/resume" className="transition hover:text-gray-200">
            Resume
          </a>

          <a href="/contact" className="transition hover:text-gray-200">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}