export interface MockQuestion {
  id: string;
  question: string;
  questionEn?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: "پایه" | "متوسط" | "پیشرفته";
}

export const mockQuestions: MockQuestion[] = [
  {
    id: "mock-1",
    question: "اگر ۲٬۰۰۰ دلار با نرخ ۱۰٪ سالانه به مدت ۴ سال سرمایه‌گذاری شود، ارزش آینده چقدر است؟",
    questionEn: "FV of $2,000 at 10% for 4 years",
    options: ["۲٬۹۲۸٫۲۰ دلار", "۲٬۸۰۰٫۰۰ دلار", "۲٬۵۰۰٫۰۰ دلار"],
    correctIndex: 0,
    explanation: "FV = 2000 × (1.10)⁴ = 2000 × 1.4641 = ۲٬۹۲۸٫۲۰ دلار",
    topic: "TVM",
    difficulty: "پایه",
  },
  {
    id: "mock-2",
    question: "کدام نسبت برای سنجش نقدینگی کوتاه‌مدت شرکت استفاده می‌شود؟",
    options: ["نسبت جاری", "نسبت P/E", "نسبت دیبان"],
    correctIndex: 0,
    explanation: "نسبت جاری (دارایی جاری / بدهی جاری) توان پرداخت بدهی‌های کوتاه‌مدت را می‌سنجد.",
    topic: "FSA",
    difficulty: "پایه",
  },
  {
    id: "mock-3",
    question: "در مدل CAPM، بتا (β) چه چیزی را اندازه می‌گیرد؟",
    options: ["ریسک سیستماتیک", "ریسک غیرسیستماتیک", "نقدینگی بازار"],
    correctIndex: 0,
    explanation: "بتا حساسیت بازده سهام به تغییرات بازده بازار (ریسک سیستماتیک) را اندازه می‌گیرد.",
    topic: "Equity",
    difficulty: "متوسط",
  },
  {
    id: "mock-4",
    question: "دوره وامی (Duration) چه چیزی را در اوراق قرضه اندازه می‌گیرد؟",
    options: [
      "حساسیت قیمت به تغییر نرخ بهره",
      "ریسک اعتباری صادرکننده",
      "نقدینگی اوراق",
    ],
    correctIndex: 0,
    explanation: "دوره وامی نشان می‌دهد قیمت اوراق قرضه با تغییر ۱٪ نرخ بهره چقدر تغییر می‌کند.",
    topic: "Fixed Income",
    difficulty: "متوسط",
  },
  {
    id: "mock-5",
    question: "نسبت شارپ را با R_p=۱۵٪، R_f=۳٪، σ=۱۰٪ محاسبه کنید.",
    options: ["۱٫۲", "۰٫۸", "۱٫۵"],
    correctIndex: 0,
    explanation: "Sharpe = (15 - 3) / 10 = 12 / 10 = 1.2",
    topic: "Risk",
    difficulty: "پیشرفته",
  },
];
