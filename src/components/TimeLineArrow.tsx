export default function TimelineArrow({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} z-20 bg-white rounded-full shadow p-2 flex items-center justify-center`}
      onClick={onClick}
      aria-label={`Scroll timeline ${direction}`}
      type="button"
    >
      {direction === 'left' ? (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#213547" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      ) : (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#213547" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      )}
    </button>
  );
}