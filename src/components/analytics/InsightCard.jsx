import React from 'react'
import { Lightbulb } from 'lucide-react'

export default function InsightCard({ insights }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
      <h3 className="font-semibold text-ink-800">System Insights</h3>
      <ul className="mt-3 space-y-3">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-600">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
