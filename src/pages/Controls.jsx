import React from 'react'
import ModeSelector from '../components/controls/ModeSelector'
import DeviceCard from '../components/controls/DeviceCard'
import LoadingState from '../components/common/LoadingState'

export default function Controls({ devices }) {
  const { devices: deviceList, loading, toggleDevice } = devices

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold text-ink-800">Controls</h1>
        <p className="text-sm text-ink-400">Switch between automatic and manual operation for every device.</p>
      </div>

      <ModeSelector />

      {loading ? (
        <LoadingState label="Loading devices" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {deviceList.map((device) => (
            <DeviceCard key={device.id} device={device} onToggle={toggleDevice} />
          ))}
        </div>
      )}
    </div>
  )
}
