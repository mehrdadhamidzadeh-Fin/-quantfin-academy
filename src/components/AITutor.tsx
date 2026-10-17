import { useState } from "react";
import { SparklesIcon, CloseIcon, SendIcon } from "./icons";

interface AITutorProps {
  lessonTitle: string;
}

const promptChips = [
  "این فرمول را با مثال ساده توضیح بده",
  "کاربرد این مفهوم در دنیای واقع چیست؟",
  "تفاوت این با مفهوم قبلی چیست؟",
  "یک سوال آزمون از این مبحث بپرس",
];

interface ChatMessage {
  role: "user" | "tutor";
  text: string;
}

export function AITutor({ lessonTitle }: AITutorProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const sendPrompt = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    setTimeout(() => {
      const responses: Record<string, string> = {
        default: `پرسش خوبی درباره «${lessonTitle}» مطرح کردید. این مفهوم در آزمون‌های CFA و CAIA بارها مورد ارزیابی قرار می‌گیرد. پیشنهاد می‌کنم ابتدا فرمول‌های این درس را مرور کنید و سپس مثال‌های عددی را حل کنید. اگر بخش خاصی مبهم است، دقیق‌تر بپرسید.`,
      };
      const tutorMsg: ChatMessage = {
        role: "tutor",
        text: responses.default,
      };
      setMessages((m) => [...m, tutorMsg]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 left-4 z-30 flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 px-4 py-3 shadow-xl shadow-emerald-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <SparklesIcon size={20} className="text-bg-base" />
        <span className="text-xs font-bold text-bg-base">معلم هوشمند</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)}>
          <div
            className="relative flex h-[70vh] w-full max-w-md flex-col rounded-t-3xl bg-bg-card border border-bg-hover shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-bg-hover px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
                  <SparklesIcon size={18} className="text-bg-base" />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">معلم هوشمند مالی</p>
                  <p className="text-[10px] text-emerald-400">آنلاین · درباره: {lessonTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated text-gray-400 hover:text-white"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                    <SparklesIcon size={28} className="text-emerald-400" />
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    سلام! من معلم هوشمند مالی کوانت‌فین هستم. هر سؤالی درباره این درس دارید بپرسید.
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-bg-elevated text-gray-200"
                        : "bg-emerald-500/15 text-gray-100 border border-emerald-500/20"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {messages.length === 0 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {promptChips.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => sendPrompt(chip)}
                    className="rounded-full border border-bg-hover bg-bg-elevated px-3 py-1.5 text-[11px] text-gray-300 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            <div className="border-t border-bg-hover p-3 flex items-center gap-2 safe-bottom">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendPrompt(input)}
                placeholder="سؤال خود را بنویسید..."
                className="flex-1 rounded-full bg-bg-elevated px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
              <button
                onClick={() => sendPrompt(input)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-bg-base hover:bg-emerald-600 transition-colors"
              >
                <SendIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
