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
  topic: string;
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
    titleEn: "Chartered Financial Analyst Level I",
    category: "CFA",
    level: "سطح ۱",
    description:
      "مبنای حرفه‌ای تحلیل سرمایه‌گذاری شامل روش‌های کمی، گزارش‌های مالی، سهام و درآمد ثابت.",
    color: "#10B981",
    icon: "chart-line",
    modules: [
      {
        id: "cfa1-quant",
        title: "روش‌های کمی",
        titleEn: "Quantitative Methods",
        lessons: [
          {
            id: "cfa1-quant-l1",
            title: "ارزش زمانی پول",
            titleEn: "Time Value of Money",
            duration: 18,
            status: "free",
            theory: [
              "ارزش زمانی پول (TVM) یکی از بنیادی‌ترین مفاهیم در مالی است. ایده اصلی این است که یک دلار امروز ارزش بیشتری از یک دلار در آینده دارد، زیرا پول امروز می‌تواند سرمایه‌گذاری شده و سود کسب کند.",
              "دو نوع ارزش وجود دارد: ارزش فعلی (PV) که مبلغ امروز معادل یک جریان نقدی آینده است، و ارزش آینده (FV) که مبلغی است که یک سرمایه امروز با نرخ مشخص در آینده به آن می‌رسد.",
              "در محاسبات TVM سه عامل کلیدی نقش دارند: نرخ بهره (r)، تعداد دوره‌ها (n)، و نوع بهره (ساده یا مرکب). بهره مرکب زمانی است که سود نیز سود تولید می‌کند.",
            ],
            formulas: [
              {
                label: "ارزش آینده (بهره مرکب)",
                latex: "FV = PV \\times (1 + r)^n",
              },
              {
                label: "ارزش فعلی (تنزیل)",
                latex: "PV = \\frac{FV}{(1 + r)^n}",
              },
              {
                label: "ارزش فعلی آنوئیته عادی",
                latex: "PV_{annuity} = PMT \\times \\frac{1 - (1+r)^{-n}}{r}",
              },
            ],
            termEn: [
              { fa: "ارزش فعلی", en: "Present Value (PV)" },
              { fa: "ارزش آینده", en: "Future Value (FV)" },
              { fa: "نرخ بهره", en: "Interest Rate (r)" },
              { fa: "آموئیته", en: "Annuity" },
            ],
            example: {
              title: "مثال عددی",
              body: "اگر ۱۰۰۰ دلار را با نرخ ۸٪ سالانه به مدت ۵ سال سرمایه‌گذاری کنید، ارزش آینده برابر است با: FV = 1000 × (1.08)⁵ = ۱٬۴۶۹٫۳۳ دلار. یعنی پول شما در ۵ سال تقریباً ۴۷٪ رشد می‌کند.",
            },
            quiz: [
              {
                id: "q1",
                question: "اگر PV = ۵۰۰ دلار، r = ۱۰٪، n = ۳ باشد، FV چقدر است؟",
                questionEn: "Calculate FV with PV=500, r=10%, n=3",
                options: ["۶۶۵٫۵۰ دلار", "۶۰۰٫۰۰ دلار", "۵۵۰٫۰۰ دلار"],
                correctIndex: 0,
                explanation:
                  "FV = 500 × (1.10)³ = 500 × 1.331 = ۶۶۵٫۵۰ دلار. بهره مرکب باعث می‌شود سود هر سال نیز سود تولید کند.",
                topic: "TVM",
              },
              {
                id: "q2",
                question: "کدام گزینه درباره ارزش فعلی (PV) درست است؟",
                options: [
                  "PV همیشه بزرگ‌تر از FV است",
                  "PV همواره با افزایش نرخ تنزیل افزایش می‌یابد",
                  "PV با افزایش نرخ تنزیل کاهش می‌یابد",
                ],
                correctIndex: 2,
                explanation:
                  "نرخ تنزیل در مخرج قرار دارد، پس با افزایش r ارزش فعلی کاهش می‌یابد. این رابطه معکوس است.",
                topic: "TVM",
              },
              {
                id: "q3",
                question: "بهره مرکب (Compound Interest) چه تفاوتی با بهره ساده دارد؟",
                options: [
                  "هیچ تفاوتی ندارد",
                  "بهره مرکب روی سود انباشته نیز سود محاسبه می‌کند",
                  "بهره ساده همیشه بازده بیشتری دارد",
                ],
                correctIndex: 1,
                explanation:
                  "در بهره مرکب، سود دوره‌های قبل نیز در محاسبه سود دوره بعد لحاظ می‌شود، که باعث رشد نمایی سرمایه می‌شود.",
                topic: "TVM",
              },
            ],
          },
          {
            id: "cfa1-quant-l2",
            title: "آمار توصیفی و توزیع‌ها",
            titleEn: "Descriptive Statistics & Distributions",
            duration: 22,
            status: "free",
            theory: [
              "آمار توصیفی به خلاصه‌سازی و توصیف داده‌ها می‌پردازد. دو معیار اصلی مرکزگرایی (میانگین، میانه، نما) و پراکندگی (واریانس، انحراف معیار) هستند.",
              "توزیع نرمال مهم‌ترین توزیع در مالی است که متقارن، زنگوله‌ای شکل و با میانگین و انحراف معیار مشخص می‌شود. تقارن به این معناست که میانگین = میانه = نما.",
              "توزیع‌های چوله (Skewed) زمانی رخ می‌دهند که داده‌ها متقارن نباشند. چولگی مثبت (دست راست) و چولگی منفی (دست چپ) دو نوع آن هستند. کشیدگی (Kurtosis) نیز میزان تیزی قله توزیع را نشان می‌دهد.",
            ],
            formulas: [
              {
                label: "انحراف معیار نمونه",
                latex: "s = \\sqrt{\\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n-1}}",
              },
              {
                label: "ضریب تغییرات",
                latex: "CV = \\frac{s}{\\bar{x}}",
              },
              {
                label: "زشورت برای z-score",
                latex: "z = \\frac{x - \\mu}{\\sigma}",
              },
            ],
            termEn: [
              { fa: "میانگین", en: "Mean" },
              { fa: "انحراف معیار", en: "Standard Deviation" },
              { fa: "چولگی", en: "Skewness" },
              { fa: "کشیدگی", en: "Kurtosis" },
            ],
            example: {
              title: "مثال عددی",
              body: "اگر بازده سه سهام ۵٪، ۱۰٪ و ۱۵٪ باشد، میانگین = ۱۰٪ و انحراف معیار ≈ ۵٪. ضریب تغییرات CV = 0.05/0.10 = 0.5 یا ۵۰٪.",
            },
            quiz: [
              {
                id: "q1",
                question: "در یک توزیع نرمال، رابطه میانگین، میانه و نما چگونه است؟",
                options: [
                  "میانگین > میانه > نما",
                  "همگی برابرند",
                  "میانه همیشه بزرگ‌تر است",
                ],
                correctIndex: 1,
                explanation:
                  "توزیع نرمال کاملاً متقارن است، بنابراین میانگین = میانه = نما.",
                topic: "آمار",
              },
              {
                id: "q2",
                question: "چولگی مثبت به چه معناست؟",
                options: [
                  "دم سمت چپ بلندتر است",
                  "دم سمت راست بلندتر است",
                  "توزیع کاملاً متقارن است",
                ],
                correctIndex: 1,
                explanation:
                  "در چولگی مثبت، دم سمت راست (مقادیر بزرگ) بلندتر است و میانگین > میانه.",
                topic: "آمار",
              },
              {
                id: "q3",
                question: "z-score چه چیزی را اندازه‌گیری می‌کند؟",
                options: [
                  "فاصله یک مقدار از میانگین بر حسب انحراف معیار",
                  "واریانس نمونه",
                  "میانه توزیع",
                ],
                correctIndex: 0,
                explanation:
                  "z-score = (x - μ) / σ نشان می‌دهد یک مشاهده چند انحراف معیار از میانگین فاصله دارد.",
                topic: "آمار",
              },
            ],
          },
          {
            id: "cfa1-quant-l3",
            title: "احتمال و توزیع‌های پیوسته",
            titleEn: "Probability & Continuous Distributions",
            duration: 25,
            status: "locked",
            theory: [
              "احتمال شرطی و قانون بیز از مباحث کلیدی در ارزیابی ریسک مالی هستند.",
              "توزیع t و توزیع کای-دو برای نمونه‌های کوچک و تخمین واریانس استفاده می‌شوند.",
            ],
            formulas: [
              { label: "قانون بیز", latex: "P(A|B) = \\frac{P(B|A) \\times P(A)}{P(B)}" },
            ],
            termEn: [
              { fa: "احتمال شرطی", en: "Conditional Probability" },
              { fa: "قانون بیز", en: "Bayes' Theorem" },
            ],
            quiz: [
              {
                id: "q1",
                question: "قانون بیز برای چه چیزی استفاده می‌شود؟",
                options: ["به‌روزرسانی احتمال با اطلاعات جدید", "محاسبه میانگین", "تخمین واریانس"],
                correctIndex: 0,
                explanation: "قانون بیز احتمال یک فرضیه را با مشاهده شواهد جدید به‌روزرسانی می‌کند.",
                topic: "احتمال",
              },
            ],
          },
          {
            id: "cfa1-quant-l4",
            title: "فرضیه‌آزمایی",
            titleEn: "Hypothesis Testing",
            duration: 20,
            status: "locked",
            theory: [
              "فرضیه‌آزمایی روشی آماری برای تصمیم‌گیری درباره پارامترهای جامعه بر اساس داده‌های نمونه است.",
            ],
            formulas: [
              { label: "آمار آزمونه", latex: "t = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}" },
            ],
            termEn: [{ fa: "فرض صفر", en: "Null Hypothesis" }, { fa: "سطح معنی‌داری", en: "Significance Level" }],
            quiz: [
              {
                id: "q1",
                question: "p-value کمتر از ۰٫۰۵ چه معنایی دارد؟",
                options: ["فرض صفر رد می‌شود", "فرض صفر تأیید می‌شود", "نتیجه‌ای ندارد"],
                correctIndex: 0,
                explanation: "اگر p-value < سطح معنی‌داری (معمولاً ۰٫۰۵)، فرض صفر رد می‌شود.",
                topic: "فرضیه‌آزمایی",
              },
            ],
          },
        ],
      },
      {
        id: "cfa1-fsa",
        title: "گزارش‌های مالی",
        titleEn: "Financial Statement Analysis",
        lessons: [
          {
            id: "cfa1-fsa-l1",
            title: "صورتهای مالی اساسی",
            titleEn: "Core Financial Statements",
            duration: 20,
            status: "locked",
            theory: [
              "صورتهای مالی شامل ترازنامه، صورت سود و زیان، صورت جریان نقدی و صورت سود انباشته هستند.",
              "تحلیل نسبت‌ها به سرمایه‌گذاران کمک می‌کند تا نقدینگی، سودآوری و اهرمی شرکت را ارزیابی کنند.",
            ],
            formulas: [
              { label: "نسبت جاری", latex: "\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}" },
              { label: "حاشیه سود خالص", latex: "\\text{Net Profit Margin} = \\frac{\\text{Net Income}}{\\text{Revenue}}" },
            ],
            termEn: [
              { fa: "ترازنامه", en: "Balance Sheet" },
              { fa: "صورت سود و زیان", en: "Income Statement" },
              { fa: "جریان نقدی", en: "Cash Flow Statement" },
            ],
            quiz: [
              {
                id: "q1",
                question: "نسبت جاری چه چیزی را می‌سنجد؟",
                options: ["نقدینگی کوتاه‌مدت", "سودآوری بلندمدت", "اهرم مالی"],
                correctIndex: 0,
                explanation: "نسبت جاری توان شرکت در پرداخت بدهی‌های کوتاه‌مدت را می‌سنجد.",
                topic: "FSA",
              },
            ],
          },
          {
            id: "cfa1-fsa-l2",
            title: "تحلیل نسبت‌ها",
            titleEn: "Ratio Analysis",
            duration: 24,
            status: "locked",
            theory: ["نسبت‌های مالی به دسته‌های نقدینگی، سودآوری، کارایی و اهرمی تقسیم می‌شوند."],
            formulas: [
              { label: "بازده حقوق صاحبان سهام", latex: "ROE = \\frac{\\text{Net Income}}{\\text{Equity}}" },
            ],
            termEn: [{ fa: "بازده حقوق صاحبان سهام", en: "Return on Equity (ROE)" }],
            quiz: [
              {
                id: "q1",
                question: "ROE چه چیزی را اندازه می‌گیرد؟",
                options: ["بازده برای سهامداران", "نقدینگی شرکت", "بدهی به دارایی"],
                correctIndex: 0,
                explanation: "ROE سود خالص نسبت به حقوق سهامداران را نشان می‌دهد.",
                topic: "FSA",
              },
            ],
          },
        ],
      },
      {
        id: "cfa1-equity",
        title: "سهام و سرمایه‌گذاری",
        titleEn: "Equity Investments",
        lessons: [
          {
            id: "cfa1-equity-l1",
            title: "ارزش‌گذاری سهام",
            titleEn: "Equity Valuation",
            duration: 26,
            status: "locked",
            theory: ["مدل‌های ارزش‌گذاری شامل DDM، DCF و نسبت‌های قیمت‌گذاری مانند P/E هستند."],
            formulas: [
              { label: "مدل گوردون", latex: "P_0 = \\frac{D_1}{r - g}" },
            ],
            termEn: [{ fa: "مدل تنزیل سود", en: "Dividend Discount Model" }],
            quiz: [
              {
                id: "q1",
                question: "در مدل گوردون، g چه چیزی است؟",
                options: ["نرخ رشد سود سهام", "نرخ تنزیل", "نرخ بهره بانکی"],
                correctIndex: 0,
                explanation: "g نرخ رشد دائمی سود سهام است و باید کمتر از r باشد.",
                topic: "Equity",
              },
            ],
          },
        ],
      },
      {
        id: "cfa1-fixed-income",
        title: "درآمد ثابت",
        titleEn: "Fixed Income",
        lessons: [
          {
            id: "cfa1-fi-l1",
            title: "مبانی اوراق قرضه",
            titleEn: "Bond Fundamentals",
            duration: 23,
            status: "locked",
            theory: [
              "اوراق قرضه ابزارهای بدهی هستند که پرداخت‌های دوره‌ای (کوپن) و بازپرداخت اصل در سررسید را تضمین می‌کنند.",
              "دوره وامی (Duration) حساسیت قیمت اوراق به تغییر نرخ بهره را اندازه می‌گیرد.",
            ],
            formulas: [
              { label: "قیمت اوراق قرضه", latex: "P = \\sum_{t=1}^{n} \\frac{C_t}{(1+y)^t} + \\frac{F}{(1+y)^n}" },
              { label: "دوره وامی مک‌آلی", latex: "D = \\frac{\\sum_{t=1}^{n} t \\times PV(CF_t)}{P}" },
            ],
            termEn: [{ fa: "دوره وامی", en: "Duration" }, { fa: "بازده تا سررسید", en: "Yield to Maturity" }],
            quiz: [
              {
                id: "q1",
                question: "دوره وامی چه چیزی را اندازه می‌گیرد؟",
                options: ["حساسیت قیمت به نرخ بهره", "ریسک اعتباری", "نقدینگی اوراق"],
                correctIndex: 0,
                explanation: "دوره وامی حساسیت قیمت اوراق قرضه به تغییرات نرخ بهره را اندازه می‌گیرد.",
                topic: "Fixed Income",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "caia-level-1",
    title: "CAIA Level 1",
    titleEn: "Chartered Alternative Investment Analyst Level I",
    category: "CAIA",
    level: "سطح ۱",
    description:
      "آشنایی با سرمایه‌گذاری‌های جایگزین شامل املاک، صندوق‌های پوشش ریسک و سهام خصوصی.",
    color: "#F59E0B",
    icon: "briefcase",
    modules: [
      {
        id: "caia1-realestate",
        title: "املاک و مستغلات",
        titleEn: "Real Estate",
        lessons: [
          {
            id: "caia1-re-l1",
            title: "ارزش‌گذاری املاک",
            titleEn: "Real Estate Valuation",
            duration: 22,
            status: "locked",
            theory: [
              "ارزش‌گذاری املاک با سه روش مقایبه‌ای، درآمدی و هزینه‌ای انجام می‌شود.",
              "در روش درآمدی، ارزش فعلی جریان‌های نقدی آینده (اجاره و فروش) محاسبه می‌شود.",
            ],
            formulas: [
              { label: "نسبت قیمت به اجاره", latex: "\\text{P/rent} = \\frac{\\text{Price}}{\\text{Annual Rent}}" },
              { label: "نرخ سرمایه‌گذاری", latex: "\\text{Cap Rate} = \\frac{\\text{NOI}}{\\text{Price}}" },
            ],
            termEn: [{ fa: "درآمد خالص عملیاتی", en: "Net Operating Income (NOI)" }, { fa: "نرخ سرمایه‌گذاری", en: "Capitalization Rate" }],
            quiz: [
              {
                id: "q1",
                question: "نرخ سرمایه‌گذاری (Cap Rate) چگونه محاسبه می‌شود؟",
                options: ["NOI / Price", "Price / NOI", "NOI × Price"],
                correctIndex: 0,
                explanation: "Cap Rate = NOI / Price و بازده سالانه املاک بدون اهرم را نشان می‌دهد.",
                topic: "Real Estate",
              },
            ],
          },
        ],
      },
      {
        id: "caia1-hedge",
        title: "صندوق‌های پوشش ریسک",
        titleEn: "Hedge Funds",
        lessons: [
          {
            id: "caia1-hf-l1",
            title: "استراتژی‌های صندوق پوشش ریسک",
            titleEn: "Hedge Fund Strategies",
            duration: 28,
            status: "locked",
            theory: [
              "صندوق‌های پوشش ریسک از استراتژی‌های متنوعی مانند Long/Short، Arbitrage و Global Macro استفاده می‌کنند.",
              "شاخص‌های عملکرد شامل شارپ، سورتیس و کالمر هستند که بازده را نسبت به ریسک تنظیم می‌کنند.",
            ],
            formulas: [
              { label: "نسبت شارپ", latex: "\\text{Sharpe} = \\frac{R_p - R_f}{\\sigma_p}" },
              { label: "نسبت سورتیس", latex: "\\text{Sortino} = \\frac{R_p - R_f}{\\sigma_{downside}}" },
            ],
            termEn: [{ fa: "نسبت شارپ", en: "Sharpe Ratio" }, { fa: "بهره اهرمی", en: "Leverage" }],
            quiz: [
              {
                id: "q1",
                question: "نسبت شارپ چه چیزی را اندازه می‌گیرد؟",
                options: [
                  "بازده مازاد بر ریسک‌پایه به ازای هر واحد انحراف معیار",
                  "نقدینگی صندوق",
                  "هزینه مدیریت",
                ],
                correctIndex: 0,
                explanation: "نسبت شارپ = (بازده - نرخ بدون ریسک) / انحراف معیار بازده.",
                topic: "Hedge Funds",
              },
            ],
          },
        ],
      },
      {
        id: "caia1-pe",
        title: "سهام خصوصی",
        titleEn: "Private Equity",
        lessons: [
          {
            id: "caia1-pe-l1",
            title: "مبانی سهام خصوصی",
            titleEn: "Private Equity Fundamentals",
            duration: 25,
            status: "locked",
            theory: [
              "صندوق‌های سهام خصوصی در شرکت‌های خصوصی سرمایه‌گذاری می‌کنند و معمولاً ۵ تا ۱۰ ساله هستند.",
              "IRR و MOIC معیارهای اصلی عملکرد در سهام خصوصی هستند.",
            ],
            formulas: [
              { label: "ضریب سرمایه چند برابری", latex: "\\text{MOIC} = \\frac{\\text{Total Distributions}}{\\text{Total Capital Called}}" },
            ],
            termEn: [{ fa: "نرخ بازده داخلی", en: "Internal Rate of Return (IRR)" }, { fa: "فراخوان سرمایه", en: "Capital Call" }],
            quiz: [
              {
                id: "q1",
                question: "MOIC چه چیزی را نشان می‌دهد؟",
                options: ["چند برابر شدن سرمایه", "نقدینگی بازار", "ریسک اعتباری"],
                correctIndex: 0,
                explanation: "MOIC نسبت کل توزیع‌ها به سرمایه فراخوان‌شده را نشان می‌دهد.",
                topic: "Private Equity",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "frm-level-1",
    title: "FRM Level 1",
    titleEn: "Financial Risk Manager Level I",
    category: "FRM",
    level: "سطح ۱",
    description: "مدیریت ریسک مالی، ارزش در معرض ریسک (VaR) و مدل‌های ریسک اعتباری.",
    color: "#3B82F6",
    icon: "shield",
    comingSoon: true,
    modules: [],
  },
  {
    id: "cmt-level-1",
    title: "تحلیل تکنیکال پیشرفته",
    titleEn: "Chartered Market Technician",
    category: "CMT",
    level: "سطح ۱",
    description: "تحلیل الگوهای نموداری، اندیکاتورهای تکنیکال و موج‌نگاری الیوت.",
    color: "#EC4899",
    icon: "candle",
    comingSoon: true,
    modules: [],
  },
];

export const categoryLabels: Record<CourseCategory | "ALL", string> = {
  ALL: "همه",
  CFA: "CFA",
  CAIA: "CAIA",
  FRM: "FRM",
  CMT: "تکنیکال",
  STOCK: "بورس",
  PYTHON: "پایتون",
};

export const allLessons: Lesson[] = courses.flatMap((c) =>
  c.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, _courseId: c.id, _courseTitle: c.title, _moduleTitle: m.title }))
  )
);

export const totalLessons = allLessons.length;
export const freeLessons = allLessons.filter((l) => l.status === "free").length;
