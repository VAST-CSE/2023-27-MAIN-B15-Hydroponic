import React from 'react'
import { AlertOctagon, AlertTriangle, Info } from 'lucide-react'
import { formatRelativeTime, formatClockTime } from '../../utils/formatting'

const SEVERITY = {
  critical: { icon: AlertOctagon, text: 'text-rust-500', bg: 'bg-rust-50', border: 'border-rust-100', label: 'Critical' },
  warning: { icon: AlertTriangle, text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', label: 'Warning' },
  info: { icon: Info, text: 'text-hydro-500', bg: 'bg-hydro-50', border: 'border-hydro-100', label: 'Info' },
}

export default function AlertCard({ alert, onMarkRead }) {
  const cfg = SEVERITY[alert.severity]
  const Icon = cfg.icon

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border bg-white p-4 shadow-panel ${
        alert.read ? 'border-ink-100' : cfg.border
      }`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cfg.bg}`}>
        <Icon className={`h-4.5 w-4.5 ${cfg.text}`} size={18} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs font-semibold uppercase tracking-wide ${cfg.text}`}>{cfg.label}</span>
          {!alert.read && <span className="h-1.5 w-1.5 rounded-full bg-canopy-600" />}
        </div>
        <p className={`mt-0.5 text-sm ${alert.read ? 'text-ink-600' : 'font-medium text-ink-800'}`}>
          {alert.title}
        </p>
        <p className="mt-0.5 text-sm text-ink-400">{alert.description}</p>
        <p className="mt-1.5 text-xs text-ink-400">
          {alert.source} · {formatClockTime(alert.timestamp)} · {formatRelativeTime(alert.timestamp)}
        </p>
      </div>

      {!alert.read && (
        <button
          onClick={() => onMarkRead(alert.id)}
          className="shrink-0 rounded-lg border border-ink-100 px-2.5 py-1 text-xs font-medium text-ink-500 hover:bg-ink-50"
        >
          Mark read
        </button>
      )}
    </div>
  )
}
