import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CortexLogo from "./ui/cortex-logo";
import AuthButton from "./ui/authbutton";
import MobileMenu from "./ui/mobile-menu";
import DownloadButton from "./ui/downloadbutton";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleSignOut = async () => {
    "use server";
    const client = createClient();
    await client.auth.signOut();
    redirect("/");
  };

  return (
    <header className="bg-white/95 fixed left-0 right-0 top-0 z-50 border-b border-slate-200 p-2 backdrop-blur">
      <nav
        className="mx-auto flex max-w-[1120px] items-center justify-between px-2"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center" aria-label="Cortex home">
          <CortexLogo size={28} />
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/about" className="transition hover:text-slate-950">
            About
          </Link>
          <Link href="/pricing" className="transition hover:text-slate-950">
            Pricing
          </Link>
          <Link
            href="https://github.com/Frankenstein-Labs/Cortex-official/tree/main/cortex-platform/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-slate-950"
          >
            Documentation
          </Link>
          <Link
            href="https://github.com/Frankenstein-Labs/Cortex-official"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-slate-950"
          >
            GitHub
          </Link>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <AuthButton user={user} handleSignOut={handleSignOut} />
          <DownloadButton user={user} />
        </div>
        <div className="lg:hidden">
          <MobileMenu user={user} handleSignOut={handleSignOut} />
        </div>
      </nav>
    </header>
  );
}
