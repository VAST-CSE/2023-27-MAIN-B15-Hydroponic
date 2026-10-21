import React from 'react'
import { formatValue } from '../../utils/formatting'

export default function MetricSummary({ label, average, min, max, current, unit, decimals }) {
  const stats = [
    { label: 'Current', value: current },
    { label: 'Average', value: average },
    { label: 'Minimum', value: min },
    { label: 'Maximum', value: max },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-ink-100 bg-white p-4 shadow-panel">
          <p className="text-xs text-ink-400">{s.label}</p>
          <p className="readout mt-1 text-xl font-semibold text-ink-800">
            {formatValue(s.value, decimals)}
            <span className="ml-1 text-xs font-normal text-ink-400">{unit}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
