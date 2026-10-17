import { useApp } from "../context/AppContext";
import { courses, allLessons } from "../data/courses";
import { FlameIcon, TrophyIcon, BookIcon, ClockIcon, PlayIcon, TrendUpIcon } from "../components/icons";
import { LockBadge } from "../components/LockBadge";
import type { Tab } from "../components/BottomNav";

interface DashboardProps {
  onNavigate: (tab: Tab) => void;
  onLessonClick: (lessonId: string) => void;
  onUpgradeClick: () => void;
}

export function Dashboard({ onNavigate, onLessonClick, onUpgradeClick }: DashboardProps) {
  const { progress, isPremium } = useApp();
  const completedCount = progress.completedLessons.length;
  const totalLessons = allLessons.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const resumeLesson = progress.resumeLessonId
    ? allLessons.find((l) => l.id === progress.resumeLessonId)
    : null;
  const firstLockedLesson = allLessons.find((l) => l.status === "locked");

  const stats = [
    {
      label: "درس‌های تکمیل‌شده",
      value: completedCount.toString(),
      Icon: BookIcon,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "روز پیاپی",
      value: progress.streak.toString(),
      Icon: FlameIcon,
      color: "text-gold-400",
      bg: "bg-gold-500/10",
    },
    {
      label: "پیشرفت کلی",
      value: `${progressPct}%`,
      Icon: TrendUpIcon,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="space-y-5 p-4 animate-fade-in">
      <div>
        <h2 className="text-xl font-extrabold text-white">پیشخوان شما</h2>
        <p className="text-sm text-gray-500 mt-0.5">به کوانت‌فین خوش آمدید</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl bg-bg-card border border-bg-hover/50 p-3 text-center"
          >
            <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
              <s.Icon size={20} />
            </div>
            <p className="mt-2 text-xl font-extrabold text-white">{s.value}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl bg-bg-card border border-bg-hover/50 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">پیشرفت دوره‌ها</span>
          <span className="text-xs text-emerald-400 font-bold">{progressPct}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-bg-elevated">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
            style={{ width: `${Math.max(progressPct, 3)}%` }}
          />
        </div>
        <p className="text-[11px] text-gray-500 mt-2">
          {completedCount} از {totalLessons} درس تکمیل شده
        </p>
      </div>

      {/* Resume card */}
      {resumeLesson ? (
        <div
          onClick={() => onLessonClick(resumeLesson.id)}
          className="cursor-pointer rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 border border-emerald-500/20 p-4 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="flex items-center gap-2 mb-2">
            <ClockIcon size={16} className="text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">ادامه یادگیری</span>
          </div>
          <h3 className="text-base font-bold text-white">{resumeLesson.title}</h3>
          <p className="text-xs text-gray-400 mt-1">{resumeLesson.titleEn}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-bg-base">
              <PlayIcon size={16} />
            </span>
            <span className="text-xs text-gray-300">ادامه از جایی که مانده</span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => onNavigate("courses")}
          className="cursor-pointer rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 border border-emerald-500/20 p-4 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="flex items-center gap-2 mb-2">
            <PlayIcon size={16} className="text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">شروع یادگیری</span>
          </div>
          <h3 className="text-base font-bold text-white">اولین درس خود را آغاز کنید</h3>
          <p className="text-xs text-gray-400 mt-1">۲ درس اول CFA Level 1 کاملاً رایگان است</p>
        </div>
      )}

      {/* Active courses */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 mb-3">دوره‌های فعال</h3>
        <div className="space-y-3">
          {courses.filter((c) => !c.comingSoon).map((course) => {
            const courseLessons = course.modules.flatMap((m) => m.lessons);
            const courseCompleted = courseLessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const coursePct =
              courseLessons.length > 0
                ? Math.round((courseCompleted / courseLessons.length) * 100)
                : 0;
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                onClick={() => onNavigate("courses")}
                className="cursor-pointer rounded-2xl bg-bg-card border border-bg-hover/50 p-4 transition-all hover:border-bg-hover"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${course.color}20`, color: course.color }}
                  >
                    <TrendUpIcon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{course.title}</h4>
                    <p className="text-[11px] text-gray-500 truncate">{course.level}</p>
                  </div>
                  <span className="text-xs font-bold" style={{ color: course.color }}>
                    {coursePct}%
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(coursePct, 2)}%`, backgroundColor: course.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coming soon teaser */}
      <div>
        <h3 className="text-sm font-bold text-gray-300 mb-3">دوره‌های آینده</h3>
        <div className="space-y-2.5">
          {courses.filter((c) => c.comingSoon).map((course) => (
            <div
              key={course.id}
              className="flex items-center gap-3 rounded-2xl border border-dashed border-bg-hover bg-bg-card/50 p-3.5"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl opacity-50"
                style={{ backgroundColor: `${course.color}15`, color: course.color }}
              >
                <TrophyIcon size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-300">{course.title}</h4>
                <p className="text-[11px] text-gray-600 truncate">{course.description}</p>
              </div>
              <span className="rounded-full bg-gold-500/10 px-2.5 py-1 text-[10px] font-bold text-gold-400">
                به‌زودی
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Locked teaser */}
      {!isPremium && firstLockedLesson && (
        <div
          onClick={onUpgradeClick}
          className="cursor-pointer rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 p-4 transition-all hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20">
              <LockBadge size="md" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gold-300">دروس بیشتر منتظر شماست</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                با اشتراک طلایی به تمام دروس دسترسی پیدا کنید
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
