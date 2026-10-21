import React from 'react'
import { SENSOR_META } from '../data/mockSensors'
import SensorCard from '../components/dashboard/SensorCard'
import FarmHealth from '../components/dashboard/FarmHealth'
import LiveChart from '../components/dashboard/LiveChart'
import DeviceStatus from '../components/dashboard/DeviceStatus'
import RecentAlerts from '../components/dashboard/RecentAlerts'
import OfflineBanner from '../components/common/OfflineBanner'
import LoadingState from '../components/common/LoadingState'

export default function Dashboard({ sensors, devices, alerts, navigate }) {
  const { readings, previous, statuses, connected } = sensors
  const { devices: deviceList, loading: devicesLoading } = devices
  const { alerts: alertList, loading: alertsLoading } = alerts

  if (!readings) return <LoadingState label="Connecting to sensors" />

  return (
    <div className="space-y-5">
      {!connected && <OfflineBanner />}

      <FarmHealth statuses={statuses} />

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-400">Sensors</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Object.keys(SENSOR_META).map((key) => (
            <SensorCard
              key={key}
              sensorKey={key}
              value={readings[key]}
              previousValue={previous?.[key]}
              status={statuses[key]}
              onClick={() => navigate(`/sensors?focus=${key}`)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LiveChart />
        </div>
        <RecentAlerts alerts={alertsLoading ? [] : alertList} />
      </div>

      {devicesLoading ? <LoadingState label="Loading devices" /> : <DeviceStatus devices={deviceList} />}
    </div>
  )
}
