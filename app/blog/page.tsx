import { redirect } from "next/navigation";

// Legacy blog content is kept in the repository archive but is no longer
// presented as current Cortex product information.
export default function LegacyBlogRedirect(): never {
  redirect("/");
}
