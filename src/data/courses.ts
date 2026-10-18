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
  formulas?: { label: string; latex: string; vars?: { symbol: string; desc: string }[] }[];
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
              
              "میانگین حسابی در برابر میانگین هندسی: در تحلیل کمی سرمایه‌گذاری، تمایز میان این دو مفهوم حیاتی است. «میانگین حسابی» میانگین ساده دوره‌هاست و بهترین برآورد بدون تورش برای پیش‌بینی بازده «یک دوره آینده» محسوب می‌شود. در مقابل، «میانگین هندسی» نرخ رشد سالانه مرکب واقعی را در کل دوره تاریخی نشان می‌دهد. قانون بنیادی ریاضیات مالی می‌گوید میانگین هندسی همواره کوچک‌تر یا مساوی میانگین حسابی است (G ≤ A)، و فاصله بین آن‌ها هر چه نوسان و پراکندگی بازده‌ها بیشتر باشد، بزرگ‌تر خواهد شد.",
              
              "سالانه‌سازی بازده (Annualization) و مرکب‌سازی پیوسته: برای مقایسه دارایی‌هایی با دوره‌های نگهداری متفاوت، بازده‌ها باید بر مبنای یک سال استاندارد شوند. اگر فرکانس مرکب‌سازی به بی‌نهایت میل کند، به مفهوم «مرکب‌سازی پیوسته» می‌رسیم که از طریق لگاریتم طبیعی محاسبه می‌شود. مهم‌ترین ویژگی لگاریتم بازده در ریاضیات مالی مدرن، خاصیت جمع‌پذیری زمانی (Time-Additivity) آن است؛ یعنی بازده پیوسته کل دوره برابر با جمع جبری بازده‌های پیوسته تک‌تک روزهاست.",
              
              "نرخ بازده مورد انتظار، تورم و نرخ حقیقی: نرخ بازده الزامی (Required Return) حداقل بازدهی است که سرمایه‌گذار در ازای پذیرش ریسک طلب می‌کند. این نرخ از نرخ بدون ریسک واقعی بعلاوه صرف تورم و صرف ریسک‌های دارایی تشکیل می‌شود. طبق رابطه دقیق فیشر، بازده اسمی و حقیقی رابطه جمعی ساده ندارند بلکه رابطه‌ای ضربی دارند و تورم بالا قدرت خرید دارایی را به شدت فرسایش می‌دهد.",
              
              "بازده ناخالص در برابر خالص و مالیات: بازده ناخالص (Gross Return) عملکرد مدیر سرمایه‌گذاری را قبل از کسر کارمزد مدیریت نشان می‌دهد، در حالی که بازده خالص (Net Return) عایدی نهایی و قابل لمس سرمایه‌گذار است. همچنین پس از کسر مالیات (After-Tax Return)، سود سرمایه‌ای و سود تقسیمی اغلب با نرخ‌های مالیاتی متفاوتی مشمول مالیات می‌شوند که بر بازده نهایی اثرگذار است.",
              
              "بازده اهرمی (Leveraged Return): سرمایه‌گذاران با استقراض پول یا استفاده از ابزارهای مشتقه (مانند اختیار معامله یا همان Options) می‌توانند اهرم ایجاد کنند. اهرم مالی مانند شمشیر دولبه عمل می‌کند؛ در صورت حرکت بازار در جهت پیش‌بینی سرمایه‌گذار، بازده حقوق صاحبان سهام به شدت افزایش می‌یابد و در صورت حرکت معکوس بازار، زیان با همان ضریب تشدید می‌شود."
            ],
            formulas: [
              {
                label: "۱. فرمول بازده کل دارایی (Total Return)",
                latex: "R_t = \\frac{P_t - P_{t-1} + D_t}{P_{t-1}}"
              },
              {
                label: "۲. بازده دوره نگهداری چنددوره‌ای (Holding Period Return)",
                latex: "1 + HPR = \\prod_{t=1}^{T} (1 + R_t)"
              },
              {
                label: "۳. میانگین هندسی (نرخ رشد مرکب سالانه)",
                latex: "R_G = \\left[ \\prod_{t=1}^{T} (1 + R_t) \\right]^{1/T} - 1"
              },
              {
                label: "۴. سالانه‌سازی بازده (Annualized Return)",
                latex: "R_{\\text{annualized}} = (1 + HPR)^{\\frac{365}{\\text{Days}}} - 1"
              },
              {
                label: "۵. بازده مرکب پیوسته (Continuously Compounded)",
                latex: "r_{\\text{cont}} = \\ln(1 + HPR) = \\ln\\left(\\frac{P_T}{P_0}\\right)"
              },
              {
                label: "۶. رابطه دقیق فیشر (بازده حقیقی)",
                latex: "R_{\\text{real}} = \\frac{1 + R_{\\text{nominal}}}{1 + \\pi} - 1"
              },
              {
                label: "۷. بازده پس از کسر مالیات (After-Tax Return)",
                latex: "R_{\\text{after-tax}} = R_{\\text{price}}(1 - t_{\\text{cg}}) + R_{\\text{income}}(1 - t_{\\text{div}})"
              },
              {
                label: "۸. بازده حقوق صاحبان سهام با اهرم مالی (Leveraged Return)",
                latex: "R_E = \\frac{V_P R_P - V_B r_B}{V_E}"
              }
            ],
            example: {
              title: "مجموعه مثال‌های جامع تحلیل بازده (مطابق استانداردهای کتاب CFA)",
              body: "برای تسلط کامل بر مفاهیم این فصل، ۳ سناریوی کلیدی مالی به صورت گام‌به‌گام بررسی می‌شود:",
              steps: [
                "\\text{Scenario 1 (Total Return):} \\quad P_0 = 60\\$, \\ P_1 = 72\\$, \\ D_1 = 3\\$ \\implies R = \\frac{72 - 60 + 3}{60} = \\frac{15}{60} = +25.0\\%",
                "\\text{Scenario 2 (Arithmetic vs Geometric Trap):} \\quad R_1 = +100\\%, \\ R_2 = -50\\%",
                "\\bar{R}_A = \\frac{100\\% + (-50\\%)}{2} = +25.0\\% \\quad (\\text{Arithmetic Mean})",
                "R_G = \\sqrt{(1 + 1.00)(1 - 0.50)} - 1 = \\sqrt{1} - 1 = 0.0\\% \\quad (\\text{Geometric Mean})",
                "\\text{Scenario 3 (Fisher Inflation Adjust):} \\quad R_{\\text{nom}} = 12\\%, \\ \\pi = 4\\%",
                "R_{\\text{real}} = \\frac{1 + 0.12}{1 + 0.04} - 1 = \\frac{1.12}{1.04} - 1 \\approx +7.69\\%"
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
                  "۴.۰ درصد"
                ],
                correctIndex: 1,
                explanation: "بازده قیمتی = (55 - 50) / 50 = 10% | بازده تقسیمی = 2 / 50 = 4% | بازده کل = 10% + 4% = 14%."
              },
              {
                id: "q-ret-cfa-2",
                question: "اگر بازده سالانه یک صندوق در سه سال پیاپی به ترتیب ۱۰٪+، ۲۰٪- و ۱۵٪+ باشد، کدام عبارت در مورد رابطه میانگین حسابی و هندسی آن همواره صحیح است؟",
                questionEn: "If returns over three years are +10%, -20%, and +15%, which statement is always true?",
                options: [
                  "میانگین هندسی همواره کمتر از میانگین حسابی خواهد بود زیرا بازده‌ها نوسان داشته‌اند.",
                  "میانگین حسابی و هندسی دقیقاً با یکدیگر برابر خواهند بود.",
                  "میانگین هندسی بزرگتر از میانگین حسابی است زیرا بازده منفی در محاسبات وجود دارد."
                ],
                correctIndex: 0,
                explanation: "بر اساس قضیه نابرابری میانگین‌ها در ریاضیات مالی، هرگاه بازده‌ها در طول زمان نوسان داشته باشند، میانگین هندسی همواره کمتر از میانگین حسابی است (Geometric <= Arithmetic)."
              },
              {
                id: "q-ret-cfa-3",
                question: "اگر بازده اسمی یک سرمایه‌گذاری ۱۰٪ و نرخ تورم سالانه ۴٪ باشد، بازده واقعی (Real Return) دقیق سرمایه‌گذار بر اساس معادله فیشر چقدر است؟",
                questionEn: "If the nominal return is 10% and inflation is 4%, what is the exact real return?",
                options: [
                  "۶.۰۰ درصد",
                  "۵.۷۷ درصد",
                  "۶.۲۴ درصد"
                ],
                correctIndex: 1,
                explanation: "فرمول دقیق فیشر: (1 + 0.10) / (1 + 0.04) - 1 = 1.10 / 1.04 - 1 = 0.05769 یا 5.77% (تقریب ساده 10 - 4 = 6% تورش دارد)."
              },
              {
                id: "q-ret-cfa-4",
                question: "مهم‌ترین مزیت بازده مرکب پیوسته (Continuously Compounded Return) نسبت به بازده گسسته در مدل‌سازی مالی چیست؟",
                questionEn: "What is the primary advantage of continuously compounded returns in financial modeling?",
                options: [
                  "بازده پیوسته همیشه مثبت است.",
                  "دارای خاصیت جمع‌پذیری در طول زمان (Time-Additivity) است.",
                  "محاسبه آن نیازی به داده‌های قیمتی ندارد."
                ],
                correctIndex: 1,
                explanation: "بازده مرکب پیوسته (لگاریتمی) خاصیت جمع‌پذیری در زمان دارد؛ یعنی جمع لگاریتم بازده روزها برابر با لگاریتم بازده کل سال است."
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
              body: "اگر مبلغ ۱,۰۰۰ دلار با نرخ سود سالانه ۸٪ برای مدت ۵ سال سرمایه‌گذاری شود، ارزش آینده چقدر است؟",
              steps: [
                "FV = 1000 \\times (1 + 0.08)^5 = 1,469.33"
              ]
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
