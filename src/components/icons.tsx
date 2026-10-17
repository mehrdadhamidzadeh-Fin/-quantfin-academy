interface IconProps {
  className?: string;
  size?: number;
}

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  className,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
});

export const HomeIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const BookIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const ExamIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
    <path d="M9 9h1M9 13h6M9 17h6" />
  </svg>
);

export const CalculatorIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size, className)}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="14" x2="8" y2="14" />
    <line x1="12" y1="14" x2="12" y2="14" />
    <line x1="16" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="8" y2="18" />
    <line x1="12" y1="18" x2="12" y2="18" />
    <line x1="16" y1="18" x2="16" y2="18" />
    <line x1="12" y1="10" x2="12" y2="10" />
    <line x1="16" y1="10" x2="16" y2="10" />
  </svg>
);

export const FormulaIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M4 7V4h16v3" />
    <path d="M9 20h6" />
    <path d="M12 4v16" />
  </svg>
);

export const LockIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size, className)}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const CheckIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CheckCircleIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const ClockIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const FlameIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export const TrophyIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

export const SearchIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const SparklesIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
  </svg>
);

export const ArrowLeftIcon = ({ size = 22, className }: IconProps) => (
  <svg {...base(size, className)}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const ArrowRightIcon = ({ size = 22, className }: IconProps) => (
  <svg {...base(size, className)}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const PlayIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const CloseIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size, className)}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const TrendUpIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export const CrownIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M2 4l3 12h14l3-12-6 7-4-9-4 9-6-7z" />
    <path d="M5 20h14" />
  </svg>
);

export const BriefcaseIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size, className)}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const ShieldIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size, className)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const CandleIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size, className)}>
    <line x1="6" y1="2" x2="6" y2="22" />
    <rect x="3" y="7" width="6" height="10" rx="1" />
    <line x1="18" y1="3" x2="18" y2="21" />
    <rect x="15" y="5" width="6" height="12" rx="1" />
  </svg>
);

export const SendIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const ChevronLeftIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ChevronDownIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const courseIcons: Record<string, React.FC<IconProps>> = {
  "chart-line": TrendUpIcon,
  briefcase: BriefcaseIcon,
  shield: ShieldIcon,
  candle: CandleIcon,
};
