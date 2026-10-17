import { useState, useMemo } from "react";
import { courses, categoryLabels, allLessons, type CourseCategory, type Lesson } from "../data/courses";
import { useApp } from "../context/AppContext";
import { LockBadge, PremiumBadge } from "../components/LockBadge";
import { MathBlock } from "../components/Math";
import { AITutor } from "../components/AITutor";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  TrendUpIcon,
  TrophyIcon,
} from "../components/icons";

interface CoursesProps {
  onUpgradeClick: () => void;
  initialLessonId?: string | null;
}

export function Courses({ onUpgradeClick, initialLessonId }: CoursesProps) {
  const { isPremium, progress, completeLesson, setResumeLesson } = useApp();
  const [filter, setFilter] = useState<CourseCategory | "ALL">("ALL");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(initialLessonId ?? null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const filteredCourses = useMemo(
    () => courses.filter((c) => filter === "ALL" || c.category === filter),
    [filter]
  );

  const selectedLesson = selectedLessonId
    ? allLessons.find((l) => l.id === selectedLessonId) ?? null
    : null;

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status === "locked" && !isPremium) {
      onUpgradeClick();
      return;
    }
    if (lesson.status === "coming-soon") return;
    setSelectedLessonId(lesson.id);
    setResumeLesson(lesson.id);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  // Lesson Detail View
  if (selectedLesson) {
    const lesson = selectedLesson;
    const isCompleted = progress.completedLessons.includes(lesson.id);

    return (
      <div className="animate-slide-up">
        <div className="sticky top-[57px] z-20 flex items-center justify-between border-b border-bg-hover/50 bg-bg-base/90 backdrop-blur-lg px-4 py-3">
          <button
            onClick={() => setSelectedLessonId(null)}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeftIcon size={20} className="rotate-180" />
            بازگشت
          </button>
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <CheckCircleIcon size={16} />
              تکمیل شد
            </span>
          )}
        </div>

        <div className="p-4 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                {lesson.duration} دقیقه
              </span>
              {lesson.status === "free" && (
                <span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-[10px] font-bold text-blue-400">
                  رایگان
                </span>
              )}
            </div>
            <h1 className="text-xl font-extrabold text-white">{lesson.title}</h1>
            <p className="text-sm text-gray-500 mt-1" dir="ltr">{lesson.titleEn}</p>
          </div>

          {/* Theory */}
          <div className="space-y-3">
            {lesson.theory.map((para, i) => (
              <p key={i} className="text-sm leading-7 text-gray-300">{para}</p>
            ))}
          </div>

          {/* Formulas */}
          {lesson.formulas && lesson.formulas.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-emerald-400 mb-2">فرمول‌ها</h3>
              <div className="space-y-2">
                {lesson.formulas.map((f, i) => (
                  <div key={i}>
                    <p className="text-xs text-gray-400 mb-1">{f.label}</p>
                    <MathBlock>{f.latex}</MathBlock>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* English terminology */}
          {lesson.termEn && lesson.termEn.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-emerald-400 mb-2">اصطلاحات انگلیسی</h3>
              <div className="grid grid-cols-1 gap-2">
                {lesson.termEn.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-bg-card border border-bg-hover/50 px-4 py-2.5"
                  >
                    <span className="text-sm text-gray-300">{t.fa}</span>
                    <span className="text-xs text-gray-500" dir="ltr">{t.en}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example */}
          {lesson.example && (
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
              <h3 className="text-sm font-bold text-emerald-300 mb-1.5">{lesson.example.title}</h3>
              <p className="text-sm leading-7 text-gray-200">{lesson.example.body}</p>
            </div>
          )}

          {/* Mini quiz */}
          {lesson.quiz.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-emerald-400 mb-3">آزمون کوتاه درس</h3>
              <MiniQuiz questions={lesson.quiz} />
            </div>
          )}

          {/* Complete button */}
          {!isCompleted && (
            <button
              onClick={() => completeLesson(lesson.id)}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 py-3.5 text-base font-extrabold text-bg-base shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              تکمیل درس
            </button>
          )}
        </div>

        <AITutor lessonTitle={lesson.title} />
      </div>
    );
  }

  // Course Detail View
  if (selectedCourseId) {
    const course = courses.find((c) => c.id === selectedCourseId);
    if (!course) return null;

    return (
      <div className="animate-slide-up">
        <div className="sticky top-[57px] z-20 border-b border-bg-hover/50 bg-bg-base/90 backdrop-blur-lg px-4 py-3">
          <button
            onClick={() => setSelectedCourseId(null)}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeftIcon size={20} className="rotate-180" />
            همه دوره‌ها
          </button>
        </div>

        <div className="p-4 space-y-5">
          <div className="rounded-2xl p-5" style={{ backgroundColor: `${course.color}12`, border: `1px solid ${course.color}30` }}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${course.color}25`, color: course.color }}
              >
                <TrendUpIcon size={28} />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-white">{course.title}</h1>
                <p className="text-xs text-gray-500" dir="ltr">{course.titleEn}</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-gray-300">{course.description}</p>
          </div>

          <div className="space-y-3">
            {course.modules.map((module, mi) => {
              const isExpanded = expandedModules.has(module.id);
              const moduleCompleted = module.lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;
              return (
                <div key={module.id} className="rounded-2xl bg-bg-card border border-bg-hover/50 overflow-hidden">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="flex w-full items-center justify-between p-4"
                  >
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-0.5">بخش {mi + 1}</p>
                      <h3 className="text-sm font-bold text-white">{module.title}</h3>
                      <p className="text-[11px] text-gray-600 mt-0.5" dir="ltr">{module.titleEn}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {moduleCompleted}/{module.lessons.length}
                      </span>
                      <ChevronDownIcon
                        size={20}
                        className={`text-gray-500 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="border-t border-bg-hover/50">
                      {module.lessons.map((lesson, li) => {
                        const isCompleted = progress.completedLessons.includes(lesson.id);
                        const isLocked = lesson.status === "locked" && !isPremium;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-right border-b border-bg-hover/30 last:border-b-0 hover:bg-bg-elevated/50 transition-colors"
                          >
                            <span
                              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                isCompleted
                                  ? "bg-emerald-500 text-bg-base"
                                  : isLocked
                                  ? "bg-gold-500/15 text-gold-400"
                                  : "bg-bg-elevated text-gray-400"
                              }`}
                            >
                              {isCompleted ? <CheckCircleIcon size={16} /> : isLocked ? <LockBadge /> : li + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${isLocked ? "text-gray-500" : "text-gray-200"}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <ClockIcon size={12} className="text-gray-600" />
                                <span className="text-[11px] text-gray-600">{lesson.duration} دقیقه</span>
                                {lesson.status === "free" && (
                                  <span className="text-[10px] text-blue-400 font-bold">رایگان</span>
                                )}
                              </div>
                            </div>
                            <ArrowRightIcon size={18} className="text-gray-600 rotate-180" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Course List View
  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold text-white">دوره‌ها و دروس</h2>
        <p className="text-sm text-gray-500 mt-0.5">مسیر یادگیری خود را انتخاب کنید</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {(["ALL", "CFA", "CAIA", "FRM", "CMT"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
              filter === cat
                ? "bg-emerald-500 text-bg-base shadow-lg shadow-emerald-500/20"
                : "bg-bg-card text-gray-400 border border-bg-hover/50 hover:text-white"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Course cards */}
      <div className="space-y-3">
        {filteredCourses.map((course) => {
          const courseLessons = course.modules.flatMap((m) => m.lessons);
          const completedCount = courseLessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;
          const pct = courseLessons.length > 0 ? Math.round((completedCount / courseLessons.length) * 100) : 0;

          if (course.comingSoon) {
            return (
              <div
                key={course.id}
                className="rounded-2xl border border-dashed border-bg-hover bg-bg-card/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl opacity-50"
                    style={{ backgroundColor: `${course.color}15`, color: course.color }}
                  >
                    <TrophyIcon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-300 truncate">{course.title}</h3>
                      <span className="rounded-full bg-gold-500/10 px-2 py-0.5 text-[9px] font-bold text-gold-400">
                        به‌زودی
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">{course.description}</p>
                  </div>
                </div>
              </div>
            );
          }

          const Icon = course.icon;

          return (
            <button
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className="block w-full text-right rounded-2xl bg-bg-card border border-bg-hover/50 p-4 transition-all hover:border-bg-hover hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${course.color}20`, color: course.color }}
                >
                  <TrendUpIcon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white truncate">{course.title}</h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                      style={{ backgroundColor: `${course.color}15`, color: course.color }}
                    >
                      {course.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{course.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: course.color }}
                  />
                </div>
                <span className="text-[11px] text-gray-500 font-medium">
                  {courseLessons.length} درس
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MiniQuiz({ questions }: { questions: Lesson["quiz"] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => {
        const selected = answers[qi];
        const answered = selected !== undefined;
        return (
          <div key={q.id} className="rounded-2xl bg-bg-card border border-bg-hover/50 p-4">
            <p className="text-sm font-medium text-gray-200 mb-3">
              <span className="text-emerald-400 font-bold">{qi + 1}.</span> {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.correctIndex;
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
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-right text-sm transition-all ${style} ${
                      !answered ? "hover:border-emerald-500/30" : ""
                    }`}
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bg-base/50 text-xs font-bold">
                      {String.fromCharCode(1570 + oi)}
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
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
