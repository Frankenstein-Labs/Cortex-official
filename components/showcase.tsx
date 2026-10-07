import Link from "next/link";
import { ArrowRight, Check, Compass, Sparkles } from "lucide-react";
import CTA from "./cta";

const steps = [
  {
    icon: Compass,
    number: "01",
    title: "Bring a real project",
    text: "Open a workspace and give Cortex the context needed to understand what you are building.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Explore the next move",
    text: "Ask questions, inspect the available project context and shape a concrete implementation plan.",
  },
  {
    icon: Check,
    number: "03",
    title: "Review and iterate",
    text: "Use the available tools, review changes and keep refining the result in the same workspace.",
  },
];

export default function Showcase() {
  return (
    <>
      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                A practical loop
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                From a question to a reviewed next step.
              </h2>
            </div>
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-blue-700"
            >
              Open the workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map(({ icon: Icon, number, title, text }) => (
              <article
                key={number}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.16em] text-slate-400">
                    {number}
                  </span>
                  <Icon className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
