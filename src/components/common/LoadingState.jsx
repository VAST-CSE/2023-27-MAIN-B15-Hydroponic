import React from 'react'
import { Loader2 } from 'lucide-react'

export default function LoadingState({ label = 'Loading farm data' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-400">
      <Loader2 className="h-6 w-6 animate-spin text-canopy-600" />
      <p className="text-sm">{label}…</p>
    </div>
  )
}
