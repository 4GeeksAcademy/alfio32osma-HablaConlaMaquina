import { MetricCard } from '@/src/components/common/MetricCard'
import type { SessionMetrics, Usage } from '@/src/states/chat.types'
import { formatMs, formatNumber, formatTps } from '@/src/utils/format'

interface UsagePanelProps {
  usage: Usage
  lastMetrics: SessionMetrics | null
}

export const UsagePanel = ({ usage, lastMetrics }: UsagePanelProps) => {
  const total = Math.max(usage.totalTokens, 1)
  const promptProgress = (usage.promptTokens / total) * 100
  const completionProgress = (usage.completionTokens / total) * 100

  return (
    <aside className="hidden h-full min-h-0 w-[280px] flex-col border-l border-[#464554]/30 bg-[#060e20]/80 xl:flex">
      <div className="border-b border-[#464554]/20 px-5 py-5">
        <div className="mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#d0bcff]">analytics</span>
          <h2 className="text-lg font-bold text-[#c0c1ff]">Token Usage</h2>
        </div>
        <p className="text-[11px] uppercase tracking-[0.08em] text-[#c7c4d7]">Sesion activa</p>
      </div>

      <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-5 py-4">
        <MetricCard
          label="Prompt tokens"
          value={formatNumber(usage.promptTokens)}
          progress={promptProgress}
        />
        <MetricCard
          label="Completion tokens"
          value={formatNumber(usage.completionTokens)}
          progress={completionProgress}
        />
        <MetricCard label="Tokens totales" value={formatNumber(usage.totalTokens)} />
        <MetricCard label="Modelo" value={lastMetrics?.model ?? 'sin datos'} />
        <MetricCard
          label="Tiempo de respuesta"
          value={lastMetrics ? formatMs(lastMetrics.latencyMs) : 'sin datos'}
        />
        <MetricCard
          label="Tokens por segundo"
          value={lastMetrics ? formatTps(lastMetrics.tokensPerSecond) : 'sin datos'}
        />

        <div className="relative mt-2 overflow-hidden rounded-xl border border-[#464554]/30">
          <div className="h-28 bg-[radial-gradient(circle_at_20%_20%,rgba(208,188,255,0.2),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(192,193,255,0.18),transparent_40%),#131b2e]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-[#d0bcff]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#d0bcff]" />
            Live processing
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <button
          type="button"
          className="w-full rounded-lg border border-[#464554]/40 px-4 py-2 text-sm text-[#c7c4d7] transition hover:bg-[#2d3449]/40"
        >
          View Full Analytics
        </button>
      </div>
    </aside>
  )
}
