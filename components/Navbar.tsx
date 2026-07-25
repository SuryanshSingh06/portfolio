import { Inconsolata } from "next/font/google";
import Link from "next/link";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--accent)] text-white">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className={`group relative flex h-16 w-16 items-center justify-center ${inconsolata.className}`}
        >
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

          <span className="z-10 text-5xl font-normal leading-none">S</span>
        </Link>

        <div className="flex items-center gap-8 text-lg">
          {[
            { label: "Projects", href: "/projects" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-2 transition duration-300 hover:-translate-y-0.5 hover:text-gray-200 motion-reduce:transform-none motion-reduce:transition-none"
            >
              {item.label}
              <span className="absolute bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full group-focus-visible:w-full motion-reduce:transition-none" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
