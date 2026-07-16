import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-[#F4F4F2] px-6 py-16 text-neutral-900 lg:px-16">
      <div className="scrolling-collage-bg" />
      <div className="absolute inset-0 bg-[#F4F4F2]/55" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="rounded-full border-[8px] border-[var(--accent)] p-2 sm:border-[10px]">
          <img
            src="/profile.jpg"
            alt="Suryansh Singh"
            className="h-56 w-56 rounded-full object-cover shadow-xl sm:h-72 sm:w-72"
          />
        </div>

        <h1 className="mt-10 text-5xl font-semibold tracking-tight">Contact</h1>

        <div className="mt-8 space-y-4 text-lg text-neutral-700">
          <a
            href="mailto:suryanshsingh3002@gmail.com"
            className="flex items-center justify-center gap-3 transition hover:text-[var(--accent)]"
          >
            <FaEnvelope />
            suryanshsingh3002@gmail.com
          </a>

        </div>

        <Link
          href="/"
          className="mt-10 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
