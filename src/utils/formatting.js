// Small formatting helpers shared across cards, charts and tables.

export function formatValue(value, decimals = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return Number(value).toFixed(decimals)
}

export function formatRelativeTime(date) {
  const now = new Date()
  const target = new Date(date)
  const seconds = Math.round((now - target) / 1000)

  if (seconds < 10) return 'Just now'
  if (seconds < 60) return `${seconds} seconds ago`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.round(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export function formatClockTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatRuntime(minutes) {
  if (!minutes || minutes <= 0) return '0 min'
  const hrs = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)
  if (hrs === 0) return `${mins} min`
  return `${hrs}h ${mins}m`
}

// Small deterministic pseudo-random walk so simulated sensor values drift
// smoothly instead of jumping around erratically.
export function drift(value, step, min, max) {
  const change = (Math.random() - 0.5) * 2 * step
  let next = value + change
  if (next < min) next = min + Math.abs(change)
  if (next > max) next = max - Math.abs(change)
  return Math.round(next * 100) / 100
}
