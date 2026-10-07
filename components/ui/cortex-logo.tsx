import Image from "next/image";

type CortexLogoProps = {
  className?: string;
  size?: number;
  tone?: "dark" | "light";
};

export function CortexMark({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/icons/cortex-mark.svg"
      alt=""
      aria-hidden="true"
      width={Math.round((size * 186) / 174)}
      height={size}
      className="shrink-0"
    />
  );
}

export default function CortexLogo({
  className = "",
  size = 28,
  tone = "dark",
}: CortexLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <CortexMark size={size} />
      <span
        className={`font-semibold tracking-tight ${tone === "light" ? "text-white" : "dark:text-white text-slate-950"}`}
      >
        Cortex
      </span>
    </span>
  );
}
