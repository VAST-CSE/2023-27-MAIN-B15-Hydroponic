import React from 'react'
import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'Nothing here yet', description, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink-100 py-14 text-center">
      <Icon className="h-6 w-6 text-ink-400" />
      <p className="font-medium text-ink-600">{title}</p>
      {description && <p className="max-w-xs text-sm text-ink-400">{description}</p>}
    </div>
  )
}
