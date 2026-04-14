import React from 'react';

interface KoboTrackLogoProps {
  size?: number;
  variant?: 'dark' | 'light';
  showWordmark?: boolean;
  className?: string;
}

export default function KoboTrackLogo({
  size = 36,
  variant = 'dark',
  showWordmark = false,
  className = '',
}: KoboTrackLogoProps) {
  const wordmarkColor = variant === 'dark' ? '#0F172A' : '#FFFFFF';
  const dotColor = '#2563EB';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M20 2L4 9v10c0 9.4 6.8 18.2 16 20 9.2-1.8 16-10.6 16-20V9L20 2z"
          fill="#0F172A"
        />
        <path
          d="M20 2L4 9v10c0 9.4 6.8 18.2 16 20 9.2-1.8 16-10.6 16-20V9L20 2z"
          fill="url(#kt-shield-grad)"
          opacity="0.4"
        />
        <text
          x="8"
          y="22"
          fontFamily="'Arial Black', 'Arial', sans-serif"
          fontWeight="900"
          fontSize="13"
          fill="white"
          letterSpacing="-0.5"
        >K</text>
        <text
          x="19.5"
          y="22"
          fontFamily="'Arial Black', 'Arial', sans-serif"
          fontWeight="900"
          fontSize="13"
          fill="#60A5FA"
          letterSpacing="-0.5"
        >T</text>
        <text
          x="20"
          y="32"
          textAnchor="middle"
          fontFamily="'Arial', sans-serif"
          fontWeight="600"
          fontSize="3"
          fill="#93C5FD"
          letterSpacing="0.4"
        >KoboTrack</text>

        <defs>
          <linearGradient id="kt-shield-grad" x1="4" y1="2" x2="36" y2="39" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {showWordmark && (
        <span
          style={{ color: wordmarkColor }}
          className="font-black text-xl tracking-tighter leading-none"
        >
          KOBOTRACK
          <span style={{ color: dotColor }}>.</span>
        </span>
      )}
      <p className='text-lg font-bold text-[#2563EB]'>KoboTrack</p>
    </div>
  );
}
