import { useApp } from "../context/AppContext";
import { CrownIcon } from "./icons";

interface HeaderProps {
  onUpgradeClick: () => void;
}

export function Header({ onUpgradeClick }: HeaderProps) {
  const { isPremium, togglePremium } = useApp();

  return (
    <header className="sticky top-0 z-30 border-b border-bg-hover/50 bg-bg-base/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
            <span className="text-base font-extrabold text-bg-base">Q</span>
          </div>
          <div>
            <h1 className="text-base font-extrabold leading-none text-white">کوانت‌فین</h1>
            <p className="text-[10px] font-medium leading-none text-gray-500 mt-0.5">QuantFin</p>
          </div>
        </div>

        <button
          onClick={togglePremium}
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-300 ${
            isPremium
              ? "border-gold-500/50 bg-gold-500/10 text-gold-400"
              : "border-bg-hover bg-bg-card text-gray-400"
          }`}
        >
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
              isPremium ? "bg-gold-500 text-bg-base" : "bg-bg-elevated text-gray-500"
            }`}
          >
            <CrownIcon size={12} />
          </span>
          <span className="text-[11px] font-bold">
            {isPremium ? "اشتراک طلایی" : "کاربر عادی"}
          </span>
        </button>
      </div>
    </header>
  );
}
