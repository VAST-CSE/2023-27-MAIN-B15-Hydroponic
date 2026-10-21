import React from 'react'
import { useApp } from '../../context/AppContext'

// Global AUTO/MANUAL switch. Switching to Manual routes through a
// confirmation modal (see ConfirmModeModal); switching back to Auto is
// immediate since it only re-enables automation.
export default function ModeSelector() {
  const { systemMode, requestSwitchToManual, switchToAuto } = useApp()

  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-4 shadow-panel">
      <div className="flex-1">
        <p className="text-sm font-semibold text-ink-800">System Mode</p>
        <p className="mt-0.5 text-xs text-ink-400">
          {systemMode === 'AUTO'
            ? 'System automatically controls connected devices based on sensor conditions.'
            : 'Devices can be controlled manually.'}
        </p>
      </div>
      <div className="flex rounded-lg border border-ink-100 bg-ink-50 p-0.5">
        <button
          onClick={switchToAuto}
          className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
            systemMode === 'AUTO' ? 'bg-white text-canopy-700 shadow-sm' : 'text-ink-500'
          }`}
        >
          Auto
        </button>
        <button
          onClick={requestSwitchToManual}
          className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
            systemMode === 'MANUAL' ? 'bg-white text-canopy-700 shadow-sm' : 'text-ink-500'
          }`}
        >
          Manual
        </button>
      </div>
    </div>
  )
}
