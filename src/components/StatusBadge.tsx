interface StatusBadgeProps {
  statusText?: string;
  className?: string;
}

export const StatusBadge = ({
  statusText = "Open to opportunities",
  className = ""
}: StatusBadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono tracking-wide font-medium backdrop-blur-sm ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>{statusText}</span>
    </div>
  );
};
