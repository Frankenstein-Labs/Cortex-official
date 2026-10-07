import { redirect } from "next/navigation";

// The old release history describes a predecessor product, not Cortex.
export default function LegacyChangelogRedirect(): never {
  redirect("/");
}
