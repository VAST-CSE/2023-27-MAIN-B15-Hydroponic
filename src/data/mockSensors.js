// Baseline mock sensor readings and a generator for realistic historical
// series. Replace `getLatestReadings()` and `generateHistory()` internals
// with real IoT API/WebSocket data later — the shape consumers expect
// (see services/sensorService.js) can stay identical.

export const SENSOR_META = {
  ph: { key: 'ph', label: 'pH', unit: 'pH', icon: 'FlaskConical', decimals: 2, color: 'canopy' },
  tds: { key: 'tds', label: 'TDS', unit: 'ppm', icon: 'Droplets', decimals: 0, color: 'hydro' },
  waterTemp: { key: 'waterTemp', label: 'Water Temperature', unit: '°C', icon: 'Thermometer', decimals: 1, color: 'hydro' },
  airTemp: { key: 'airTemp', label: 'Air Temperature', unit: '°C', icon: 'Wind', decimals: 1, color: 'amber' },
  humidity: { key: 'humidity', label: 'Humidity', unit: '%', icon: 'CloudDrizzle', decimals: 0, color: 'hydro' },
  waterLevel: { key: 'waterLevel', label: 'Water Level', unit: '%', icon: 'Waves', decimals: 0, color: 'hydro' },
  light: { key: 'light', label: 'Light Intensity', unit: 'lux', icon: 'Sun', decimals: 0, color: 'amber' },
}

// Realistic, stable starting values — not obviously randomized.
export const BASELINE_READINGS = {
  ph: 6.2,
  tds: 840,
  waterTemp: 23.7,
  airTemp: 26.1,
  humidity: 68,
  waterLevel: 78,
  light: 720,
}

// Per-sensor drift step used by the real-time simulation, and the hard
// bounds the drift is clamped to.
export const DRIFT_CONFIG = {
  ph: { step: 0.02, min: 5.2, max: 6.9 },
  tds: { step: 4, min: 600, max: 1100 },
  waterTemp: { step: 0.08, min: 17, max: 29 },
  airTemp: { step: 0.1, min: 17, max: 31 },
  humidity: { step: 0.4, min: 45, max: 85 },
  waterLevel: { step: 0.15, min: 25, max: 100 },
  light: { step: 6, min: 300, max: 950 },
}

function seededHourlyPattern(key, hour) {
  // Gentle diurnal patterns so a 24h chart looks like a real greenhouse day.
  switch (key) {
    case 'light':
      return Math.max(0, 850 * Math.sin(((hour - 6) / 14) * Math.PI)) + 60
    case 'airTemp':
      return 25 + 3 * Math.sin(((hour - 9) / 14) * Math.PI)
    case 'waterTemp':
      return 23 + 1.6 * Math.sin(((hour - 10) / 14) * Math.PI)
    case 'humidity':
      return 68 - 10 * Math.sin(((hour - 9) / 14) * Math.PI)
    case 'ph':
      return 6.2 + 0.15 * Math.sin((hour / 24) * Math.PI * 2)
    case 'tds':
      return 840 + 40 * Math.sin((hour / 24) * Math.PI * 2 + 1)
    case 'waterLevel':
      return 78 - (hour % 12) * 0.6
    default:
      return BASELINE_READINGS[key]
  }
}

/**
 * generateHistory(sensorKey, range)
 * range: '1H' | '6H' | '24H' | '7D'
 * Returns an array of { time, value, label } points with a realistic,
 * gently-varying curve (not pure noise) so the Live/Analytics charts look
 * like real sensor logs.
 */
export function generateHistory(sensorKey, range) {
  const now = new Date()
  const config = {
    '1H': { points: 30, stepMinutes: 2 },
    '6H': { points: 36, stepMinutes: 10 },
    '24H': { points: 48, stepMinutes: 30 },
    '7D': { points: 42, stepMinutes: 4 * 60 },
  }[range] || { points: 30, stepMinutes: 2 }

  const points = []
  for (let i = config.points - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * config.stepMinutes * 60 * 1000)
    const hourOfDay = t.getHours() + t.getMinutes() / 60
    const base = seededHourlyPattern(sensorKey, hourOfDay)
    const noise = (Math.sin(i * 0.7 + sensorKey.length) * 0.5) * (DRIFT_CONFIG[sensorKey]?.step || 1) * 1.5
    const value = Math.round((base + noise) * 100) / 100

    points.push({
      time: t.toISOString(),
      label:
        range === '7D'
          ? t.toLocaleDateString([], { weekday: 'short', hour: '2-digit' })
          : t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value,
    })
  }
  return points
}
