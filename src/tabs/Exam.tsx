import { useState, useEffect, useRef } from "react";
import { mockQuestions, type MockQuestion } from "../data/mockQuestions";
import { useApp } from "../context/AppContext";
import { ClockIcon, CheckCircleIcon, TrophyIcon, LockIcon } from "../components/icons";

interface ExamProps {
  onUpgradeClick: () => void;
}

const EXAM_DURATION = 300; // 5 minutes for 5 questions

export function Exam({ onUpgradeClick }: ExamProps) {
  const { isPremium } = useApp();
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isFreeExam = !isPremium;

  useEffect(() => {
    if (started && !showResults && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setShowResults(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [started, showResults, timeLeft]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setStarted(true);
    setCurrentIdx(0);
    setAnswers({});
    setTimeLeft(EXAM_DURATION);
    setShowResults(false);
  };

  const handleAnswer = (qi: number, oi: number) => {
    if (answers[qi] !== undefined) return;
    setAnswers((a) => ({ ...a, [qi]: oi }));
  };

  const handleNext = () => {
    if (currentIdx < mockQuestions.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  };

  const handleReset = () => {
    setStarted(false);
    setShowResults(false);
    setAnswers({});
    setCurrentIdx(0);
    setTimeLeft(EXAM_DURATION);
  };

  const score = mockQuestions.filter((q, i) => answers[i] === q.correctIndex).length;
  const scorePct = Math.round((score / mockQuestions.length) * 100);

  if (!started && !showResults) {
    return (
      <div className="p-4 space-y-5 animate-fade-in">
        <div>
          <h2 className="text-xl font-extrabold text-white">آزمون شبیه‌سازی شده</h2>
          <p className="text-sm text-gray-500 mt-0.5">آمادگی برای آزمون‌های واقعی CFA و CAIA</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 border border-emerald-500/20 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <TrophyIcon size={28} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">آزمون نمونه رایگان</h3>
              <p className="text-xs text-gray-400 mt-0.5">۵ سؤال · ۵ دقیقه</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircleIcon size={16} className="text-emerald-400" />
              ۵ سؤال چهارگزینه‌ای با ۳ گزینه
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircleIcon size={16} className="text-emerald-400" />
              تایمر معکوس شبیه آزمون واقعی
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircleIcon size={16} className="text-emerald-400" />
              توضیحات کامل فارسی برای هر پاسخ
            </div>
          </div>
          <button
            onClick={handleStart}
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 py-3.5 text-base font-extrabold text-bg-base shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            شروع آزمون
          </button>
        </div>

        <div className="rounded-2xl bg-bg-card border border-bg-hover/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">آزمون‌های نامحدود</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">بانک سؤالات کامل + آزمون‌های موضوعی</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
              <LockIcon size={18} />
            </div>
          </div>
          {!isPremium && (
            <button
              onClick={onUpgradeClick}
              className="mt-3 w-full rounded-xl border border-gold-500/30 bg-gold-500/10 py-2.5 text-sm font-bold text-gold-400 transition-all hover:bg-gold-500/15"
            >
              ارتقا به کوانت‌فین پلاس
            </button>
          )}
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="p-4 space-y-5 animate-fade-in">
        <div className="text-center py-6">
          <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
            scorePct >= 60 ? "bg-emerald-500/15" : "bg-gold-500/15"
          }`}>
            <TrophyIcon size={40} className={scorePct >= 60 ? "text-emerald-400" : "text-gold-400"} />
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-4">
            {score} از {mockQuestions.length}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {scorePct >= 60 ? "آفرین! نتیجه خوبی گرفتید" : "ادامه تمرین لازم است"}
          </p>
          <div className="mx-auto mt-3 h-2 w-32 overflow-hidden rounded-full bg-bg-elevated">
            <div
              className={`h-full rounded-full ${scorePct >= 60 ? "bg-emerald-500" : "bg-gold-500"}`}
              style={{ width: `${scorePct}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-300">مرور پاسخ‌ها</h3>
          {mockQuestions.map((q, qi) => {
            const userAnswer = answers[qi];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <div
                key={q.id}
                className={`rounded-2xl border p-4 ${
                  isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-red-500/30 bg-red-500/5"
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                    isCorrect ? "bg-emerald-500 text-bg-base" : "bg-red-500 text-bg-base"
                  }`}>
                    {isCorrect ? "✓" : "✗"}
                  </span>
                  <p className="text-sm font-medium text-gray-200">{qi + 1}. {q.question}</p>
                </div>
                <p className="text-xs text-emerald-300 mb-1">
                  پاسخ صحیح: {q.options[q.correctIndex]}
                </p>
                {userAnswer !== undefined && userAnswer !== q.correctIndex && (
                  <p className="text-xs text-red-300 mb-1">
                    پاسخ شما: {q.options[userAnswer]}
                  </p>
                )}
                <p className="text-xs leading-6 text-gray-400 mt-2">{q.explanation}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="w-full rounded-2xl bg-bg-card border border-bg-hover py-3.5 text-base font-bold text-gray-300 transition-all hover:text-white hover:border-emerald-500/30"
        >
          آزمون مجدد
        </button>
      </div>
    );
  }

  // Active exam
  const q = mockQuestions[currentIdx];
  const answered = answers[currentIdx] !== undefined;

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          سؤال {currentIdx + 1} از {mockQuestions.length}
        </span>
        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${
          timeLeft < 60 ? "bg-red-500/15 text-red-400" : "bg-bg-card text-emerald-400"
        }`}>
          <ClockIcon size={16} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex gap-1">
        {mockQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i === currentIdx
                ? "bg-emerald-500"
                : answers[i] !== undefined
                ? "bg-emerald-500/40"
                : "bg-bg-elevated"
            }`}
          />
        ))}
      </div>

      <ExamQuestion
        question={q}
        index={currentIdx}
        selected={answers[currentIdx]}
        onAnswer={(oi) => handleAnswer(currentIdx, oi)}
      />

      <div className="flex gap-3 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="flex-1 rounded-2xl bg-bg-card border border-bg-hover py-3 text-sm font-bold text-gray-300 disabled:opacity-30 transition-all hover:text-white"
        >
          قبلی
        </button>
        <button
          onClick={handleNext}
          disabled={!answered}
          className="flex-1 rounded-2xl bg-emerald-500 py-3 text-sm font-extrabold text-bg-base disabled:opacity-40 transition-all hover:bg-emerald-600"
        >
          {currentIdx === mockQuestions.length - 1 ? "پایان آزمون" : "بعدی"}
        </button>
      </div>
    </div>
  );
}

function ExamQuestion({
  question,
  index,
  selected,
  onAnswer,
}: {
  question: MockQuestion;
  index: number;
  selected: number | undefined;
  onAnswer: (oi: number) => void;
}) {
  const answered = selected !== undefined;

  return (
    <div className="rounded-2xl bg-bg-card border border-bg-hover/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
          {question.topic}
        </span>
        <span className="rounded-full bg-bg-elevated px-2 py-0.5 text-[10px] font-bold text-gray-400">
          {question.difficulty}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-200 leading-7 mb-4">
        {question.question}
      </p>
      <div className="space-y-2">
        {question.options.map((opt, oi) => {
          const isCorrect = oi === question.correctIndex;
          const isSelected = selected === oi;
          let style = "border-bg-hover bg-bg-elevated text-gray-300";
          if (answered && isCorrect) {
            style = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
          } else if (answered && isSelected && !isCorrect) {
            style = "border-red-500/50 bg-red-500/10 text-red-300";
          }
          return (
            <button
              key={oi}
              disabled={answered}
              onClick={() => onAnswer(oi)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-right text-sm transition-all ${style} ${
                !answered ? "hover:border-emerald-500/30 active:scale-[0.99]" : ""
              }`}
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-bg-base/50 text-xs font-bold">
                {["الف", "ب", "ج"][oi]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-3 rounded-xl bg-bg-elevated/50 p-3 animate-slide-down">
          <p className="text-xs leading-6 text-gray-400">
            <span className="font-bold text-emerald-400">توضیح: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
