import { HomeIcon, BookIcon, ExamIcon, CalculatorIcon, FormulaIcon } from "./icons";

export type Tab = "dashboard" | "courses" | "exam" | "calculator" | "formulas";

const tabs: { id: Tab; label: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: "dashboard", label: "پیشخوان", Icon: HomeIcon },
  { id: "courses", label: "دوره‌ها", Icon: BookIcon },
  { id: "exam", label: "آزمون", Icon: ExamIcon },
  { id: "calculator", label: "ماشین‌حساب", Icon: CalculatorIcon },
  { id: "formulas", label: "فرمول‌نامه", Icon: FormulaIcon },
];

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-bg-hover bg-bg-card/95 backdrop-blur-lg safe-bottom">
      <div className="mx-auto flex max-w-2xl items-stretch justify-around px-1 py-1.5">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 transition-all duration-200 ${
                isActive
                  ? "text-emerald-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
                  isActive ? "bg-emerald-500/15 scale-110" : "scale-100"
                }`}
              >
                <Icon size={22} />
              </span>
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
