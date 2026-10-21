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
  Radio,
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

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-100 bg-white md:flex">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-canopy-600 text-white">
          <Sprout className="h-4.5 w-4.5" size={18} />
        </span>
        <span className="font-semibold text-ink-800">HydroGrow</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-canopy-50 text-canopy-700'
                  : 'text-ink-500 hover:bg-ink-50 hover:text-ink-700'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-ink-100 px-5 py-4">
        <div className="flex items-center gap-2 text-xs font-medium text-canopy-700">
          <Radio className="h-3.5 w-3.5" />
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-canopy-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-canopy-600" />
          </span>
          IoT Connected
        </div>
      </div>
    </aside>
  )
}
