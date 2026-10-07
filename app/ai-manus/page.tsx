import { redirect } from "next/navigation";

export const metadata = {
  title: "Cortex Workspace",
  description: "Open the Cortex workspace.",
};

export default function LegacyWorkspaceRoute() {
  redirect("/workspace");
}
