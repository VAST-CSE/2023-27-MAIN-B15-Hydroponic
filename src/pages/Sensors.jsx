import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SENSOR_META } from '../data/mockSensors'
import SensorCard from '../components/sensors/SensorCard'
import OfflineBanner from '../components/common/OfflineBanner'
import LoadingState from '../components/common/LoadingState'

export default function Sensors({ sensors }) {
  const { readings, statuses, connected, updatedAt } = sensors
  const [searchParams] = useSearchParams()
  const focus = searchParams.get('focus')

  useEffect(() => {
    if (focus) {
      const el = document.getElementById(`sensor-${focus}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [focus, readings])

  if (!readings) return <LoadingState label="Loading sensors" />

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold text-ink-800">Sensors</h1>
        <p className="text-sm text-ink-400">Detailed readings and history for every probe on the farm.</p>
      </div>

      {!connected && <OfflineBanner />}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {Object.keys(SENSOR_META).map((key) => (
          <SensorCard
            key={key}
            sensorKey={key}
            value={readings[key]}
            status={statuses[key]}
            updatedAt={updatedAt}
            connected={connected}
          />
        ))}
      </div>
    </div>
  )
}
