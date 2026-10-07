import Features from "@/components/Features";
import Hero from "@/components/hero";
import Showcase from "@/components/showcase";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Cortex — AI workspace for software",
  description:
    "A browser-based AI workspace for conversations, project context and development tools.",
  canonical: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Showcase />
    </>
  );
}
