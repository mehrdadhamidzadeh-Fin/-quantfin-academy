import { useState, useMemo } from "react";
import { CalculatorIcon } from "../components/icons";

type CalcField = "N" | "IY" | "PV" | "PMT" | "FV";
type SolveTarget = CalcField | null;

const fieldLabels: Record<CalcField, string> = {
  N: "تعداد دوره‌ها (N)",
  IY: "نرخ بهره سالانه (I/Y) %",
  PV: "ارزش فعلی (PV)",
  PMT: "پرداخت دوره‌ای (PMT)",
  FV: "ارزش آینده (FV)",
};

const fieldHints: Record<CalcField, string> = {
  N: "تعداد کل دوره‌های پرداخت",
  IY: "نرخ بهره سالانه به درصد",
  PV: "مبلغ امروز (مثبت = دریافت، منفی = پرداخت)",
  PMT: "پرداخت هر دوره (مثبت = دریافت، منفی = پرداخت)",
  FV: "مبلغ آینده (مثبت = دریافت، منفی = پرداخت)",
};

export function Calculator() {
  const [values, setValues] = useState<Record<CalcField, string>>({
    N: "",
    IY: "",
    PV: "",
    PMT: "",
    FV: "",
  });
  const [solveFor, setSolveFor] = useState<SolveTarget>("FV");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateValue = (field: CalcField, val: string) => {
    setValues((v) => ({ ...v, [field]: val }));
    setResult(null);
    setError(null);
  };

  const solve = () => {
    setError(null);
    setResult(null);

    const getNum = (f: CalcField): number | null => {
      const v = values[f].trim();
      if (v === "") return null;
      const n = parseFloat(v);
      return isNaN(n) ? null : n;
    };

    const target = solveFor;
    if (!target) return;

    const n = getNum("N");
    const iy = getNum("IY");
    const pv = getNum("PV");
    const pmt = getNum("PMT");
    const fv = getNum("FV");

    const r = iy !== null ? iy / 100 : null;

    try {
      if (target === "FV") {
        if (n === null || r === null) throw new Error("N و I/Y را وارد کنید");
        const pvVal = pv ?? 0;
        const pmtVal = pmt ?? 0;
        const fvCalc = pvVal * Math.pow(1 + r, n) + pmtVal * ((Math.pow(1 + r, n) - 1) / r);
        setResult(formatNumber(fvCalc));
      } else if (target === "PV") {
        if (n === null || r === null) throw new Error("N و I/Y را وارد کنید");
        const fvVal = fv ?? 0;
        const pmtVal = pmt ?? 0;
        const pvCalc = fvVal / Math.pow(1 + r, n) + pmtVal * ((1 - Math.pow(1 + r, -n)) / r);
        setResult(formatNumber(pvCalc));
      } else if (target === "PMT") {
        if (n === null || r === null) throw new Error("N و I/Y را وارد کنید");
        const pvVal = pv ?? 0;
        const fvVal = fv ?? 0;
        const pmtCalc = (fvVal + pvVal * Math.pow(1 + r, n)) * r / (Math.pow(1 + r, n) - 1) * -1;
        setResult(formatNumber(pmtCalc));
      } else if (target === "N") {
        if (r === null || r === 0) throw new Error("I/Y غیر از صفر وارد کنید");
        const pvVal = pv ?? 0;
        const fvVal = fv ?? 0;
        const pmtVal = pmt ?? 0;
        if (pmtVal === 0) {
          if (pvVal === 0) throw new Error("PV یا PMT را وارد کنید");
          const nCalc = Math.log(fvVal / pvVal) / Math.log(1 + r);
          setResult(nCalc.toFixed(2) + " دوره");
        } else {
          throw new Error("محاسبه N با PMT نیازمند حل عددی است");
        }
      } else if (target === "IY") {
        if (n === null) throw new Error("N را وارد کنید");
        const pvVal = pv ?? 0;
        const fvVal = fv ?? 0;
        const pmtVal = pmt ?? 0;
        const rate = solveRate(pvVal, pmtVal, fvVal, n);
        setResult((rate * 100).toFixed(4) + " %");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در محاسبه");
    }
  };

  const clearAll = () => {
    setValues({ N: "", IY: "", PV: "", PMT: "", FV: "" });
    setResult(null);
    setError(null);
  };

  const fields: CalcField[] = ["N", "IY", "PV", "PMT", "FV"];

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold text-white">ماشین‌حساب مالی</h2>
        <p className="text-sm text-gray-500 mt-0.5">ارزش زمانی پول (TVM) و اوراق قرضه</p>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 p-3">
        <p className="text-xs text-gray-400 mb-2">محاسبه چه چیزی؟</p>
        <div className="flex gap-2 flex-wrap">
          {fields.map((f) => (
            <button
              key={f}
              onClick={() => { setSolveFor(f); setResult(null); setError(null); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                solveFor === f
                  ? "bg-emerald-500 text-bg-base"
                  : "bg-bg-elevated text-gray-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {fields.map((field) => {
          const isTarget = solveFor === field;
          return (
            <div key={field}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-300">
                  {fieldLabels[field]}
                </label>
                {isTarget && (
                  <span className="text-[10px] font-bold text-emerald-400">محاسبه می‌شود</span>
                )}
              </div>
              <input
                type="number"
                inputMode="decimal"
                disabled={isTarget}
                value={isTarget ? (result ?? "") : values[field]}
                onChange={(e) => updateValue(field, e.target.value)}
                placeholder={isTarget ? "—" : fieldHints[field]}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
                  isTarget
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300 font-bold text-lg"
                    : "border-bg-hover bg-bg-card text-white placeholder-gray-600 focus:border-emerald-500/50"
                }`}
                dir="ltr"
              />
            </div>
          );
        })}
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={clearAll}
          className="flex-1 rounded-2xl bg-bg-card border border-bg-hover py-3.5 text-sm font-bold text-gray-400 transition-all hover:text-white"
        >
          پاک کردن
        </button>
        <button
          onClick={solve}
          className="flex-[2] rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 py-3.5 text-base font-extrabold text-bg-base shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          محاسبه
        </button>
      </div>

      <div className="rounded-2xl bg-bg-card border border-bg-hover/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <CalculatorIcon size={18} className="text-emerald-400" />
          <h3 className="text-sm font-bold text-white">راهنمای استفاده</h3>
        </div>
        <div className="space-y-1.5 text-xs text-gray-500 leading-6">
          <p>• مقدار ۴ متغیر را وارد کنید و پنجمین را محاسبه کنید.</p>
          <p>• PV و PMT را منفی وارد کنید اگر پرداخت می‌کنید.</p>
          <p>• نرخ I/Y به‌صورت درصدی وارد می‌شود (مثلاً ۸ برای ۸٪).</p>
          <p>• N تعداد دوره‌هاست (سال، ماه یا هر دوره دیگر).</p>
        </div>
      </div>
    </div>
  );
}

function formatNumber(n: number): string {
  if (Math.abs(n) < 0.0001 && n !== 0) return n.toExponential(4);
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

function solveRate(pv: number, pmt: number, fv: number, n: number): number {
  // Newton-Raphson or bisection for IRR
  const f = (r: number) => {
    if (r === 0) return pv + pmt * n + fv;
    return pv * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r) + fv;
  };
  let lo = -0.99;
  let hi = 10;
  let mid = 0.05;
  for (let i = 0; i < 100; i++) {
    mid = (lo + hi) / 2;
    const val = f(mid);
    if (Math.abs(val) < 1e-8) return mid;
    if (val > 0) lo = mid;
    else hi = mid;
  }
  return mid;
}
