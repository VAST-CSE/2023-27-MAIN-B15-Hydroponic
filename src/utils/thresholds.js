// Centralized threshold configuration for every sensor in the system.
// Adjust these numbers (or wire them up to the Settings page) and every
// card, chart and alert in the app reads the same source of truth.

export const THRESHOLDS = {
  ph: { min: 5.5, max: 6.5, unit: 'pH', label: 'pH' },
  tds: { min: 650, max: 1050, unit: 'ppm', label: 'TDS' },
  waterTemp: { min: 18, max: 28, unit: '°C', label: 'Water Temperature' },
  airTemp: { min: 18, max: 30, unit: '°C', label: 'Air Temperature' },
  humidity: { min: 50, max: 80, unit: '%', label: 'Humidity' },
  waterLevel: { min: 30, max: 100, unit: '%', label: 'Water Level' },
  light: { min: 400, max: 900, unit: 'lux', label: 'Light Intensity' },
}

// A value is "critical" once it drifts this many units past the threshold
// edge (scaled per-sensor), "warning" inside a smaller buffer zone, and
// "optimal" inside the safe range.
const CRITICAL_BUFFER_RATIO = 0.12

/**
 * getSensorStatus(value, thresholdKeyOrObject)
 * Returns 'optimal' | 'warning' | 'critical'
 *
 * Every part of the app that needs to know whether a reading is safe
 * calls this function instead of re-implementing the comparison.
 */
export function getSensorStatus(value, thresholdKeyOrObject) {
  const threshold =
    typeof thresholdKeyOrObject === 'string'
      ? THRESHOLDS[thresholdKeyOrObject]
      : thresholdKeyOrObject

  if (!threshold || value === null || value === undefined) return 'critical'

  const { min, max } = threshold
  const range = max - min
  const criticalBuffer = range * CRITICAL_BUFFER_RATIO

  if (value < min - criticalBuffer || value > max + criticalBuffer) {
    return 'critical'
  }
  if (value < min || value > max) {
    return 'warning'
  }
  return 'optimal'
}

export const STATUS_LABELS = {
  optimal: 'Optimal',
  warning: 'Warning',
  critical: 'Critical',
}

// Tailwind class groups per status, kept in one place so cards/badges
// never hardcode color logic individually.
export const STATUS_STYLES = {
  optimal: {
    dot: 'bg-canopy-600',
    text: 'text-canopy-700',
    bg: 'bg-canopy-50',
    border: 'border-canopy-200',
  },
  warning: {
    dot: 'bg-amber-500',
    text: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  critical: {
    dot: 'bg-rust-500',
    text: 'text-rust-500',
    bg: 'bg-rust-50',
    border: 'border-rust-100',
  },
}
