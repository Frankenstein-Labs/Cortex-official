import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Cortex Workspace",
  description: "Open the Cortex AI workspace.",
  canonical: "/workspace",
});

export default function Dashboard() {
  redirect("/workspace");
}
