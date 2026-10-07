import {
  Code2,
  FolderTree,
  MessagesSquare,
  TerminalSquare,
} from "lucide-react";

const capabilities = [
  {
    icon: MessagesSquare,
    title: "A focused AI conversation",
    text: "Work through a coding question with an assistant that can use the project context available in the workspace.",
  },
  {
    icon: FolderTree,
    title: "Project context at hand",
    text: "Keep conversations, files and project activity together instead of switching between disconnected tools.",
  },
  {
    icon: TerminalSquare,
    title: "Tools for the next step",
    text: "Use the workspace’s available file, shell and browser tools to inspect work and move an implementation forward.",
  },
];

export default function Features() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/80 px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            One workspace
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Keep the build loop in one place.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Cortex brings an AI conversation and practical project tools into a
            single browser-based workspace.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm shadow-slate-900/[0.02]"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 text-blue-700 ring-1 ring-blue-100">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="bg-white mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 p-5 text-sm leading-6 text-slate-600">
          <Code2 className="h-5 w-5 shrink-0 text-violet-700" />
          <span>
            Model access, data retention and available tools depend on the
            deployment configuration and connected providers.
          </span>
        </div>
      </div>
    </section>
  );
}
