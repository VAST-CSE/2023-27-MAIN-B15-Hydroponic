import React from 'react'
import { Link } from 'react-router-dom'
import { AlertOctagon, AlertTriangle, Info } from 'lucide-react'
import { formatRelativeTime } from '../../utils/formatting'
import EmptyState from '../common/EmptyState'

const SEVERITY_ICON = { critical: AlertOctagon, warning: AlertTriangle, info: Info }
const SEVERITY_TEXT = { critical: 'text-rust-500', warning: 'text-amber-600', info: 'text-hydro-500' }

export default function RecentAlerts({ alerts }) {
  const recent = alerts.slice(0, 4)

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-ink-800">Recent Alerts</h3>
        <Link to="/alerts" className="text-xs font-medium text-canopy-700 hover:underline">
          View all
        </Link>
      </div>

      {recent.length === 0 ? (
        <EmptyState title="No alerts" description="Everything is running within range." />
      ) : (
        <div className="mt-3 space-y-1">
          {recent.map((alert) => {
            const Icon = SEVERITY_ICON[alert.severity]
            return (
              <div key={alert.id} className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-ink-50">
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${SEVERITY_TEXT[alert.severity]}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm ${alert.read ? 'text-ink-500' : 'font-medium text-ink-800'}`}>
                    {alert.title}
                  </p>
                  <p className="text-xs text-ink-400">
                    {alert.source} · {formatRelativeTime(alert.timestamp)}
                  </p>
                </div>
                {!alert.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-canopy-600" />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
