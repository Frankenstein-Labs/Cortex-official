import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

export default function DownloadButton({ user }: { user: User | null }) {
  return (
    <Button
      asChild
      className="text-white h-9 rounded-xl bg-slate-950 px-4 text-base font-medium hover:bg-slate-800"
    >
      <Link href={user ? "/workspace" : "/signup"}>
        {user ? "Open Cortex" : "Get started"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}
