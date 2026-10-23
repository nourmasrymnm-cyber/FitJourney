export default function Logo({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" role="img" aria-label="FitJourney">
      <rect width="96" height="96" rx="26" fill="#16201b" stroke="#2a3a33" />
      <path d="M22 62 L40 44 L52 54 L74 30" fill="none" stroke="#5fd39a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 30 H74 V42" fill="none" stroke="#5fd39a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
