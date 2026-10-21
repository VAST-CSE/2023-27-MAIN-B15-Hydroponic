import { useCallback, useEffect, useState } from 'react'
import { getDevices, updateDeviceState } from '../services/deviceService'

/**
 * useDevices — loads the device fleet and exposes a toggle function that
 * updates both local state and the (mock) backend, incrementing runtime
 * while a device is on.
 */
export function useDevices() {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDevices().then((data) => {
      setDevices(data)
      setLoading(false)
    })
  }, [])

  // Tick runtime minutes up for any device currently on, once a minute.
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prev) =>
        prev.map((d) => (d.isOn ? { ...d, runtimeMinutes: d.runtimeMinutes + 1 } : d)),
      )
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const toggleDevice = useCallback((deviceId, nextOn) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId
          ? {
              ...d,
              isOn: nextOn,
              lastActivated: nextOn ? new Date().toISOString() : d.lastActivated,
              runtimeMinutes: nextOn ? 0 : d.runtimeMinutes,
            }
          : d,
      ),
    )
    updateDeviceState(deviceId, { isOn: nextOn })
  }, [])

  const setDeviceMode = useCallback((deviceId, mode) => {
    setDevices((prev) => prev.map((d) => (d.id === deviceId ? { ...d, mode } : d)))
    updateDeviceState(deviceId, { mode })
  }, [])

  const setAllDeviceModes = useCallback((mode) => {
    setDevices((prev) => prev.map((d) => ({ ...d, mode })))
  }, [])

  return { devices, loading, toggleDevice, setDeviceMode, setAllDeviceModes }
}
