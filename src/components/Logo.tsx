import React from 'react';

export const Logo = ({ className = "w-9 h-9" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--logo-stop-1)" />
          <stop offset="100%" stopColor="var(--logo-stop-2)" />
        </linearGradient>
        <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--logo-stop-light-1)" />
          <stop offset="100%" stopColor="var(--logo-stop-light-2)" />
        </linearGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background/Base Shape */}
      <path
        d="M50 5 L95 30 L95 70 L50 95 L5 70 L5 30 Z"
        fill="url(#logoGradient)"
        opacity="0.15"
      />

      {/* Main Wing/Paper Plane Shape */}
      <path
        d="M20 75 L50 15 L80 75 L50 60 Z"
        fill="url(#logoGradient)"
        filter="url(#glow)"
      />

      {/* Inner Spark/AI Core */}
      <path
        d="M50 35 L60 55 L50 50 L40 55 Z"
        fill="#ffffff"
        opacity="0.9"
      />
      
      {/* Accent Lines */}
      <path
        d="M50 60 L50 85"
        stroke="url(#logoGradientLight)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="50" cy="85" r="3" fill="#ffffff" />
    </svg>
  );
};
