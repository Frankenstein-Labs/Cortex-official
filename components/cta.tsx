import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="text-white relative overflow-hidden bg-slate-950 px-5 py-20 sm:px-8 lg:py-28">
      <div className="pointer-events-none absolute -right-32 -top-48 h-[520px] w-[520px] rounded-full bg-violet-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-56 -left-28 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Make your next step with Cortex.
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Bring a project question into one workspace and keep the work moving
          with context and review.
        </p>
        <Link
          href="/workspace"
          className="bg-white mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
        >
          Continue to Cortex <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
