import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function ToastStack() {
  const { toasts } = useApp()

  if (toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-2 rounded-lg border border-ink-100 bg-white px-4 py-2.5 shadow-panel"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-canopy-600" />
          <span className="text-sm text-ink-700">{t.message}</span>
        </div>
      ))}
    </div>
  )
}
