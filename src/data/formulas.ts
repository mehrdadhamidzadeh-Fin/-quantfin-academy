export interface FormulaEntry {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  latex: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
}

export const formulas: FormulaEntry[] = [
  {
    id: "f-tvm-fv",
    name: "ارزش آینده",
    nameEn: "Future Value",
    category: "TVM",
    latex: "FV = PV \\times (1 + r)^n",
    description: "محاسبه ارزش آینده یک سرمایه فعلی با نرخ بهره مرکب r در n دوره.",
    variables: [
      { symbol: "FV", meaning: "ارزش آینده" },
      { symbol: "PV", meaning: "ارزش فعلی" },
      { symbol: "r", meaning: "نرخ بهره هر دوره" },
      { symbol: "n", meaning: "تعداد دوره‌ها" },
    ],
  },
  {
    id: "f-tvm-pv",
    name: "ارزش فعلی",
    nameEn: "Present Value",
    category: "TVM",
    latex: "PV = \\frac{FV}{(1 + r)^n}",
    description: "تنزیل یک جریان نقدی آینده به ارزش امروز.",
    variables: [
      { symbol: "PV", meaning: "ارزش فعلی" },
      { symbol: "FV", meaning: "ارزش آینده" },
      { symbol: "r", meaning: "نرخ تنزیل" },
      { symbol: "n", meaning: "تعداد دوره‌ها" },
    ],
  },
  {
    id: "f-tvm-annuity",
    name: "ارزش فعلی آنوئیته",
    nameEn: "Present Value of Annuity",
    category: "TVM",
    latex: "PV = PMT \\times \\frac{1 - (1+r)^{-n}}{r}",
    description: "ارزش فعلی مجموعه‌ای از پرداخت‌های مساوی و دوره‌ای.",
    variables: [
      { symbol: "PMT", meaning: "پرداخت هر دوره" },
      { symbol: "r", meaning: "نرخ بهره" },
      { symbol: "n", meaning: "تعداد دوره‌ها" },
    ],
  },
  {
    id: "f-tvm-pmt",
    name: "محاسبه پرداخت",
    nameEn: "Payment Calculation",
    category: "TVM",
    latex: "PMT = PV \\times \\frac{r(1+r)^n}{(1+r)^n - 1}",
    description: "پرداخت دوره‌ای لازم برای بازپرداخت یک وام در n دوره با نرخ r.",
    variables: [
      { symbol: "PMT", meaning: "پرداخت هر دوره" },
      { symbol: "PV", meaning: "مبلغ وام" },
      { symbol: "r", meaning: "نرخ بهره" },
      { symbol: "n", meaning: "تعداد دوره‌ها" },
    ],
  },
  {
    id: "f-bond-price",
    name: "قیمت اوراق قرضه",
    nameEn: "Bond Price",
    category: "Fixed Income",
    latex: "P = \\sum_{t=1}^{n} \\frac{C_t}{(1+y)^t} + \\frac{F}{(1+y)^n}",
    description: "ارزش فعلی کل کوپن‌ها و اصل سرمایه سررسید با بازده y.",
    variables: [
      { symbol: "C_t", meaning: "کوپن دوره t" },
      { symbol: "F", meaning: "ارزش اسمی (Face Value)" },
      { symbol: "y", meaning: "بازده تا سررسید (YTM)" },
      { symbol: "n", meaning: "تعداد دوره‌ها" },
    ],
  },
  {
    id: "f-duration",
    name: "دوره وامی مک‌آلی",
    nameEn: "Macaulay Duration",
    category: "Fixed Income",
    latex: "D = \\frac{\\sum_{t=1}^{n} t \\cdot PV(CF_t)}{P}",
    description: "میانگین وزنی زمان تا دریافت جریان‌های نقدی اوراق قرضه.",
    variables: [
      { symbol: "PV(CF_t)", meaning: "ارزش فعلی جریان نقدی دوره t" },
      { symbol: "P", meaning: "قیمت اوراق" },
    ],
  },
  {
    id: "f-capm",
    name: "مدل قیمت‌گذاری دارایی سرمایه‌ای",
    nameEn: "CAPM",
    category: "Equity",
    latex: "E(R_i) = R_f + \\beta_i \\times (E(R_m) - R_f)",
    description: "بازده مورد انتظار یک دارایی بر اساس ریسک سیستماتیک (بتا).",
    variables: [
      { symbol: "R_f", meaning: "نرخ بدون ریسک" },
      { symbol: "\\beta", meaning: "ضریب بتا (ریسک سیستماتیک)" },
      { symbol: "E(R_m)", meaning: "بازده مورد انتظار بازار" },
    ],
  },
  {
    id: "f-ddm",
    name: "مدل رشد گوردون",
    nameEn: "Gordon Growth Model",
    category: "Equity",
    latex: "P_0 = \\frac{D_1}{r - g}",
    description: "ارزش سهام با فرض رشد دائمی سود سهام.",
    variables: [
      { symbol: "D_1", meaning: "سود سهام دوره بعد" },
      { symbol: "r", meaning: "نرخ بازده مورد انتظار" },
      { symbol: "g", meaning: "نرخ رشد دائمی سود" },
    ],
  },
  {
    id: "f-sharpe",
    name: "نسبت شارپ",
    nameEn: "Sharpe Ratio",
    category: "Risk",
    latex: "\\text{Sharpe} = \\frac{R_p - R_f}{\\sigma_p}",
    description: "بازده مازاد بر نرخ بدون ریسک به ازای هر واحد ریسک (انحراف معیار).",
    variables: [
      { symbol: "R_p", meaning: "بازده پرتفوی" },
      { symbol: "R_f", meaning: "نرخ بدون ریسک" },
      { symbol: "\\sigma_p", meaning: "انحراف معیار بازده پرتفوی" },
    ],
  },
  {
    id: "f-std",
    name: "انحراف معیار",
    nameEn: "Standard Deviation",
    category: "Statistics",
    latex: "s = \\sqrt{\\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n-1}}",
    description: "اندازه‌گیری پراکندگی داده‌ها حول میانگین نمونه.",
    variables: [
      { symbol: "x_i", meaning: "هر مشاهده" },
      { symbol: "\\bar{x}", meaning: "میانگین نمونه" },
      { symbol: "n", meaning: "تعداد مشاهدات" },
    ],
  },
  {
    id: "f-var",
    name: "ارزش در معرض ریسک",
    nameEn: "Value at Risk",
    category: "Risk",
    latex: "\\text{VaR} = \\mu - z_{\\alpha} \\times \\sigma",
    description: "حداکثر زیان مورد انتظار در سطح اطمینان مشخص (مثلاً ۹۵٪).",
    variables: [
      { symbol: "\\mu", meaning: "میانگین بازده" },
      { symbol: "z_{\\alpha}", meaning: "مقدار z برای سطح اطمینان" },
      { symbol: "\\sigma", meaning: "انحراف معیار" },
    ],
  },
  {
    id: "f-roe",
    name: "بازده حقوق صاحبان سهام",
    nameEn: "Return on Equity",
    category: "FSA",
    latex: "ROE = \\frac{\\text{Net Income}}{\\text{Shareholders' Equity}}",
    description: "سود خالص تولید شده به ازای هر دلار حقوق سهامداران.",
    variables: [
      { symbol: "\\text{Net Income}", meaning: "سود خالص" },
      { symbol: "\\text{Equity}", meaning: "حقوق سهامداران" },
    ],
  },
  {
    id: "f-cap-rate",
    name: "نرخ سرمایه‌گذاری",
    nameEn: "Capitalization Rate",
    category: "Real Estate",
    latex: "\\text{Cap Rate} = \\frac{\\text{NOI}}{\\text{Price}}",
    description: "نرخ بازده املاک بدون اهرم، بر اساس درآمد خالص عملیاتی.",
    variables: [
      { symbol: "\\text{NOI}", meaning: "درآمد خالص عملیاتی" },
      { symbol: "\\text{Price}", meaning: "قیمت ملک" },
    ],
  },
  {
    id: "f-irr",
    name: "نرخ بازده داخلی",
    nameEn: "Internal Rate of Return",
    category: "Corporate Finance",
    latex: "0 = \\sum_{t=0}^{n} \\frac{CF_t}{(1+IRR)^t}",
    description: "نرخی که خالص ارزش فعلی (NPV) کل جریان‌های نقدی را صفر می‌کند.",
    variables: [
      { symbol: "CF_t", meaning: "جریان نقدی دوره t" },
      { symbol: "IRR", meaning: "نرخ بازده داخلی" },
    ],
  },
  {
    id: "f-bb-formula",
    name: "فرمول بلک-شولز",
    nameEn: "Black-Scholes Option Pricing",
    category: "Derivatives",
    latex: "C = S_0 N(d_1) - K e^{-rt} N(d_2)",
    description: "قیمت‌گذاری اختیار خرید اروپایی بر اساس قیمت پایه، اعمال، نرخ و زمان.",
    variables: [
      { symbol: "S_0", meaning: "قیمت فعلی پایه" },
      { symbol: "K", meaning: "قیمت اعمال" },
      { symbol: "N(d)", meaning: "تابع توزیع نرمال تجمعی" },
      { symbol: "r", meaning: "نرخ بدون ریسک" },
      { symbol: "t", meaning: "زمان تا سررسید" },
    ],
  },
];
