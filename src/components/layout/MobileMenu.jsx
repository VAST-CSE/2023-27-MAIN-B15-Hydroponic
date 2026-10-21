import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Gauge,
  LineChart,
  SlidersHorizontal,
  Bell,
  Sprout,
  Settings,
  X,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/sensors', label: 'Sensors', icon: Gauge },
  { to: '/analytics', label: 'Analytics', icon: LineChart },
  { to: '/controls', label: 'Controls', icon: SlidersHorizontal },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/farm', label: 'Farm', icon: Sprout },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function MobileMenu({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-ink-900/40" onClick={onClose} />
      <div className="absolute left-0 top-0 flex h-full w-64 flex-col bg-white shadow-panel">
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-canopy-600 text-white">
              <Sprout size={18} />
            </span>
            <span className="font-semibold text-ink-800">HydroGrow</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-canopy-50 text-canopy-700' : 'text-ink-500 hover:bg-ink-50'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
