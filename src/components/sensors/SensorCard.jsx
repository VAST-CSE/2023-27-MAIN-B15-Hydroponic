import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import { Wifi, WifiOff } from 'lucide-react'
import { SENSOR_META } from '../../data/mockSensors'
import { THRESHOLDS, STATUS_STYLES, STATUS_LABELS } from '../../utils/thresholds'
import { formatValue, formatRelativeTime } from '../../utils/formatting'
import { useSensorHistory } from '../../hooks/useSensors'
import SensorChart from './SensorChart'
import ThresholdIndicator from './ThresholdIndicator'

const RANGES = ['1H', '6H', '24H', '7D']

// Detailed sensor panel used on the Sensors page: reading, safe range,
// connection status, and its own historical chart with a range picker.
export default function SensorCard({ sensorKey, value, status, updatedAt, connected }) {
  const [range, setRange] = useState('24H')
  const meta = SENSOR_META[sensorKey]
  const threshold = THRESHOLDS[sensorKey]
  const style = STATUS_STYLES[status] || STATUS_STYLES.optimal
  const Icon = Icons[meta.icon] || Icons.Gauge
  const { history, loading } = useSensorHistory(sensorKey, range)

  return (
    <div id={`sensor-${sensorKey}`} className={`rounded-xl border bg-white p-5 shadow-panel ${style.border}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.bg}`}>
            <Icon className={`h-5 w-5 ${style.text}`} />
          </span>
          <div>
            <h3 className="font-semibold text-ink-800">{meta.label} Sensor</h3>
            <p className="text-xs text-ink-400">Updated {formatRelativeTime(updatedAt)}</p>
          </div>
        </div>

        <span
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            connected ? 'bg-canopy-50 text-canopy-700' : 'bg-rust-50 text-rust-500'
          }`}
        >
          {connected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="readout text-3xl font-semibold text-ink-800">
              {formatValue(value, meta.decimals)}
            </span>
            <span className="text-sm text-ink-400">{meta.unit}</span>
          </div>
          <span className={`mt-1 inline-flex items-center gap-1.5 text-sm font-medium ${style.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
            {STATUS_LABELS[status]}
          </span>
        </div>

        <div className="min-w-[140px] flex-1 sm:max-w-[240px]">
          <div className="mb-1 flex justify-between text-[11px] text-ink-400">
            <span>Recommended</span>
            <span>
              {threshold.min}–{threshold.max} {threshold.unit}
            </span>
          </div>
          <ThresholdIndicator value={value} min={threshold.min} max={threshold.max} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-400">History</p>
        <div className="flex rounded-lg border border-ink-100 bg-ink-50 p-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                range === r ? 'bg-white text-canopy-700 shadow-sm' : 'text-ink-500'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <SensorChart history={history} unit={meta.unit} loading={loading} />
    </div>
  )
}
