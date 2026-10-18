import React, { useState } from 'react';
import { courses, categoryLabels, CourseCategory, Lesson, Course, Module } from '../data/courses';
import { MathBlock } from '../components/Math';
import { AITutor } from '../components/AITutor';

export const CoursesTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "ALL">("ALL");
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const filteredCourses = selectedCategory === "ALL" 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  const handleSelectAnswer = (quizId: string, optionIndex: number) => {
    setSelectedAnswer(prev => ({ ...prev, [quizId]: optionIndex }));
  };

  const toggleExplanation = (quizId: string) => {
    setShowExplanation(prev => ({ ...prev, [quizId]: !prev.explanation }));
  };

  // اگر در صفحه جزئیات درس باشیم
  if (activeLesson) {
    return (
      <div className="pb-24 max-w-4xl mx-auto px-4 py-6 text-slate-100 dir-rtl text-right">
        {/* دکمه بازگشت */}
        <button 
          onClick={() => setActiveLesson(null)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors bg-slate-900/60 px-4 py-2 rounded-lg border border-slate-800 w-fit"
        >
          <span>←</span> بازگشت به فهرست درس‌ها
        </button>

        {/* هدر درس */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="text-xs font-semibold text-emerald-400 mb-2">{activeCourse?.title}</div>
          <h1 className="text-2xl font-bold text-white mb-2">{activeLesson.title}</h1>
          <p className="text-sm text-slate-400 font-mono dir-ltr text-right">{activeLesson.titleEn}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
              مدت مطالعه: {activeLesson.duration} دقیقه
            </span>
            <span className="bg-slate-800 px-3 py-1 rounded-full">
              سطح: استاندارد CFA
            </span>
          </div>
        </div>

        {/* اصطلاحات کلیدی (English Terms) */}
        {activeLesson.termEn && activeLesson.termEn.length > 0 && (
          <div className="mb-8 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <span>📖</span> اصطلاحات کلیدی انگلیسی و فارسی
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeLesson.termEn.map((term, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800/60 text-xs">
                  <span className="text-slate-300 font-medium">{term.fa}</span>
                  <span className="text-emerald-400 font-mono">{term.en}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* محتوای تئوری */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-white border-r-4 border-emerald-500 pr-3">مفاهیم و مباحث آموزشی</h3>
          {activeLesson.theory.map((paragraph, idx) => (
            <div key={idx} className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-5 leading-relaxed text-slate-300 text-sm">
              {paragraph}
            </div>
          ))}
        </div>

        {/* فرمول‌ها همراه با توضیحات متغیرها */}
        {activeLesson.formulas && activeLesson.formulas.length > 0 && (
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font......................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................-950 px-1.5 py-0.5 rounded border border-slate-800">{v.symbol}</span>
                          <span className="text-slate-400 leading-tight">{v.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* مثال‌های حل شده */}
        {activeLesson.example && (
          <div className="mb-8 bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-emerald-400 mb-3">💡 {activeLesson.example.title}</h3>
            <p className="text-sm text-slate-300 mb-4">{activeLesson.example.body}</p>
