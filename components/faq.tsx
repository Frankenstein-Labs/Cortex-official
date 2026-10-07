"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FAQItem } from "@/types/faqItems";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/footer";
import CTA from "./cta";

const faqData: FAQItem[] = [
  {
    id: "what-is-cortex",
    question: "What is Cortex?",
    answer: (
      <p>
        Cortex is a browser-based AI workspace for software work. It brings an
        AI conversation, project context and the tools enabled by the deployment
        together in one place.
      </p>
    ),
  },
  {
    id: "privacy",
    question: "How is project data handled?",
    answer: (
      <p>
        Prompts, project files and generated output may be processed by the
        Cortex backend and its configured providers. Session storage and
        retention depend on the deployment and provider settings. Cortex does
        not claim that project code always stays on your device; read the{" "}
        <Link className="underline" href="/privacy">
          Privacy Policy
        </Link>{" "}
        and check the configuration of the service you use.
      </p>
    ),
  },
  {
    id: "getting-started",
    question: "How do I get started?",
    answer: (
      <p>
        Create an account or sign in, then open the{" "}
        <Link className="underline" href="/workspace">
          Cortex workspace
        </Link>{" "}
        and bring a software question or project to work on.
      </p>
    ),
  },
  {
    id: "models",
    question: "Which AI models can I use?",
    answer: (
      <p>
        Model availability depends on the provider and model configured for the
        Cortex deployment. Check with the administrator of your instance for the
        current options.
      </p>
    ),
  },
  {
    id: "contribute",
    question: "How can I contribute?",
    answer: (
      <p>
        Review the project on{" "}
        <a
          className="underline"
          href="https://github.com/Frankenstein-Labs/Cortex-official"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        and use its issue and contribution workflow.
      </p>
    ),
  },
];

const FAQComponent: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const item = faqData.find((entry) => entry.id === id);
    if (item) setOpenItem(id);
  }, []);

  return (
    <>
      <main className="w-full px-5 sm:px-8">
        <section className="mx-auto mb-16 mt-28 flex max-w-[1049px] flex-col">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Cortex help
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
              Frequently asked questions
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Find answers about the Cortex workspace, deployment and data
              handling.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-xl border border-slate-200 bg-slate-50"
            value={openItem}
            onValueChange={setOpenItem}
          >
            {faqData.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                id={item.id}
                className="px-6"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-line pb-5 text-base leading-7 text-slate-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <CTA />
      <Footer />
    </>
  );
};

export default FAQComponent;
