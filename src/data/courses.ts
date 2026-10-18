export type CourseCategory = "CFA" | "CAIA" | "FRM" | "CMT" | "STOCK" | "PYTHON";

export type LessonStatus = "free" | "locked" | "coming-soon";

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
  formulas?: { 
    label: string; 
    latex: string; 
    vars?: { symbol: string; desc: string }[] 
  }[];
  termEn?: { fa: string; en: string }[];
  example?: { title: string; body: string; steps?: string[] };
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
            duration: 75,
            status: "free",
            termEn: [
              { fa: "بازده کل", en: "Total Return" },
              { fa: "بازده سود سرمایه‌ای (قیمتی)", en: "Capital Gain / Price Return" },
              { fa: "بازده تقسیمی / نقدی", en: "Income / Distribution Yield" },
              { fa: "بازده دوره نگهداری", en: "Holding Period Return (HPR)" },
              { fa: "میانگین هندسی", en: "Geometric Mean Return" },
              { fa: "مرکب‌سازی پیوسته", en: "Continuously Compounded Return" },
              { fa: "معادله فیشر (بازده حقیقی)", en: "Fisher Relation (Real Return)" },
              { fa: "بازده مازاد", en: "Excess Return" },
              { fa: "بازده ناخالص و خالص", en: "Gross vs. Net Return" },
              { fa: "بازده اهرمی", en: "Leveraged Return" }
            ],
            theory: [
              "مقدمه و تعریف بنیادی بازده: در بازارهای مالی، هدف هر سرمایه‌گذار کسب عایدی در ازای به تعویق انداختن مصرف و پذیرش عدم قطعیت (ریسک) است. بازده کل (Total Return) یک دارایی مالی نشان‌دهنده درصد تغییر در ثروت سرمایه‌گذار طی دوره سرمایه‌گذاری است و همواره از دو جریان مجزا تشکیل می‌شود: نخست «بازده قیمتی» ناشی از نوسان قیمت بازار دارایی (Capital Gain/Loss)، و دوم «جریان نقدی توزیع‌شده» مانند سود تقسیمی سهام (Dividend) یا کوپن پرداختی اوراق قرضه.",
              
              "بازده دوره نگهداری (Holding Period Return - HPR): وقتی دارایی برای یک افق زمانی مشخص (از یک روز تا چندین سال) نگهداری می‌شود، HPR کل عملکرد سرمایه‌گذاری را اندازه می‌گیرد. اگر در طول دوره جریانات نقدی میان‌دوره‌ای مجدداً با همان نرخ سرمایه‌گذاری شوند، بازده چند دوره به صورت حاصل‌ضرب مرکب (1+R) محاسبه می‌شود و نه صرفاً جمع ساده بازده‌ها.",
              
              "میانگین حسابی در برابر میانگین هندسی: در تحلیل کمی سرمایه‌گذاری، تمایز میان این دو مفهوم حیاتی است. «میانگین حسابی» میانگین ساده دوره‌هاست و بهترین برآورد بدون تورش برای پیش‌بینی بازده «یک دوره آینده» محسوب می‌شود. در مقابل، «میانگین هندسی» نرخ رشد سالانه مرکب واقعی را در کل دوره تاریخی نشان می‌دهد. قانون بنیادی ریاضیات مالی می‌گوید میانگین هندسی همواره کوچک‌تر یا مساوی میانگین حسابی است (G ≤ A).",
              
              "سالانه‌سازی بازده (Annualization) و مرکب‌سازی پیوسته: برای مقایسه دارایی‌هایی با دوره‌های نگهداری متفاوت، بازده‌ها باید بر مبنای یک سال استاندارد شوند. اگر فرکانس مرکب‌سازی به بی‌نهایت میل کند، به مفهوم «مرکب‌سازی پیوسته» می‌رسیم که از طریق لگاریتم طبیعی محاسبه می‌شود."
            ],
            formulas: [
              {
                label: "۱. فرمول بازده کل دارایی (Total Return)",
                latex: "R_t = \\frac{P_t - P_{t-1} + D_t}{P_{t-1}}",
                vars: [
                  { symbol: "R_t", desc: "بازده کل دارایی در دوره t" },
                  { symbol: "P_t", desc: "قیمت دارایی در پایان دوره" },
                  { symbol: "P_{t-1}", desc: "قیمت دارایی در ابتدای دوره" },
                  { symbol: "D_t", desc: "جریان نقدی یا سود تقسیمی پرداختی در طول دوره" }
                ]
              },
              {
                label: "۲. بازده دوره نگهداری چنددوره‌ای (Holding Period Return)",
                latex: "1 + HPR = \\prod_{t=1}^{T} (1 + R_t)",
                vars: [
                  { symbol: "HPR", desc: "بازده دوره نگهداری کل" },
                  { symbol: "R_t", desc: "بازده دوره tام" },
                  { symbol: "T", desc: "تعداد کل دوره‌های زمانی" }
                ]
              },
              {
                label: "۳. میانگین هندسی (نرخ رشد مرکب سالانه)",
                latex: "R_G = \\left[ \\prod_{t=1}^{T} (1 + R_t) \\right]^{1/T} - 1",
                vars: [
                  { symbol: "R_G", desc: "میانگین هندسی بازده" },
                  { symbol: "R_t", desc: "بازده در هر دوره t" },
                  { symbol: "T", desc: "تعداد کل دوره‌ها" }
                ]
              },
              {
                label: "۴. سالانه‌سازی بازده (Annualized Return)",
                latex: "R_{ann} = (1 + HPR)^{\\frac{365}{Days}} - 1",
                vars: [
                  { symbol: "R_{ann}", desc: "نرخ بازده سالانه‌شده" },
                  { symbol: "HPR", desc: "بازده دوره نگهداری" },
                  { symbol: "Days", desc: "تعداد روزهای دوره سرمایه‌گذاری" }
                ]
              },
              {
                label: "۵. بازده مرکب پیوسته (Continuously Compounded)",
                latex: "r_{cont} = \\ln(1 + HPR) = \\ln\\left(\\frac{P_T}{P_0}\\right)",
                vars: [
                  { symbol: "r_{cont}", desc: "نرخ بازده مرکب پیوسته" },
                  { symbol: "P_0", desc: "قیمت اولیه دارایی" },
                  { symbol: "P_T", desc: "قیمت نهایی دارایی در زمان T" }
                ]
              },
              {
                label: "۶. رابطه دقیق فیشر (بازده حقیقی)",
                latex: "R_{real} = \\frac{1 + R_{nom}}{1 + \\pi} - 1",
                vars: [
                  { symbol: "R_{real}", desc: "نرخ بازده حقیقی (تنظیم‌شده با تورم)" },
                  { symbol: "R_{nom}", desc: "نرخ بازده اسمی" },
                  { symbol: "\\pi", desc: "نرخ تورم دوره" }
                ]
              },
              {
                label: "۷. بازده پس از کسر مالیات (After-Tax Return)",
                latex: "R_{after} = R_{price}(1 - t_{cg}) + R_{income}(1 - t_{div})",
                vars: [
                  { symbol: "R_{price}", desc: "بازده قیمتی (سود سرمایه)" },
                  { symbol: "t_{cg}", desc: "نرخ مالیات بر عایدی سرمایه" },
                  { symbol: "R_{income}", desc: "بازده نقدی / سود تقسیمی" },
                  { symbol: "t_{div}", desc: "نرخ مالیات بر سود تقسیمی" }
                ]
              },
              {
                label: "۸. بازده حقوق صاحبان سهام با اهرم مالی (Leveraged Return)",
                latex: "R_E = \\frac{V_P R_P - V_B r_B}{V_E}",
                vars: [
                  { symbol: "R_E", desc: "بازده حقوق صاحبان سهام (Equity Return)" },
                  { symbol: "V_P", desc: "ارزش کل سبد دارایی یا پورتفو" },
                  { symbol: "R_P", desc: "بازده کل سبد دارایی" },
                  { symbol: "V_B", desc: "ارزش وجوه استقراضی" },
                  { symbol: "r_B", desc: "نرخ بهره استقراض" },
                  { symbol: "V_E", desc: "ارزش حقوق صاحبان سهام (آورده شخصی)" }
                ]
              }
            ],
            example: {
              title: "مجموعه مثال‌ها و سناریوهای کاربردی تحلیل بازده",
              body: "برای تسلط کامل بر مفاهیم آزمون CFA، سناریوهای کلیدی زیر را بررسی کنید:",
              steps: [
                "\\text{سناریوی ۱ (بازده کل):} \\quad P_0 = 60\\$, \\ P_1 = 72\\$, \\ D_1 = 3\\$ \\implies R = \\frac{72 - 60 + 3}{60} = +25.0\\%",
                "\\text{سناریوی ۲ (مقایسه میانگین):} \\quad R_1 = +100\\%, \\ R_2 = -50\\% \\implies \\bar{R}_A = +25\\%, \\ R_G = 0\\%",
                "\\text{سناریوی ۳ (رابطه فیشر):} \\quad R_{nom} = 12\\%, \\ \\pi = 4\\% \\implies R_{real} = \\frac{1.12}{1.04} - 1 \\approx +7.69\\%"
              ]
            },
            quiz: [
              {
                id: "q-ret-cfa-1",
                question: "سرمایه‌گذاری سهامی را به قیمت ۵۰ دلار خریداری کرده و در پایان سال به قیمت ۵۵ دلار می‌فروشد، در حالی که در طول سال ۲ دلار سود تقسیمی نقدی دریافت کرده است. بازده کل (Total Return) این سرمایه‌گذاری چقدر است؟",
                questionEn: "An investor buys a stock for $50 and sells it for $55 after one year, receiving a $2 cash dividend. What is the total return?",
                options: [
                  "۱۰.۰ درصد",
                  "۱۴.۰ درصد",
                  "۴.۰ درصد",
                  "۱۸.۰ درصد"
                ],
                correctIndex: 1,
                explanation: "بازده قیمتی = (55 - 50) / 50 = 10% | بازده تقسیمی = 2 / 50 = 4% | بازده کل = 10% + 4% = 14%."
              },
              {
                id: "q-ret-cfa-2",
                question: "اگر بازده سالانه یک صندوق در دو سال پیاپی به ترتیب ۱۰۰٪+ و ۵۰٪- باشد، تفاوت اصلی میانگین حسابی و میانگین هندسی آن چیست؟",
                questionEn: "If returns are +100% and -50%, what is the key difference between arithmetic and geometric mean?",
                options: [
                  "میانگین حسابی ۲۵٪ و میانگین هندسی ۰٪ است.",
                  "هر دو میانگین دقیقاً برابر با ۲۵٪ خواهند بود.",
                  "میانگین هندسی بزرگتر از میانگین حسابی است.",
                  "میانگین حسابی منفی و میانگین هندسی مثبت است."
                ],
                correctIndex: 0,
                explanation: "میانگین حسابی برابر (100% - 50%)/2 = 25% است، اما میانگین هندسی حاصل‌ضرب (2)*(0.5) زیر ریشه دوم منهای یک است که برابر با 0% می‌شود."
              },
              {
                id: "q-ret-cfa-3",
                question: "اگر بازده اسمی یک سرمایه‌گذاری ۱۲٪ و نرخ تورم سالانه ۴٪ باشد، بازده واقعی (Real Return) بر اساس معادله دقیق فیشر چقدر است؟",
                questionEn: "If the nominal return is 12% and inflation is 4%, what is the exact real return using Fisher relation?",
                options: [
                  "۸.۰۰ درصد",
                  "۷.۶۹ درصد",
                  "۸.۳۳ درصد",
                  "۶.۵۰ درصد"
                ],
                correctIndex: 1,
                explanation: "فرمول فیشر: (1 + 0.12) / (1 + 0.04) - 1 = 1.12 / 1.04 - 1 ≈ 7.69%."
              },
              {
                id: "q-ret-cfa-4",
                question: "مهم‌ترین ویژگی بازده مرکب پیوسته (Continuously Compounded Return) در مدل‌سازی مالی چیست؟",
                questionEn: "What is the primary feature of continuously compounded return in financial modeling?",
                options: [
                  "دارای خاصیت جمع‌پذیری زمانی (Time-Additivity) است.",
                  "همیشه از بازده ساده بزرگتر است.",
                  "نیازی به قیمت‌های ابتدایی و انتهایی ندارد.",
                  "فقط برای اوراق با درآمد ثابت کاربرد دارد."
                ],
                correctIndex: 0,
                explanation: "بازده مرکب پیوسته (لگاریتمی) به دلیل خاصیت لگاریتم، در طول زمان جمع‌پذیر است و در مدل‌های قیمت‌گذاری مشتقات کاربرد کلیدی دارد."
              },
              {
                id: "q-ret-cfa-5",
                question: "اگر سرمایه‌گذاری با استفاده از اهرم مالی (Leverage) پورتفویی با بازده ۱۵٪ تشکیل دهد و نرخ بهره استقراض ۵٪ باشد، با افزایش نسبت بدهی چه اتفاقی برای بازده حقوق صاحبان سهام می‌افتد؟",
                questionEn: "When using leverage with a portfolio return above borrowing cost, what happens to equity return as leverage increases?",
                options: [
                  "بازده حقوق صاحبان سهام (ROE) افزایش می‌یابد.",
                  "بازده حقوق صاحبان سهام کاهش می‌یابد.",
                  "هیچ تغییری در بازده حقوق صاحبان سهام ایجاد نمی‌شود.",
                  "ریسک حذف شده و بازده ثابت می‌ماند."
                ],
                correctIndex: 0,
                explanation: "اهرم مالی شمشیر دولبه است؛ چون بازده پورتفو (15%) بیشتر از هزینه استقراض (5%) است، با افزایش اهرم، بازده حقوق صاحبان سهام بیشتر می‌شود."
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
              "ارزش زمانی پول (TVM) یکی از بنیادی‌ترین مفاهیم در مالی است. ایده اصلی این است که یک دلار امروز ارزش بیشتری از یک دلار در آینده دارد."
            ],
            formulas: [
              {
                label: "ارزش آینده (بهره مرکب)",
                latex: "FV = PV \\times (1 + r)^n",
                vars: [
                  { symbol: "FV", desc: "ارزش آینده پول" },
                  { symbol: "PV", desc: "ارزش فعلی پول" },
                  { symbol: "r", desc: "نرخ بهره دوره" },
                  { symbol: "n", desc: "تعداد دوره‌های زمانی" }
                ]
              }
            ],
            quiz: [
              {
                id: "q1",
                question: "اگر نرخ بهره سالانه ۱۰٪ باشد، ارزش فعلی ۱۰۰۰ دلار که قرار است پس از ۲ سال دریافت شود چقدر است؟",
                options: ["۸۲۶.۴۵ دلار", "۸۰۰.۰۰ دلار", "۹۰۰.۰۰ دلار", "۸۵۰.۰۰ دلار"],
                correctIndex: 0,
                explanation: "PV = 1000 / (1 + 0.10)^2 = 1000 / 1.21 = 826.45"
              }
            ]
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
