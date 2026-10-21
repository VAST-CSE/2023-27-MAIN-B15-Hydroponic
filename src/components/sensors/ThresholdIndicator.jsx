import React from 'react'

// A horizontal range bar showing where the current value sits relative
// to the sensor's safe min/max — gives an at-a-glance sense of margin,
// not just a pass/fail badge.
export default function ThresholdIndicator({ value, min, max }) {
  const span = max - min
  const padded = span * 0.25
  const lower = min - padded
  const upper = max + padded
  const pct = Math.max(0, Math.min(100, ((value - lower) / (upper - lower)) * 100))
  const minPct = ((min - lower) / (upper - lower)) * 100
  const maxPct = ((max - lower) / (upper - lower)) * 100

  return (
    <div className="relative h-2 w-full rounded-full bg-ink-100">
      <div
        className="absolute top-0 h-2 rounded-full bg-canopy-200"
        style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
      />
      <div
        className="absolute -top-0.5 h-3 w-1 rounded-full bg-ink-700"
        style={{ left: `calc(${pct}% - 2px)` }}
      />
    </div>
  )
}
