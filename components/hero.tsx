import Link from "next/link";
import {
  ArrowRight,
  FileCode2,
  Folder,
  MessageSquareText,
  Terminal,
} from "lucide-react";

const fileRows = [
  { name: "src", icon: Folder, nested: true },
  { name: "app.ts", icon: FileCode2, nested: false },
  { name: "README.md", icon: FileCode2, nested: false },
];

export default function Hero() {
  return (
    <section className="relative mx-auto mt-24 w-full max-w-[1240px] overflow-hidden px-5 pb-16 pt-12 sm:px-8 lg:mt-28 lg:pb-24 lg:pt-16">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-100/70 via-violet-100/70 to-cyan-100/60 blur-3xl" />
      <div className="mx-auto max-w-4xl text-center">
        <div className="bg-white/80 mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
          THE AI WORKSPACE FOR SOFTWARE
        </div>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
          Turn ideas into working software with Cortex.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
          A browser-based AI workspace for conversations, project files and
          development tools—together in one place.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/workspace"
            className="text-white inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Open Cortex workspace <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="bg-white/80 hover:bg-white inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-6 text-sm font-semibold text-slate-800 transition"
          >
            Explore the platform
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-2xl shadow-blue-950/15 ring-1 ring-black/5 sm:mt-16">
        <div className="border-white/10 flex h-12 items-center justify-between border-b bg-slate-900 px-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          </div>
          <span className="text-xs font-medium text-slate-400">
            Cortex · Workspace
          </span>
          <span className="w-12" aria-hidden="true" />
        </div>
        <div className="grid min-h-[340px] grid-cols-1 sm:grid-cols-[190px_minmax(0,1fr)]">
          <aside className="border-white/10 hidden border-r bg-slate-900/60 p-4 sm:block">
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Project
            </div>
            <div className="bg-white/5 mb-3 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-200">
              cortex-app
            </div>
            <div className="space-y-1.5">
              {fileRows.map(({ name, icon: Icon, nested }) => (
                <div
                  key={name}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-400 ${nested ? "" : "pl-5"}`}
                >
                  <Icon className="h-3.5 w-3.5" /> {name}
                </div>
              ))}
            </div>
          </aside>
          <div className="flex min-w-0 flex-col p-4 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-xs text-slate-500">
              <MessageSquareText className="h-4 w-4 text-blue-400" />
              <span>Conversation</span>
              <span className="border-white/10 ml-auto rounded-full border px-2 py-1 text-[10px]">
                Illustrative preview
              </span>
            </div>
            <div className="border-white/10 bg-white/[0.06] max-w-xl rounded-2xl rounded-tl-sm border p-4 text-left text-sm leading-6 text-slate-200">
              Help me understand this project and suggest the next
              implementation step.
            </div>
            <div className="ring-white/10 ml-auto mt-3 max-w-xl rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-500/15 to-violet-500/15 p-4 text-left text-sm leading-6 text-slate-300 ring-1">
              I’ll inspect the project context first, then outline a focused
              next step for you to review.
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <Terminal className="h-3.5 w-3.5" /> Project tools available in
                the workspace
              </div>
            </div>
            <div className="mt-auto pt-6">
              <div className="border-white/10 flex items-center gap-3 rounded-xl border bg-slate-900 px-4 py-3 text-sm text-slate-500">
                <span className="flex-1">Ask Cortex about your project…</span>
                <span className="text-white rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1.5 text-xs font-semibold">
                  Send
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">
        Illustrative interface preview.
      </p>
    </section>
  );
}
