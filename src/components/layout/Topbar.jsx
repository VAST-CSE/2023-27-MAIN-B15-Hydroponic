import React, { useState } from 'react'
import { Menu, Bell, Radio } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatRelativeTime } from '../../utils/formatting'
import { STATUS_STYLES } from '../../utils/thresholds'
import { Link } from 'react-router-dom'

const SEVERITY_DOT = {
  critical: 'bg-rust-500',
  warning: 'bg-amber-500',
  info: 'bg-hydro-500',
}

export default function Topbar({ onMenuClick, updatedAt, connected, alerts = [], unreadCount = 0, markRead }) {
  const { systemMode } = useApp()
  const [bellOpen, setBellOpen] = useState(false)
  const latest = alerts.slice(0, 4)

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-100 bg-white/90 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-50 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-base font-semibold text-ink-800 md:text-lg">Hydroponic Farm</h1>
          <p className="text-xs text-ink-400">
            {connected ? (updatedAt ? `Updated ${formatRelativeTime(updatedAt)}` : 'Connecting…') : 'Connection interrupted'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span
          className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium sm:flex ${
            connected ? 'border-canopy-200 text-canopy-700' : 'border-rust-100 text-rust-500'
          }`}
        >
          <Radio className="h-3 w-3" />
          {connected ? 'IoT Connected' : 'Offline'}
        </span>

        <span className="hidden items-center rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-600 sm:inline-flex">
          {systemMode} mode
        </span>

        <div className="relative">
          <button
            onClick={() => setBellOpen((v) => !v)}
            className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rust-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {bellOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setBellOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-ink-100 bg-white p-2 shadow-panel">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="text-sm font-semibold text-ink-700">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => latest.forEach((a) => markRead && markRead(a.id))}
                      className="text-xs font-medium text-canopy-700 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {latest.length === 0 && (
                    <p className="px-2 py-4 text-center text-sm text-ink-400">No alerts yet</p>
                  )}
                  {latest.map((a) => (
                    <div key={a.id} className="flex gap-2 rounded-lg px-2 py-2 hover:bg-ink-50">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${SEVERITY_DOT[a.severity]}`} />
                      <div className="min-w-0">
                        <p className={`truncate text-sm ${a.read ? 'text-ink-500' : 'font-medium text-ink-800'}`}>
                          {a.title}
                        </p>
                        <p className="text-xs text-ink-400">{formatRelativeTime(a.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/alerts"
                  onClick={() => setBellOpen(false)}
                  className="mt-1 block rounded-lg px-2 py-2 text-center text-sm font-medium text-canopy-700 hover:bg-canopy-50"
                >
                  View all alerts
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
