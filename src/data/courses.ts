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
        id: "cfa-l1-lm1-returns",
        title: "بازده دارایی‌ها و ابزارهای مالی (Returns of Financial Assets)",
        duration: "۴۵ دقیقه",
        isFree: true,
        summary: "بررسی جامع بازده کل، بازده دوره نگهداری حسابی و هندسی، مرکب‌سازی پیوسته، بازده اهرمی و مؤلفه‌های نرخ بازده مورد انتظار طبق سرفصل ۲۰۲۷ CFA.",
        content: `
### ۱. مفهوم بازده کل (Total Return)

در بازارهای مالی، بازده کل یک دارایی حاصل جمع دو مؤلفه اصلی است: **بازده قیمتی (سود سرمایه‌ای)** و **بازده نقدی پرداختی (سود تقسیمی یا کوپن)**.

$$r_t = r_{\\text{price}} + r_{\\text{distribution}} = \\frac{P_t - P_{t-1} + D_t}{P_{t-1}}$$

* **Price Return ($r_{\\text{price}}$):** درصد تغییر قیمت دارایی نسبت به قیمت خرید.
* **Distribution Return ($r_{\\text{distribution}}$):** نسبت جریان نقدی حاصله به قیمت اولیه (در سهام: **Dividend Yield** و در اوراق قرضه: **Current Yield**).

---

### ۲. بازده دوره نگهداری (Holding Period Return - HPR)

اگر دارایی برای چند دوره نگهداری شود، بازده کل کل دوره از حاصل‌ضرب عوامل رشد به دست می‌آید:

$$1 + HPR = (1 + r_1)(1 + r_2)...(1 + r_T) = \\prod_{t=1}^{T} (1 + r_t)$$

#### مقایسه میانگین حسابی و هندسی (Arithmetic vs. Geometric Mean)
* **میانگین حسابی ($R_A$):** بهترین برآورد نااریب برای **پیش‌بینی بازده دوره بعد (تک‌دوره)** است:
  $$R_A = \\frac{1}{T} \\sum_{t=1}^{T} r_t$$
* **میانگین هندسی / بازده مرکب سالانه ($R_G$):** عملکرد گذشته در **طول زمان و چند دوره** را دقیق نشان می‌دهد:
  $$R_G = \\left( \\prod_{t=1}^{T} (1 + r_t) \\right)^{1/T} - 1$$

> **نکته طلایی آزمون CFA:**  
> همواره رابطه $R_G \\le R_A$ برقرار است؛ مگر اینکه بازده تمام دوره‌ها دقیقاً برابر باشد که در آن صورت $R_G = R_A$ خواهد بود. هرچه نوسان (واریانس) بازده‌ها بیشتر باشد، فاصله بین میانگین حسابی و هندسی بیشتر می‌شود.

---

### ۳. مرکب‌سازی پیوسته (Continuous Compounding)

اگر دفعات مرکب‌سازی به بی‌نهایت میل کند ($m \\to \\infty$)، نرخ بازده پیوسته ($r_{\\text{continuous}}$) از لگاریتم طبیعی نسبت قیمت نهایی به اولیه حاصل می‌شود:

$$r_{\\text{continuous}} = \\ln(1 + HPR) = \\ln\\left(\\frac{P_T}{P_0}\\right)$$

* ویژگی کلیدی در مدلسازی کمی: **بازده‌های پیوسته جمع‌پذیرند (Time-Additive)**:
  $$r_{0, T} = r_{0,1} + r_{1,2} + ... + r_{T-1,T}$$

---

### ۴. بازده اهرمی (Leveraged Return)

سرمایه‌گذار می‌تواند با استقراض بخشی از وجه سرمایه‌گذاری (مارجین)، بازدهی خود را تشدید کند:

$$R_{\\text{leveraged}} = \\frac{V_1 - V_0 - \\text{Interest Cost}}{\\text{Initial Equity}}$$

* اهرم هم بازده مثبت را چند برابر می‌کند و هم در صورت نزول بازار، زیان را با همان ضریب افزایش می‌دهد.

---

### ۵. اجزای نرخ بازده مورد انتظار (Required Rate of Return)

نرخ بازده مورد انتظار سرمایه‌گذار بر اساس معادله فیشر و صرف‌های ریسک (Risk Premia) به اجزای زیر تجزیه می‌شود:

$$r = r_{\\text{real, rf}} + \\pi^e + RP_{\\text{default}} + RP_{\\text{liquidity}} + RP_{\\text{maturity}}$$

1. **نرخ واقعی بدون ریسک ($r_{\\text{real, rf}}$):** ارزش زمانی خالص مصرف بدون تورم.
2. **صرف تورم انتظاری ($\\pi^e$):** جبران کاهش قدرت خرید.
3. **صرف ریسک نکول ($RP_{\\text{default}}$):** جبران ریسک عدم بازپرداخت توسط ناشر.
4. **صرف ریسک نقدشوندگی ($RP_{\\text{liquidity}}$):** جبران هزینه تبدیل دارایی به پول نقد در زمان کوتاه بدون افت شدید قیمت.
5. **صرف ریسک سررسید ($RP_{\\text{maturity}}$):** جبران ریسک حساسیت قیمت اوراق بلندمدت به نوسانات نرخ بهره.
`,
        quiz: [
          {
            id: "q1",
            question: "سهامی به قیمت ۱۰۰ دلار خریداری شده و پس از یک سال به قیمت ۱۰۵ دلار به فروش می‌رسد. اگر در طول دوره ۳ دلار سود نقدی پرداخت شده باشد، بازده کل (Total Return) چقدر است؟",
            options: [
              "۵.۰ درصد",
              "۸.۰ درصد",
              "۳.۰ درصد"
            ],
            correctAnswer: 1,
            explanation: "بازده کل حاصل جمع سود سرمایه‌ای و سود نقدی تقسیم بر قیمت اولیه است:\n Total Return = (105 - 100 + 3) / 100 = 8 / 100 = 8.0%"
          },
          {
            id: "q2",
            question: "اگر بازده سرمایه‌گذاری در سال اول ۲۰٪+ و در سال دوم ۲۰٪- باشد، مقایسه میانگین حسابی و هندسی کدام است؟",
            options: [
              "میانگین حسابی ۰٪ و میانگین هندسی منفی ۲.۰۲٪ است.",
              "هر دو میانگین برابر ۰٪ هستند.",
              "میانگین حسابی ۰٪ و میانگین هندسی منفی ۴.۰٪ است."
            ],
            correctAnswer: 0,
            explanation: "میانگین حسابی: (20% - 20%) / 2 = 0%\nمیانگین هندسی: sqrt[(1 + 0.20)(1 - 0.20)] - 1 = sqrt(0.96) - 1 = 0.9798 - 1 = -2.02%\nاین مثال نشان می‌دهد که با وجود میانگین حسابی صفر، سرمایه‌گذار عملاً ۲.۰۲ درصد زیان مرکب کرده است."
          },
          {
            id: "q3",
            question: "کدام ویژگی مهم، بازده‌های مرکب پیوسته (Continuously Compounded Returns) را در مدل‌سازی مالی متمایز می‌کند؟",
            options: [
              "آن‌ها همیشه بزرگتر از میانگین حسابی دوره‌ای هستند.",
              "خاصیت جمع‌پذیری زمانی (Time-additivity) دارند و جمع بازده‌های پیوسته برابر بازده کل است.",
              "نیازی به نرخ بازده بدون ریسک ندارند."
            ],
            correctAnswer: 1,
            explanation: "بازده‌های پیوسته خاصیت جمع‌پذیری در طول زمان دارند؛ یعنی مجموع بازده‌های روزانه پیوسته در طول ماه، دقیقاً برابر با بازده ماهانه پیوسته است."
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
