import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ProgressState {
  completedLessons: string[];
  streak: number;
  lastActiveDate: string;
  resumeLessonId: string | null;
}

interface AppState {
  isPremium: boolean;
  togglePremium: () => void;
  progress: ProgressState;
  completeLesson: (lessonId: string) => void;
  setResumeLesson: (lessonId: string) => void;
}

const defaultProgress: ProgressState = {
  completedLessons: [],
  streak: 1,
  lastActiveDate: new Date().toDateString(),
  resumeLessonId: null,
};

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = "quantfin_state";

export function AppProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.isPremium !== undefined) setIsPremium(parsed.isPremium);
        if (parsed.progress) setProgress(parsed.progress);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ isPremium, progress })
    );
  }, [isPremium, progress]);

  const togglePremium = () => setIsPremium((p) => !p);

  const completeLesson = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = prev.lastActiveDate === yesterday ? prev.streak + 1 : prev.lastActiveDate === today ? prev.streak : 1;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        streak: newStreak,
        lastActiveDate: today,
      };
    });
  };

  const setResumeLesson = (lessonId: string) => {
    setProgress((prev) => ({ ...prev, resumeLessonId: lessonId }));
  };

  return (
    <AppContext.Provider
      value={{ isPremium, togglePremium, progress, completeLesson, setResumeLesson }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
