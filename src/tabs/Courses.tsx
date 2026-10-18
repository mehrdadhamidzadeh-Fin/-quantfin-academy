import React, { useState } from 'react';
import { courses, categoryLabels, CourseCategory, Lesson, Course } from '../data/courses';
import { MathBlock } from '../components/Math';
import { AITutor } from '../components/AITutor';

export const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "ALL">("ALL");
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Record<string, number>>({});

  const filteredCourses = selectedCategory === "ALL" 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  const handleSelectAnswer = (quizId: string, optionIndex: number) => {
    setSelectedAnswer(prev => ({ ...prev, [quizId]: optionIndex }));
  };

  // نمای تفصیلی درس
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

        {/* فرمول‌ها همراه با راهنمای متغیرها */}
        {activeLesson.formulas && activeLesson.formulas.length > 0 && (
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-bold text-white border-r-4 border-emerald-500 pr-3">فرمول‌های کلیدی و محاسباتی</h3>
            {activeLesson.formulas.map((formula, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="text-sm font-semibold text-emerald-400 mb-3">{formula.label}</div>
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 text-center my-3 overflow-x-auto">
                  <MathBlock>{formula.latex}</MathBlock>
                </div>
                
                {/* راهنمای متغیرها زیر فرمول */}
                {formula.vars && formula.vars.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800/90 bg-slate-950/50 p-3.5 rounded-xl">
                    <div className="text-xs font-bold text-slate-300 mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      راهنمای متغیرها و نمادها:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {formula.vars.map((v, vIdx) => (
                        <div key={vIdx} className="flex items-center gap-2 text-xs bg-slate-900/80 px-2.5 py-1.5 rounded border border-slate-800/60">
                          <span className="font-mono text-emerald-300 font-bold dir-ltr bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">{v.symbol}</span>
                          <span className="text-slate-500">:</span>
                          <span className="text-slate-300">{v.desc}</span>
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
            {activeLesson.example.steps && (
              <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                {activeLesson.example.steps.map((step, sIdx) => (
                  <div key={sIdx} className="overflow-x-auto py-1">
                    <MathBlock>{step}</MathBlock>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* آزمون خودسنجی استاندارد CFA */}
        {activeLesson.quiz && activeLesson.quiz.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white border-r-4 border-emerald-500 pr-3">آزمون خودسنجی استاندارد CFA</h3>
            {activeLesson.quiz.map((q, qIdx) => {
              const isAnswered = selectedAnswer[q.id] !== undefined;
              const isCorrect = selectedAnswer[q.id] === q.correctIndex;
              return (
                <div key={q.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
                  <div className="text-sm font-semibold text-white mb-3">
                    <span className="text-emerald-400 ml-2">سوال {qIdx + 1}:</span>
                    {q.question}
                  </div>
                  {q.questionEn && (
                    <div className="text-xs text-slate-400 mb-4 font-mono dir-ltr text-right">
                      {q.questionEn}
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswer[q.id] === optIdx;
                      let btnStyle = "bg-slate-950/60 border-slate-800 hover:border-emerald-500/50 text-slate-300";
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-300";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full text-right px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`mt-4 p-4 rounded-xl text-xs ${isCorrect ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300' : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'}`}>
                      <div className="font-bold mb-1">{isCorrect ? '✅ پاسخ صحیح است!' : '❌ پاسخ اشتباه است.'}</div>
                      <div className="text-slate-300 leading-relaxed">{q.explanation}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* معلم هوشمند مالی درون درس */}
        <div className="mt-8">
          <AITutor lessonTitle={activeLesson.title} />
        </div>
      </div>
    );
  }

  // نمای فهرست دوره‌ها
  return (
    <div className="pb-24 max-w-6xl mx-auto px-4 py-6 text-slate-100 dir-rtl text-right">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">دوره‌های تخصصی مالی</h1>
        <p className="text-sm text-slate-400">برنامه‌های درسی استاندارد جهانی CFA و CAIA به زبان فارسی روان و دقیق</p>
      </div>

      {/* دسته‌بندی‌ها */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key as CourseCategory | "ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
              selectedCategory === key
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* لیست دوره‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                  {course.category}
                </span>
                <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  {course.level}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
              <p className="text-xs text-slate-400 font-mono mb-3 dir-ltr text-right">{course.titleEn}</p>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">{course.description}</p>
            </div>

            <div className="space-y-4 border-t border-slate-800 pt-4">
              <div className="text-xs font-bold text-slate-400">ماژول‌ها و درس‌ها:</div>
              {course.modules.map(module => (
                <div key={module.id} className="space-y-2">
                  <div className="text-xs font-semibold text-emerald-400">{module.title}</div>
                  <div className="space-y-1.5">
                    {module.lessons.map(lesson => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveCourse(course);
                          setActiveLesson(lesson);
                        }}
                        className="w-full text-right bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 px-4 py-2.5 rounded-xl text-xs flex justify-between items-center transition-all group"
                      >
                        <span className="text-slate-200 group-hover:text-emerald-300 font-medium">{lesson.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                            {lesson.duration} دقیقه
                          </span>
                          <span className="text-emerald-400">←</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
