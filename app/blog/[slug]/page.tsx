import { redirect } from "next/navigation";

// Keep historical article sources in Git; do not expose outdated predecessor-product claims
// as current Cortex product information.
export default function LegacyBlogPostRedirect(): never {
  redirect("/");
}
