import Link from "next/link";
import { CONIC_GRADIENT } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="relative flex-1 flex flex-col items-center justify-center px-6 py-24 overflow-hidden text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full blur-[120px] opacity-30"
        style={{ background: CONIC_GRADIENT }}
      />
      <div className="relative z-10">
        <h1 className="text-8xl sm:text-9xl font-black italic tracking-tight leading-none">
          404
        </h1>
        <p className="mt-6 text-xl text-muted-fg">
          This page drifted into the gradient.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3 text-sm font-medium text-white glass border border-muted hover:border-accent hover:text-accent transition-colors squircle-element"
        >
          Back to all gradients
        </Link>
      </div>
    </main>
  );
}
