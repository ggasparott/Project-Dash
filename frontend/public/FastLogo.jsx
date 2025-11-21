export default function FastLogo({ className = "w-32 h-auto" }) {
  return (
    <svg 
      viewBox="0 0 300 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Raio */}
      <g>
        <path
          d="M45 20 L35 45 L50 45 L40 75 L60 45 L48 45 L55 20 Z"
          fill="#38B6FF"
          stroke="#F8F9FA"
          strokeWidth="2"
        />
        <path
          d="M45 20 L35 45 L50 45 L40 75 L60 45 L48 45 L55 20 Z"
          fill="url(#lightningGradient)"
          opacity="0.6"
        />
      </g>

      {/* Texto "fast" */}
      <text
        x="75"
        y="65"
        fontFamily="Poppins, sans-serif"
        fontSize="48"
        fontWeight="700"
        fill="#F8F9FA"
        letterSpacing="-1"
      >
        fast
      </text>

      {/* Gradiente para o raio */}
      <defs>
        <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38B6FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#004C99" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
