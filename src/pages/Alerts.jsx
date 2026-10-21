import React, { useState } from 'react'
import AlertList from '../components/alerts/AlertList'
import LoadingState from '../components/common/LoadingState'

const FILTERS = ['all', 'critical', 'warning', 'info']

export default function Alerts({ alerts }) {
  const { alerts: alertList, loading, unreadCount, markRead, markAllRead } = alerts
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? alertList : alertList.filter((a) => a.severity === filter)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-ink-800">Alerts</h1>
          <p className="text-sm text-ink-400">
            {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount === 1 ? '' : 's'}` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="rounded-lg border border-ink-100 bg-white px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-ink-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === f ? 'bg-canopy-600 text-white' : 'bg-ink-50 text-ink-500 hover:bg-ink-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? <LoadingState label="Loading alerts" /> : <AlertList alerts={filtered} onMarkRead={markRead} />}
    </div>
  )
}
