import { Modal } from "./Modal";
import { CheckIcon, CrownIcon } from "./icons";
import { useApp } from "../context/AppContext";
import { useState } from "react";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const { togglePremium } = useApp();
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");

  const features = [
    "دسترسی نامحدود به همه دروس CFA و CAIA",
    "آزمون‌های شبیه‌سازی شده نامحدود با توضیحات کامل",
    "معلم هوشمند مالی (AI Tutor) در همه دروس",
    "به‌روزرسانی دوره‌های جدید به‌صرفه رایگان",
    "بانک فرمول‌های پیشرفته و مثال‌های عددی",
  ];

  const handleUpgrade = () => {
    togglePremium();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        <div className="mb-1 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-xl shadow-gold-500/30 animate-scale-in">
            <CrownIcon size={32} className="text-bg-base" />
          </div>
        </div>
        <h2 className="text-center text-xl font-extrabold text-white mt-4">
          ارتقا به کوانت‌فین پلاس
        </h2>
        <p className="text-center text-sm text-gray-400 mt-1.5 leading-relaxed">
          دسترسی کامل به تمام دوره‌ها، آزمون‌ها و امکانات حرفه‌ای
        </p>

        <div className="mt-5 space-y-2.5">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckIcon size={14} />
              </span>
              <span className="text-sm text-gray-300">{f}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => setPlan("monthly")}
            className={`relative rounded-2xl border-2 p-4 text-center transition-all duration-200 ${
              plan === "monthly"
                ? "border-gold-500 bg-gold-500/10"
                : "border-bg-hover bg-bg-elevated"
            }`}
          >
            <p className="text-xs text-gray-400 mb-1">ماهانه</p>
            <p className="text-2xl font-extrabold text-white">
              ۱۹۰<span className="text-sm font-medium text-gray-400"> تومان</span>
            </p>
            <p className="text-[10px] text-gray-500 mt-1">هر ماه</p>
          </button>

          <button
            onClick={() => setPlan("annual")}
            className={`relative rounded-2xl border-2 p-4 text-center transition-all duration-200 ${
              plan === "annual"
                ? "border-gold-500 bg-gold-500/10"
                : "border-bg-hover bg-bg-elevated"
            }`}
          >
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-bg-base">
              ۲ ماه رایگان
            </span>
            <p className="text-xs text-gray-400 mb-1">سالانه</p>
            <p className="text-2xl font-extrabold text-white">
              ۱٬۹۰۰<span className="text-sm font-medium text-gray-400"> تومان</span>
            </p>
            <p className="text-[10px] text-gray-500 mt-1">~۱۵۸ تومان/ماه</p>
          </button>
        </div>

        <button
          onClick={handleUpgrade}
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 py-3.5 text-base font-extrabold text-bg-base shadow-lg shadow-gold-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          فعال‌سازی اشتراک طلایی
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full rounded-2xl py-2.5 text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors"
        >
          بعداً تصمیم می‌گیرم
        </button>
      </div>
    </Modal>
  );
}
