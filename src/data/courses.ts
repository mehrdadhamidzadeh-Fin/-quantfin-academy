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
                latex: "R_{\\text{annualized}} = (1 + HPR)^{\\frac{365}{\\text{Days}}} - 1",
                vars: [
                  { symbol: "R_{\\text{annualized}}", desc: "نرخ بازده سالانه‌شده" },
                  { symbol: "HPR", desc: "بازده دوره نگهداری" },
                  { symbol: "Days", desc: "تعداد روزهای دوره سرمایه‌گذاری" }
                ]
              },
              {
                label: "۵. بازده مرکب پیوسته (Continuously Compounded)",
                latex: "r_{\\text{cont}} = \\ln(1 + HPR) = \\ln\\left(\\frac{P_T}{P_0}\\right)",
                vars: [
                  { symbol: "r_{\\text{cont}}", desc: "نرخ بازده مرکب پیوسته" },
                  { symbol: "P_0", desc: "قیمت اولیه دارایی" },
                  { symbol: "P_T", desc: "قیمت نهایی دارایی در زمان T" }
                ]
              },
              {
                label: "۶. رابطه دقیق فیشر (بازده حقیقی)",
                latex: "R_{\\text{real}} = \\frac{1 + R_{\\text{nominal}}}{1 + \\pi} - 1",
                vars: [
                  { symbol: "R_{\\text{real}}", desc: "نرخ بازده حقیقی (تنظیم‌شده با تورم)" },
                  { symbol: "R_{\\text{nominal}}", desc: "نرخ بازده اسمی" },
                  { symbol: "\\pi", desc: "نرخ تورم دوره" }
                ]
              },
              {
                label: "۷. بازده پس از کسر مالیات (After-Tax Return)",
                latex: "R_{\\text{after-tax}} = R_{\\text{price}}(1 - t_{\\text{cg}}) + R_{\\text{income}}(1 - t_{\\text{div}})",
                vars: [
                  { symbol: "R_{\\text{price}}", desc: "بازده قیمتی (سود سرمایه)" },
                  { symbol: "t_{\\text{cg}}", desc: "نرخ مالیات بر عایدی سرمایه (Capital Gains Tax Rate)" },
                  { symbol: "R_{\\text{income}}", desc: "بازده نقدی / سود تقسیمی" },
                  { symbol: "t_{\\text{div}}", desc: "نرخ مالیات بر سود تقسیمی (Dividend Tax Rate)" }
                ]
              },
              {
                label: "۸. بازده حقوق صاحبان سهام با اهرم مالی (Leveraged Return)",
                latex: "R_E = \\frac{V_P R_P - V_B r_B}{V_E}",
                vars: [
                  { symbol: "R_E", desc: "بازده حقوق صاحبان سهام (Equity Return)" },
                  { symbol: "V_P", desc: "ارزش کل سبد دارایی یا پورتفو" },
                  { symbol: "R_P", desc: "بازده کل سبد دارایی" },
                  { symbol: "V_B", desc: "ارزش وجوه استقراضی (Debt/Borrowed Amount)" },
                  { symbol: "r_B", desc: "نرخ بهره استقراض" },
                  { symbol: "V_E", desc: "ارزش حقوق صاحبان سهام (آورده شخصی سرمایه‌گذار)" }
                ]
              }
            ],
            example: {
              title: "مجموعه مثال‌های جامع تحلیل بازده",
              body: "سناریوهای کلیدی مالی به صورت گام‌به‌گام:",
              steps: [
                "\\text{Scenario 1 (Total Return):} \\quad P_0 = 60\\$, \\ P_1 = 72\\$, \\ D_1 = 3\\$ \\implies R = \\frac{72 - 60 + 3}{60} = +25.0\\%",
                "\\text{Scenario 2 (Fisher Inflation):} \\quad R_{\\text{nom}} = 12\\%, \\ \\pi = 4\\% \\implies R_{\\text{real}} = \\frac{1.12}{1.04} - 1 \\approx +7.69\\%"
              ]
            },
            quiz: [
              {
                id: "q-ret-cfa-1",
                question: "سرمایه‌گذاری سهامی را به قیمت ۵۰ دلار خریداری کرده و در پایان سال به قیمت ۵۵ دلار می‌فروشد، در حالی که در طول سال ۲ دلار سود تقسیمی نقدی دریافت کرده است. بازده کل چقدر است؟",
                options: ["۱۰.۰ درصد", "۱۴.۰ درصد", "۴.۰ درصد"],
                correctIndex: 1,
                explanation: "بازده قیمتی (55-50)/50 = 10% و بازده تقسیمی 2/50 = 4% که مجموعاً 14% می‌شود."
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
