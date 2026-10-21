import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function SensorChart({ history, unit, color = '#2f6b4f', loading }) {
  if (loading) {
    return <div className="flex h-64 items-center justify-center text-sm text-ink-400">Loading chart…</div>
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
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
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
