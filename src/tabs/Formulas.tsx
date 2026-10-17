import { useState, useMemo } from "react";
import { formulas } from "../data/formulas";
import { MathBlock } from "../components/Math";
import { SearchIcon } from "../components/icons";

export function Formulas() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const categories = useMemo(() => {
    const cats = new Set(formulas.map((f) => f.category));
    return ["ALL", ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return formulas.filter((f) => {
      const matchCat = category === "ALL" || f.category === category;
      const matchSearch =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.nameEn.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold text-white">فرمول‌نامه</h2>
        <p className="text-sm text-gray-500 mt-0.5">مرجع جستجوپذیر فرمول‌های مالی</p>
      </div>

      <div className="relative">
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          <SearchIcon size={20} />
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی فرمول... (مثلاً Sharpe، CAPM، PV)"
          className="w-full rounded-xl border border-bg-hover bg-bg-card py-3 pr-12 pl-4 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              category === cat
                ? "bg-emerald-500 text-bg-base"
                : "bg-bg-card text-gray-400 border border-bg-hover/50 hover:text-white"
            }`}
          >
            {cat === "ALL" ? "همه" : cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">فرمولی یافت نشد</p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((f) => {
          const isOpen = expanded.has(f.id);
          return (
            <div
              key={f.id}
              className="rounded-2xl bg-bg-card border border-bg-hover/50 overflow-hidden"
            >
              <button
                onClick={() => toggle(f.id)}
                className="flex w-full items-center justify-between p-4 text-right"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white">{f.name}</h3>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                      {f.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500" dir="ltr">{f.nameEn}</p>
                </div>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-bg-elevated text-gray-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              <div className="px-4 pb-3">
                <MathBlock>{f.latex}</MathBlock>
              </div>

              {isOpen && (
                <div className="border-t border-bg-hover/50 px-4 py-3 animate-slide-down space-y-3">
                  <p className="text-sm leading-6 text-gray-300">{f.description}</p>
                  {f.variables.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-emerald-400 mb-2">متغیرها</p>
                      <div className="space-y-1.5">
                        {f.variables.map((v, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="font-mono text-gold-400" dir="ltr">{v.symbol}</span>
                            <span className="text-gray-400">{v.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-gray-600 pt-2">
        {formulas.length} فرمول · کاملاً رایگان
      </p>
    </div>
  );
}
