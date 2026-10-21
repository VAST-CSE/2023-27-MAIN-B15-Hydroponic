import React, { useState } from 'react'
import { STATUS_STYLES } from '../../utils/thresholds'

// A simplified schematic of the hydroponic loop. Each node is clickable
// and shows a short status readout — built with plain SVG/positioned
// divs so it has no extra chart-library dependency.

function Node({ id, label, x, y, status = 'optimal', onSelect, selected, icon }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.optimal
  return (
    <button
      onClick={() => onSelect(id)}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg border bg-white px-3 py-2 text-xs font-medium shadow-panel transition ${
        selected === id ? 'border-canopy-500 ring-2 ring-canopy-100' : style.border
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="text-ink-700">{label}</span>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
    </button>
  )
}

export default function FarmDiagram({ statuses, devices }) {
  const [selected, setSelected] = useState(null)

  const deviceByKey = (id) => devices.find((d) => d.id === id)

  const nodes = [
    { id: 'reservoir', label: 'Reservoir', x: 12, y: 50, icon: '🪣', status: statuses.waterLevel },
    { id: 'water-pump', label: 'Water Pump', x: 32, y: 22, icon: '⚙️', status: deviceByKey('water-pump')?.isOn ? 'optimal' : 'warning' },
    { id: 'nutrient-channels', label: 'Nutrient Channels', x: 55, y: 22, icon: '🧪', status: statuses.tds },
    { id: 'plants', label: 'Plants', x: 78, y: 22, icon: '🌱', status: statuses.ph },
    { id: 'return-water', label: 'Return Water', x: 78, y: 78, icon: '↩️', status: statuses.waterTemp },
    { id: 'ph-sensor', label: 'pH Sensor', x: 55, y: 78, icon: '📟', status: statuses.ph },
    { id: 'tds-sensor', label: 'TDS Sensor', x: 32, y: 78, icon: '📡', status: statuses.tds },
    { id: 'grow-light', label: 'Grow Light', x: 78, y: 50, icon: '💡', status: deviceByKey('grow-light')?.isOn ? 'optimal' : 'warning' },
    { id: 'exhaust-fan', label: 'Exhaust Fan', x: 55, y: 50, icon: '🌀', status: deviceByKey('exhaust-fan')?.isOn ? 'optimal' : 'warning' },
  ]

  const selectedNode = nodes.find((n) => n.id === selected)

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
      <h3 className="font-semibold text-ink-800">Hydroponic Loop</h3>
      <p className="mb-4 text-xs text-ink-400">Click a component to see its current status.</p>

      <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-canopy-50/60">
        {/* Flow lines */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path
            d="M 12% 50% L 32% 22% L 55% 22% L 78% 22% L 78% 50% L 78% 78% L 55% 78% L 32% 78% L 12% 50%"
            fill="none"
            stroke="#96c0a3"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
        </svg>

        {nodes.map((n) => (
          <Node key={n.id} {...n} onSelect={setSelected} selected={selected} />
        ))}
      </div>

      {selectedNode ? (
        <div className="mt-4 rounded-lg bg-ink-50 px-4 py-3 text-sm text-ink-600">
          <span className="font-medium text-ink-800">{selectedNode.label}: </span>
          Status is currently <span className="font-medium">{selectedNode.status}</span>.
        </div>
      ) : (
        <div className="mt-4 rounded-lg bg-ink-50 px-4 py-3 text-sm text-ink-400">
          Select a component above to inspect its status.
        </div>
      )}
    </div>
  )
}
