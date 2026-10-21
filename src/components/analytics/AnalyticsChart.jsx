import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts'

export default function AnalyticsChart({ history, unit, min, max, loading }) {
  if (loading) {
    return <div className="flex h-72 items-center justify-center text-sm text-ink-400">Loading chart…</div>
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={history} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a6f97" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#2a6f97" stopOpacity={0} />
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
          <YAxis tick={{ fontSize: 11, fill: '#6b7570' }} tickLine={false} axisLine={false} width={40} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #e7e9e6', fontSize: 12 }}
            formatter={(value) => [`${value} ${unit}`, 'Value']}
          />
          {min !== undefined && <ReferenceLine y={min} stroke="#c9822b" strokeDasharray="4 4" />}
          {max !== undefined && <ReferenceLine y={max} stroke="#c9822b" strokeDasharray="4 4" />}
          <Area type="monotone" dataKey="value" stroke="#2a6f97" strokeWidth={2} fill="url(#analyticsFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
