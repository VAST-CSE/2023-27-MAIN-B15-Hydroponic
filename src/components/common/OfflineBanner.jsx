import React from 'react'
import { WifiOff } from 'lucide-react'

export default function OfflineBanner() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-600">
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>
        <span className="font-medium">IoT System Offline.</span> Showing last known sensor values.
      </span>
    </div>
  )
}
