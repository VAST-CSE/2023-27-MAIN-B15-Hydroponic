import React from 'react'
import * as Icons from 'lucide-react'
import { Lock } from 'lucide-react'
import { formatRuntime, formatRelativeTime } from '../../utils/formatting'
import DeviceToggle from './DeviceToggle'
import { useApp } from '../../context/AppContext'

export default function DeviceCard({ device, onToggle }) {
  const { isAuto, pushToast } = useApp()
  const Icon = Icons[device.icon] || Icons.Cpu
  const disabled = isAuto

  const handleToggle = (next) => {
    onToggle(device.id, next)
    pushToast(`${device.name} turned ${next ? 'ON' : 'OFF'}.`)
  }

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-4 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              device.isOn ? 'bg-canopy-50 text-canopy-700' : 'bg-ink-50 text-ink-400'
            }`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-medium text-ink-800">{device.name}</p>
            <p className="text-xs text-ink-400">{device.description}</p>
          </div>
        </div>
        <DeviceToggle isOn={device.isOn} disabled={disabled} onChange={handleToggle} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg bg-ink-50 px-3 py-2">
          <p className="text-ink-400">Mode</p>
          <p className="font-medium text-ink-700">{device.mode}</p>
        </div>
        <div className="rounded-lg bg-ink-50 px-3 py-2">
          <p className="text-ink-400">Runtime</p>
          <p className="font-medium text-ink-700">{formatRuntime(device.runtimeMinutes)}</p>
        </div>
        <div className="col-span-2 rounded-lg bg-ink-50 px-3 py-2">
          <p className="text-ink-400">Last activated</p>
          <p className="font-medium text-ink-700">{formatRelativeTime(device.lastActivated)}</p>
        </div>
      </div>

      {disabled && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-400">
          <Lock className="h-3 w-3" />
          Switch to Manual Mode to control this device.
        </p>
      )}
    </div>
  )
}
