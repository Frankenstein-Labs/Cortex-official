import { ExternalLink } from "lucide-react";
import { createHmac } from "crypto";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

function createSsoToken(user: { id: string; email?: string; name?: string }) {
  const secret = process.env.AI_MANUS_SSO_SECRET;
  if (!secret) return null;

  const payload = Buffer.from(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      fullname: user.name || user.email?.split("@")[0] || "PearAI User",
      exp: Math.floor(Date.now() / 1000) + 60,
    }),
  ).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export const metadata = {
  title: "Cortex Dev | Espace de développement",
  description: "L’espace de développement assisté par IA Cortex Dev.",
};

export default async function AiManusPage() {
  // The AI workspace is private: the PearAI auth session is the front door.
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin?next=/ai-manus");

  const token = createSsoToken({
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name,
  });
  const baseUrl =
    process.env.NEXT_PUBLIC_AI_MANUS_APP_URL ?? "http://localhost:5173";
  const aiManusUrl = token
    ? `${baseUrl}/login?sso=${encodeURIComponent(token)}`
    : `${baseUrl}/login?redirect=/`;

  return (
    <main className="text-white min-h-screen bg-[#101010] pt-[60px]">
      <div className="flex h-[calc(100vh-60px)] min-h-[680px] flex-col">
        <div className="border-white/10 flex items-center justify-between border-b bg-[#161616] px-4 py-2 text-sm">
          <div>
            <span className="font-medium">Cortex Dev</span>
            <span className="text-white/50 ml-2">Espace de développement</span>
          </div>
          <a
            href={aiManusUrl}
            target="_blank"
            rel="noreferrer"
            className="text-white/70 hover:bg-white/10 hover:text-white inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition"
          >
            Ouvrir séparément
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <iframe
          title="Cortex Dev"
          src={aiManusUrl}
          className="bg-white min-h-0 flex-1 border-0"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      </div>
    </main>
  );
}
