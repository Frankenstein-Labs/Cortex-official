import React from "react";
import Footer from "./footer";
import CTA from "./cta";
import { Code2, FolderTree, MessagesSquare } from "lucide-react";

const principles = [
  {
    icon: MessagesSquare,
    title: "Start with the work",
    text: "Cortex is designed around a conversation grounded in the project a person is trying to move forward.",
  },
  {
    icon: FolderTree,
    title: "Keep context close",
    text: "The workspace puts conversations and project resources together so the next step is easier to inspect.",
  },
  {
    icon: Code2,
    title: "Make progress reviewable",
    text: "The goal is a practical build loop: understand, plan, use tools and review—not a black-box promise of finished software.",
  },
];

const AboutComponent: React.FC = () => (
  <>
    <main className="w-full px-5 sm:px-8">
      <section className="mx-auto mb-16 mt-28 max-w-[1120px]">
        <div className="max-w-3xl">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            About Cortex
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            A workspace for building with AI.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Cortex brings an AI conversation, project context and development
            tools into one browser-based workspace. It is built to help people
            reason about their software and take the next step with control and
            review.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <Icon className="h-6 w-6 text-violet-700" />
              <h2 className="mt-5 text-lg font-semibold text-slate-950">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
    <CTA />
    <Footer />
  </>
);

export default AboutComponent;
