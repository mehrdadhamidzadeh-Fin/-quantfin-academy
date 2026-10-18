export type CourseCategory = "CFA" | "CAIA" | "FRM" | "CMT" | "STOCK" | "PYTHON";

export type LessonStatus = "free" | "locked" | "coming-soon";

export interface Formula {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  latex: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionEn?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic?: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  duration: number; // minutes
  status: LessonStatus;
  theory: string[];
  formulas?: { label: string; latex: string }[];
  termEn?: { fa: string; en: string }[];
  example?: { title: string; body: string };
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  titleEn: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  titleEn: string;
  category: CourseCategory;
  level: string;
  description: string;
  color: string;
  icon: string;
  comingSoon?: boolean;
  modules: Module[];
}

export const courses: Course[] = [
  {
    id: "cfa-level-1",
    title: "CFA Level 1",
    titleEn: "Chartered Financial Analyst Level 1",
    category: "CFA",
    level: "مقدماتی تا متوسط",
    description: "مبنای حرفه‌ای تحلیل سرمایه‌گذاری شامل روش‌های کمی، گزارش‌های مالی، سهام و درآمد ثابت.",
    color: "#10B981",
    icon: "chart-line",
    modules: [
      {
        id: "cfa1-quant",
        title: "روش‌های کمی",
        titleEn: "Quantitative Methods",
        lessons: [
          {
            id: "cfa1-quant-l0-returns",
            title: "بازده دارایی‌ها و ابزارهای مالی",
            titleEn: "Returns of Financial Assets and Instruments",
            duration: 45,
            status: "free",
            termEn: [
              { fa: "بازده کل", en: "Total Return" },
              { fa: "بازده دوره نگهداری", en: "Holding Period Return (HPR)" },
              { fa: "میانگین هندسی", en: "Geometric Mean" },
              { fa: "مرکب‌سازی پیوسته", en: "Continuous Compounding" }
            ],
            theory: [
              "در بازارهای مالی، بازده کل یک دارایی حاصل جمع دو مؤلفه اصلی است: بازده قیمتی (سود سرمایه‌ای) و بازده نقدی پرداختی (سود تقسیمی یا کوپن).",
              "بازده دوره نگهداری (HPR) کل عملکرد دارایی را در طول چند دوره اندازه می‌گیرد. میانگین حسابی بهترین برآورد برای پیش‌بینی بازده تک‌دوره آینده است، در حالی که میانگین هندسی (نرخ مرکب سالانه) عملکرد واقعی در طول زمان را نشان می‌دهد.",
              "مرکب‌سازی پیوسته خاصیت جمع‌پذیری زمانی دارد؛ یعنی جمع لگاریتم طبیعی بازده‌های روزانه برابر با بازده کل ماهانه یا سالانه است.",
              "نرخ بازده مورد انتظار سرمایه‌گذار از مجموع نرخ واقعی بدون ریسک، صرف تورم، صرف ریسک نکول، نقدشوندگی و سررسید تشکیل می‌شود."
            ],
            formulas: [
              {
                label: "بازده کل (Total Return)",
                latex: "R_t = \\frac{P_t - P_{t-1} + D_t}{P_{t-1}}"
              },
              {
                label: "بازده دوره نگهداری (HPR)",
                latex: "1 + HPR = \\prod_{t=1}^{T} (1 + R_t) = (1 + R_1)(1 + R_2)...(1 + R_T)"
              },
              {
                label: "میانگین هندسی بازده",
                latex: "R_G = \\left[ \\prod_{t=1}^{T} (1 + R_t) \\right]^{1/T} - 1"
              },
              {
                label: "مرکب‌سازی پیوسته",
                latex: "r_{\\text{continuous}} = \\ln(1 + HPR) = \\ln\\left(\\frac{P_T}{P_0}\\right)"
              }
            ],
            example: {
              title: "محاسبه بازده کل و میانگین هندسی",
              body: "اگر سهامی به قیمت ۱۰۰ دلار خریداری شده، یک سال بعد به ۱۰۵ دلار برسد و ۳ دلار سود نقدی بدهد، بازده کل ۸٪ خواهد بود. اگر بازده سال اول ۲۰٪+ و سال دوم ۲۰٪- باشد، میانگین حسابی صفر اما میانگین هندسی حدود ۲.۰۲٪- (زیان واقعی مرکب) است."
            },
            quiz: [
              {
                id: "q-ret-1",
                question: "سهامی به قیمت ۱۰۰ دلار خریداری شده و پس از یک سال به قیمت ۱۰۵ دلار فروخته می‌شود. اگر ۳ دلار سود نقدی پرداخت شده باشد، بازده کل چقدر است؟",
                options: ["۵.۰ درصد", "۸.۰ درصد", "۳.۰ درصد"],
                correctIndex: 1,
                explanation: "بازده کل = (105 - 100 + 3) / 100 = 8.0%"
              },
              {
                id: "q-ret-2",
                question: "اگر بازده سرمایه‌گذاری در سال اول ۲۰٪+ و در سال دوم ۲۰٪- باشد، میانگین هندسی بازده چگونه است؟",
                options: [
                  "میانگین هندسی منفی ۲.۰۲٪ است.",
                  "هر دو میانگین برابر صفر هستند.",
                  "میانگین هندسی مثبت ۲.۰۲٪ است."
                ],
                correctIndex: 0,
                explanation: "میانگین هندسی برابر است با جذر حاصلضرب (1.20 * 0.80) منهای یک که حدود -2.02% می‌شود."
              }
            ]
          },
          {
            id: "cfa1-quant-l1",
            title: "ارزش زمانی پول",
            titleEn: "Time Value of Money",
            duration: 18,
            status: "free",
            termEn: [
              { fa: "ارزش آتی", en: "Future Value (FV)" },
              { fa: "ارزش فعلی", en: "Present Value (PV)" }
            ],
            theory: [
              "ارزش زمانی پول (TVM) یکی از بنیادی‌ترین مفاهیم در مالی است. ایده اصلی این است که یک دلار امروز ارزش بیشتری از یک دلار در آینده دارد.",
              "دو نوع ارزش وجود دارد: ارزش فعلی (PV) که مبلغ امروز معادل یک جریان نقدی آینده است، و ارزش آینده (FV) که مبلغی است که یک سرمایه امروز با نرخ مشخص در آینده به آن می‌رسد."
            ],
            formulas: [
              {
                label: "ارزش آینده (بهره مرکب)",
                latex: "FV = PV \\times (1 + r)^n"
              },
              {
                label: "ارزش فعلی",
                latex: "PV = \\frac{FV}{(1 + r)^n}"
              }
            ],
            example: {
              title: "محاسبه ارزش آینده",
              body: "اگر مبلغ ۱,۰۰۰ دلار با نرخ سود سالانه ۸٪ برای مدت ۵ سال سرمایه‌گذاری شود، ارزش آینده چقدر است؟\nFV = 1000 × (1 + 0.08)^5 = 1,469.33"
            },
            quiz: [
              {
                id: "q1",
                question: "اگر نرخ بهره سالانه ۱۰٪ باشد، ارزش فعلی ۱۰۰۰ دلار که قرار است پس از ۲ سال دریافت شود چقدر است؟",
                options: ["۸۲۶.۴۵ دلار", "۸۰۰.۰۰ دلار", "۹۰۰.۰۰ دلار"],
                correctIndex: 0,
                explanation: "PV = 1000 / (1 + 0.10)^2 = 1000 / 1.21 = 826.45"
              }
            ]
          },
          {
            id: "cfa1-quant-l2",
            title: "آمار توصیفی و توزیع‌ها",
            titleEn: "Descriptive Statistics & Distributions",
            duration: 22,
            status: "free",
            theory: [
              "آمار توصیفی به خلاصه‌سازی و توصیف داده‌ها می‌پردازد. دو معیار اصلی مرکزی‌گرایی (میانگین، میانه، نما) و پراکندگی (واریانس، انحراف معیار) هستند.",
              "توزیع نرمال مهم‌ترین توزیع در مالی است که متقارن، زنگوله‌ای شکل و با میانگین و انحراف معیار مشخص می‌شود."
            ],
            formulas: [
              {
                label: "انحراف معیار نمونه",
                latex: "s = \\sqrt{\\frac{\\sum (X_i - \\bar{X})^2}{n - 1}}"
              }
            ],
            quiz: [
              {
                id: "q2",
                question: "کدام معیار پراکندگی نشان‌دهنده انحراف از میانگین به ازای هر واحد میانگین است؟",
                options: ["ضریب تغییرات (CV)", "واریانس", "چولگی"],
                correctIndex: 0,
                explanation: "ضریب تغییرات (CV) نسبت انحراف معیار به میانگین است و ریسک نسبی را اندازه می‌گیرد."
              }
            ]
          },
          {
            id: "cfa1-quant-l3",
            title: "احتمال و توزیع‌های پیوسته",
            titleEn: "Probability & Continuous Distributions",
            duration: 25,
            status: "locked",
            theory: ["مفاهیم احتمال شرطی، قانون احتمال کل و قضیه بیز در ارزیابی ریسک سرمایه‌گذاری."],
            formulas: [{ label: "قضیه بیز", latex: "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}" }],
            quiz: [{ id: "q3", question: "قضیه بیز برای چه استفاده می‌شود؟", options: ["به‌روزرسانی احتمالات با اطلاعات جدید", "محاسبه میانگین", "برآورد واریانس"], correctIndex: 0, explanation: "قضیه بیز احتمال شرطی را بر اساس شواهد جدید به‌روز می‌کند." }]
          },
          {
            id: "cfa1-quant-l4",
            title: "فرضیه‌آزمایی",
            titleEn: "Hypothesis Testing",
            duration: 20,
            status: "locked",
            theory: ["آزمون فرض آماری برای پذیرش یا رد ادعا درباره پارامترهای جامعه مالی."],
            formulas: [{ label: "آماره آزمون t", latex: "t = \\frac{\\bar{X} - \\mu_0}{s / \\sqrt{n}}" }],
            quiz: [{ id: "q4", question: "خطای نوع اول چیست؟", options: ["رد کردن فرض صفر در حالی که درست است", "پذیرش فرض صفر در حالی که غلط است", "محاسبه اشتباه آماره t"], correctIndex: 0, explanation: "خطای نوع اول (Alpha) یعنی رد کردن فرض صفر درست." }]
          }
        ]
      },
      {
        id: "cfa1-fsa",
        title: "گزارش‌های مالی",
        titleEn: "Financial Statement Analysis",
        lessons: [
          {
            id: "cfa1-fsa-l1",
            title: "صورت‌های مالی اساسی",
            titleEn: "Core Financial Statements",
            duration: 20,
            status: "locked",
            theory: ["بررسی ترازنامه، صورت سود و زیان و جریان وجه نقد طبق استانداردهای IFRS و US GAAP."],
            formulas: [{ label: "نسبت جاری", latex: "\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}" }],
            quiz: [{ id: "q_fsa_1", question: "کدام صورت مالی وضعیت مالی شرکت را در یک مقطع زمانی خاص نشان می‌دهد؟", options: ["ترازنامه", "صورت سود و زیان", "جریان وجوه نقد"], correctIndex: 0, explanation: "ترازنامه عکس‌برداری از دارایی‌ها، بدهی‌ها و حقوق صاحبان سهام در یک تاریخ مشخص است." }]
          }
        ]
      }
    ]
  }
];

export const categoryLabels: Record<CourseCategory | "ALL", string> = {
  ALL: "همه دوره‌ها",
  CFA: "CFA",
  CAIA: "CAIA",
  FRM: "FRM",
  CMT: "تحلیل تکنیکال",
  STOCK: "بورس",
  PYTHON: "پایتون مالی"
};

export const allLessons = courses.flatMap(c => c.modules.flatMap(m => m.lessons.map(l => ({
  ...l,
  _courseId: c.id,
  _courseTitle: c.title,
  _moduleTitle: m.title
}))));

export const totalLessons = allLessons.length;
export const freeLessons = allLessons.filter(l => l.status === "free").length;
