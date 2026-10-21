import React, { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { SENSOR_META } from '../../data/mockSensors'
import { useSensorHistory } from '../../hooks/useSensors'

const RANGES = ['1H', '6H', '24H', '7D']
const SENSOR_KEYS = Object.keys(SENSOR_META)

export default function LiveChart() {
  const [sensorKey, setSensorKey] = useState('ph')
  const [range, setRange] = useState('24H')
  const { history, loading } = useSensorHistory(sensorKey, range)
  const meta = SENSOR_META[sensorKey]

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-ink-800">Live Environment</h3>
          <p className="text-xs text-ink-400">{meta.label} over time</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={sensorKey}
            onChange={(e) => setSensorKey(e.target.value)}
            className="rounded-lg border border-ink-100 bg-ink-50 px-2.5 py-1.5 text-sm text-ink-700 focus:border-canopy-400"
          >
            {SENSOR_KEYS.map((key) => (
              <option key={key} value={key}>
                {SENSOR_META[key].label}
              </option>
            ))}
          </select>

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
      </div>

      <div className="mt-4 h-64 w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-ink-400">Loading chart…</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="liveChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2f6b4f" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2f6b4f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e6" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#6b7570' }}
                tickLine={false}
                axisLine={{ stroke: '#e7e9e6' }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#6b7570' }}
                tickLine={false}
                axisLine={false}
                width={40}
                label={{ value: meta.unit, angle: -90, position: 'insideLeft', fontSize: 11, fill: '#6b7570' }}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e7e9e6', fontSize: 12 }}
                formatter={(value) => [`${value} ${meta.unit}`, meta.label]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2f6b4f"
                strokeWidth={2}
                fill="url(#liveChartFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
