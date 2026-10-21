import React from 'react'
import { HeartPulse } from 'lucide-react'

// Aggregate "system health" ring — derived from how many sensors are
// currently within their optimal range.
export default function FarmHealth({ statuses }) {
  const values = Object.values(statuses)
  const optimalCount = values.filter((s) => s === 'optimal').length
  const score = values.length ? Math.round((optimalCount / values.length) * 100) : 0

  const label = score >= 85 ? 'Healthy' : score >= 60 ? 'Needs Attention' : 'Critical'
  const ringColor = score >= 85 ? '#2f6b4f' : score >= 60 ? '#c9822b' : '#b3261e'

  const circumference = 2 * Math.PI * 42
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex items-center gap-5 rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#e7e9e6" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="readout text-xl font-semibold text-ink-800">{score}%</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-400">
          <HeartPulse className="h-3.5 w-3.5" />
          System Health
        </div>
        <p className="mt-1 text-lg font-semibold text-ink-800">{label}</p>
        <p className="mt-1 text-sm text-ink-400">
          {optimalCount} of {values.length} sensors within optimal range.
        </p>
      </div>
    </div>
  )
}
