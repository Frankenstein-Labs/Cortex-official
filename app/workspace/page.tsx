import { createHmac } from "crypto";
import { ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

function createSsoToken(user: { id: string; email?: string; name?: string }) {
  const secret = process.env.CORTEX_SSO_SECRET;
  if (!secret) return null;

  const payload = Buffer.from(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      fullname: user.name || user.email?.split("@")[0] || "Cortex user",
      exp: Math.floor(Date.now() / 1000) + 60,
    }),
  ).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export const metadata = {
  title: "Cortex Workspace",
  description: "Your Cortex AI workspace for software projects.",
};

export default async function WorkspacePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin?next=/workspace");

  const token = createSsoToken({
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name,
  });
  const baseUrl =
    process.env.NEXT_PUBLIC_CORTEX_STUDIO_URL ||
    (process.env.NODE_ENV === "production"
      ? "/studio"
      : "http://localhost:5173");
  const workspaceUrl = token
    ? `${baseUrl}/login?sso=${encodeURIComponent(token)}`
    : `${baseUrl}/login?redirect=/`;

  return (
    <main className="text-white min-h-screen bg-[#101010] pt-[60px]">
      <div className="flex h-[calc(100vh-60px)] min-h-[680px] flex-col">
        <div className="border-white/10 flex items-center justify-between border-b bg-[#161616] px-4 py-2 text-sm">
          <div>
            <span className="font-medium">Cortex Workspace</span>
            {!token && (
              <span className="ml-2 text-amber-300/80">
                SSO secret is not configured; use the workspace login.
              </span>
            )}
          </div>
          <a
            href={workspaceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-white/70 hover:bg-white/10 hover:text-white inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition"
          >
            Open separately
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <iframe
          title="Cortex Workspace"
          src={workspaceUrl}
          className="bg-white min-h-0 flex-1 border-0"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      </div>
    </main>
  );
}
