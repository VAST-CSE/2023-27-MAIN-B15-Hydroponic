import React from 'react'
import * as Icons from 'lucide-react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { SENSOR_META } from '../../data/mockSensors'
import { THRESHOLDS, STATUS_STYLES } from '../../utils/thresholds'
import { formatValue } from '../../utils/formatting'

// Compact sensor card used on the Dashboard grid.
export default function SensorCard({ sensorKey, value, previousValue, status, onClick }) {
  const meta = SENSOR_META[sensorKey]
  const threshold = THRESHOLDS[sensorKey]
  const style = STATUS_STYLES[status] || STATUS_STYLES.optimal
  const Icon = Icons[meta.icon] || Icons.Gauge

  const delta =
    previousValue !== undefined && previousValue !== null && value !== undefined
      ? value - previousValue
      : 0
  const pctChange = previousValue ? (delta / previousValue) * 100 : 0
  const trendUp = delta > 0

  return (
    <button
      onClick={onClick}
      className={`group flex w-full flex-col gap-3 rounded-xl border bg-white p-4 text-left shadow-panel transition hover:-translate-y-0.5 hover:shadow-md ${style.border}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.bg}`}>
            <Icon className={`h-4 w-4 ${style.text}`} />
          </span>
          <span className="text-sm font-medium text-ink-600">{meta.label}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="readout text-2xl font-semibold text-ink-800">
          {formatValue(value, meta.decimals)}
        </span>
        <span className="text-xs text-ink-400">{meta.unit}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${style.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {status === 'optimal' ? 'Optimal' : status === 'warning' ? 'Warning' : 'Critical'}
        </span>
        {Math.abs(pctChange) > 0.01 && (
          <span className={`flex items-center gap-0.5 text-xs ${trendUp ? 'text-hydro-500' : 'text-ink-400'}`}>
            {trendUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(pctChange).toFixed(1)}%
          </span>
        )}
      </div>

      <p className="text-[11px] text-ink-400">
        Range {threshold.min}–{threshold.max} {threshold.unit}
      </p>
    </button>
  )
}
