import React from 'react'
import { useApp } from '../../context/AppContext'

export default function ConfirmModeModal() {
  const { confirmModalOpen, confirmSwitchToManual, cancelSwitchToManual } = useApp()

  if (!confirmModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-panel">
        <h3 className="font-semibold text-ink-800">Switch to Manual Mode?</h3>
        <p className="mt-1.5 text-sm text-ink-400">
          Automatic control will be disabled. You will be responsible for operating pumps, lighting
          and climate devices yourself.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={cancelSwitchToManual}
            className="rounded-lg border border-ink-100 px-3.5 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50"
          >
            Cancel
          </button>
          <button
            onClick={confirmSwitchToManual}
            className="rounded-lg bg-canopy-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-canopy-700"
          >
            Switch to Manual
          </button>
        </div>
      </div>
    </div>
  )
}
