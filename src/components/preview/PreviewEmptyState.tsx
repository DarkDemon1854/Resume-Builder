export default function PreviewEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a3a3a3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-400">No content yet</p>
        <p className="mt-1 text-xs text-zinc-500">
          Start filling in the sections on the left to see your resume preview here.
        </p>
      </div>
    </div>
  )
}
