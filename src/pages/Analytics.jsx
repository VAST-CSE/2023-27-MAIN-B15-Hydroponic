import React, { useMemo, useState } from 'react'
import { SENSOR_META } from '../data/mockSensors'
import { THRESHOLDS } from '../utils/thresholds'
import { useSensorHistory } from '../hooks/useSensors'
import AnalyticsChart from '../components/analytics/AnalyticsChart'
import MetricSummary from '../components/analytics/MetricSummary'
import InsightCard from '../components/analytics/InsightCard'

const TIME_OPTIONS = [
  { label: '1 Day', value: '24H' },
  { label: '7 Days', value: '7D' },
  { label: '30 Days', value: '7D' }, // reuses the 7D mock series; swap for a real 30D query later
]

const SENSOR_KEYS = Object.keys(SENSOR_META)

function buildInsights(sensorKey, history) {
  const meta = SENSOR_META[sensorKey]
  const threshold = THRESHOLDS[sensorKey]
  if (history.length === 0) return []

  const values = history.map((h) => h.value)
  const inRange = values.filter((v) => v >= threshold.min && v <= threshold.max).length
  const pctInRange = Math.round((inRange / values.length) * 100)
  const first = values[0]
  const last = values[values.length - 1]
  const delta = Math.round((last - first) * 100) / 100
  const direction = delta > 0 ? 'increased' : delta < 0 ? 'decreased' : 'stayed flat'

  return [
    `${meta.label} remained within the recommended range for ${pctInRange}% of the selected period.`,
    `${meta.label} ${direction} by ${Math.abs(delta)} ${meta.unit} from the start to the end of this window.`,
    pctInRange >= 90
      ? `${meta.label} was stable overall — no sustained excursions outside the safe range.`
      : `${meta.label} spent some time outside the ${threshold.min}–${threshold.max} ${meta.unit} range — worth reviewing dosing or ventilation settings.`,
  ]
}

export default function Analytics() {
  const [sensorKey, setSensorKey] = useState('ph')
  const [timeIndex, setTimeIndex] = useState(0)
  const range = TIME_OPTIONS[timeIndex].value
  const { history, loading } = useSensorHistory(sensorKey, range)
  const meta = SENSOR_META[sensorKey]
  const threshold = THRESHOLDS[sensorKey]

  const stats = useMemo(() => {
    if (history.length === 0) return { average: 0, min: 0, max: 0, current: 0 }
    const values = history.map((h) => h.value)
    return {
      average: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      current: values[values.length - 1],
    }
  }, [history])

  const insights = useMemo(() => buildInsights(sensorKey, history), [sensorKey, history])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold text-ink-800">Historical Analytics</h1>
        <p className="text-sm text-ink-400">Trends, summary statistics and insights for each sensor.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-ink-100 bg-white p-4 shadow-panel">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-400">Sensor</label>
          <select
            value={sensorKey}
            onChange={(e) => setSensorKey(e.target.value)}
            className="rounded-lg border border-ink-100 bg-ink-50 px-3 py-1.5 text-sm text-ink-700"
          >
            {SENSOR_KEYS.map((key) => (
              <option key={key} value={key}>
                {SENSOR_META[key].label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-ink-400">Time</label>
          <div className="flex rounded-lg border border-ink-100 bg-ink-50 p-0.5">
            {TIME_OPTIONS.map((opt, i) => (
              <button
                key={opt.label}
                onClick={() => setTimeIndex(i)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  timeIndex === i ? 'bg-white text-canopy-700 shadow-sm' : 'text-ink-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <MetricSummary
        label={meta.label}
        unit={meta.unit}
        decimals={meta.decimals}
        average={stats.average}
        min={stats.min}
        max={stats.max}
        current={stats.current}
      />

      <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
        <h3 className="font-semibold text-ink-800">{meta.label} — {TIME_OPTIONS[timeIndex].label}</h3>
        <AnalyticsChart history={history} unit={meta.unit} min={threshold.min} max={threshold.max} loading={loading} />
      </div>

      <InsightCard insights={insights} />
    </div>
  )
}
