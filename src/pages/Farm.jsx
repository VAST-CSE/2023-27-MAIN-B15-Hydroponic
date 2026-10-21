import React from 'react'
import { Sprout, Droplet, Waves, Sun, Gauge } from 'lucide-react'
import FarmDiagram from '../components/farm/FarmDiagram'
import LoadingState from '../components/common/LoadingState'

export default function Farm({ sensors, devices }) {
  const { readings, statuses } = sensors
  const { devices: deviceList, loading } = devices

  if (!readings || loading) return <LoadingState label="Loading farm overview" />

  const lightsOn = deviceList.find((d) => d.id === 'grow-light')?.isOn
  const healthScore = Math.round(
    (Object.values(statuses).filter((s) => s === 'optimal').length / Object.values(statuses).length) * 100,
  )

  const stats = [
    { label: 'Active Plants', value: '24', icon: Sprout },
    { label: 'Reservoir', value: `${Math.round(readings.waterLevel)}%`, icon: Droplet },
    { label: 'Water Flow', value: 'Normal', icon: Waves },
    { label: 'Lighting', value: lightsOn ? 'ON' : 'OFF', icon: Sun },
    { label: 'Overall Health', value: `${healthScore}%`, icon: Gauge },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold text-ink-800">Farm</h1>
        <p className="text-sm text-ink-400">A visual overview of the hydroponic system and its current state.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-ink-100 bg-white p-4 shadow-panel">
            <Icon className="h-4 w-4 text-canopy-600" />
            <p className="readout mt-2 text-lg font-semibold text-ink-800">{value}</p>
            <p className="text-xs text-ink-400">{label}</p>
          </div>
        ))}
      </div>

      <FarmDiagram statuses={statuses} devices={deviceList} />
    </div>
  )
}
