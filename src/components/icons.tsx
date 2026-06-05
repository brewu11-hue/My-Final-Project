import type { LucideProps } from "lucide-react";

export const Icons = {
  Logo: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
    >
      <defs>
        <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      
      {/* Globe Grid */}
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <ellipse cx="50" cy="50" rx="45" ry="15" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <ellipse cx="50" cy="50" rx="15" ry="45" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

      {/* The metallic 'T' */}
      <path
        d="M20 35 H55 V45 H42 V80 H32 V45 H20 V35Z"
        fill="url(#silver-grad)"
        stroke="#1e293b"
        strokeWidth="0.5"
      />
      
      {/* The blue 'T' */}
      <path
        d="M45 40 H80 V50 H67 V85 H57 V50 H45 V40Z"
        fill="url(#blue-grad)"
        stroke="#075985"
        strokeWidth="0.5"
      />

      {/* The Swoosh */}
      <path
        d="M15 70 C 25 85, 75 85, 85 55"
        stroke="url(#silver-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  Eft: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22V12" />
      <path d="M12 12H4.5" />
      <path d="M12 12H20" />
      <path d="M12 12l-4-4" />
      <path d="M12 12l4-4" />
      <path d="M12 12l-4 4" />
      <path d="M12 12l4 4" />
      <path d="M5 22V18" />
      <path d="M5 18H2" />
      <path d="M5 18H8" />
      <path d="M19 22V18" />
      <path d="M19 18H16" />
      <path d="M19 18H22" />
      <path d="M5 6V2" />
      <path d="M5 2H2" />
      <path d="M5 2H8" />
      <path d="M19 6V2" />
      <path d="M19 2H16" />
      <path d="M19 2H22" />
      <path d="M12 2v4" />
      <path d="M10 4h4" />
    </svg>
  ),
  Pop: (props: LucideProps) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 12v6" />
        <path d="m15 15-3-3-3 3" />
        <path d="M10 12h.01" />
        <path d="M14 12h.01" />
    </svg>
  ),
};
