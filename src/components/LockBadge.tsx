import { LockIcon } from "./icons";
import { useApp } from "../context/AppContext";

export function LockBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  const { isPremium } = useApp();
  if (isPremium) return null;

  const sizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
  };

  return (
    <span
      className={`inline-flex ${sizes[size]} items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-bg-base shadow-lg shadow-gold-500/20`}
    >
      <LockIcon size={size === "sm" ? 11 : 14} />
    </span>
  );
}

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-2 py-0.5 text-[10px] font-bold text-bg-base">
      PLUS
    </span>
  );
}
