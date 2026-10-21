import React from 'react'
import * as Icons from 'lucide-react'
import { formatRuntime } from '../../utils/formatting'

// Compact device status row used on the Dashboard's "System Devices" panel.
export default function DeviceStatus({ devices }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
      <h3 className="font-semibold text-ink-800">System Devices</h3>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {devices.map((device) => {
          const Icon = Icons[device.icon] || Icons.Cpu
          return (
            <div
              key={device.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-ink-100 px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    device.isOn ? 'bg-canopy-50 text-canopy-700' : 'bg-ink-50 text-ink-400'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink-700">{device.name}</p>
                  <p className="text-xs text-ink-400">
                    {device.isOn ? `Runtime: ${formatRuntime(device.runtimeMinutes)}` : 'Standing by'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    device.isOn ? 'text-canopy-700' : 'text-ink-400'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${device.isOn ? 'bg-canopy-600' : 'bg-ink-300'}`} />
                  {device.isOn ? 'ON' : 'OFF'}
                </span>
                <span className="text-[11px] text-ink-400">{device.mode}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
