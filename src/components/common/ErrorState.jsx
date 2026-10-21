import React from 'react'
import { AlertTriangle } from 'lucide-react'

export default function ErrorState({
  title = 'Something went wrong',
  description = 'The dashboard could not load this data. Try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-rust-100 bg-rust-50 py-14 text-center">
      <AlertTriangle className="h-6 w-6 text-rust-500" />
      <div>
        <p className="font-medium text-ink-700">{title}</p>
        <p className="mt-1 text-sm text-ink-400">{description}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 rounded-lg border border-rust-100 bg-white px-3 py-1.5 text-sm font-medium text-rust-500 hover:bg-rust-50"
        >
          Try again
        </button>
      )}
    </div>
  )
}
