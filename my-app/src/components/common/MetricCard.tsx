interface MetricCardProps {
  label: string
  value: string
  progress?: number
}

export const MetricCard = ({ label, value, progress }: MetricCardProps) => {
  const safeProgress = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null

  return (
    <article className="rounded-xl border border-[#464554]/40 bg-[#171f33]/60 p-3 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] uppercase tracking-[0.08em] text-[#c7c4d7]">{label}</p>
        <p className="font-mono text-sm font-semibold text-[#c0c1ff]">{value}</p>
      </div>
      {safeProgress !== null ? (
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#2d3449]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#8083ff] to-[#c0c1ff]"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      ) : null}
    </article>
  )
}
