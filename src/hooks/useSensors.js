import { useCallback, useEffect, useRef, useState } from 'react'
import { getCurrentSensors, tickSensors, getSensorHistory } from '../services/sensorService'
import { getSensorStatus, THRESHOLDS } from '../utils/thresholds'

const TICK_INTERVAL_MS = 4000 // simulate a live feed every 3-5 seconds

/**
 * useSensors — the single source of truth for live sensor readings.
 * Polls the mock service on an interval (swap for a WebSocket/MQTT
 * subscription later — see sensorService.js) and exposes the latest
 * readings plus per-sensor status.
 */
export function useSensors({ onThresholdCross } = {}) {
  const [readings, setReadings] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [connected, setConnected] = useState(true)
  const [updatedAt, setUpdatedAt] = useState(null)
  const prevStatusRef = useRef({})

  const applyReadings = useCallback(
    (data) => {
      setPrevious((prev) => prev ?? data)
      setReadings((prev) => {
        if (prev) setPrevious(prev)
        return data
      })
      setUpdatedAt(data.updatedAt)

      if (onThresholdCross) {
        Object.keys(THRESHOLDS).forEach((key) => {
          const status = getSensorStatus(data[key], key)
          const prevStatus = prevStatusRef.current[key]
          if (prevStatus && prevStatus !== status && status !== 'optimal') {
            onThresholdCross(key, status, data[key])
          }
          prevStatusRef.current[key] = status
        })
      }
    },
    [onThresholdCross],
  )

  useEffect(() => {
    let mounted = true
    getCurrentSensors().then((data) => {
      if (mounted) applyReadings(data)
    })

    const interval = setInterval(() => {
      // Randomly (rarely) simulate a brief connection drop so the
      // offline state is demonstrable, like a real flaky IoT link.
      const dropped = Math.random() < 0.015
      if (dropped) {
        setConnected(false)
        setTimeout(() => setConnected(true), 6000)
        return
      }
      const next = tickSensors()
      applyReadings(next)
    }, TICK_INTERVAL_MS)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [applyReadings])

  const statuses = readings
    ? Object.keys(THRESHOLDS).reduce((acc, key) => {
        acc[key] = getSensorStatus(readings[key], key)
        return acc
      }, {})
    : {}

  return { readings, previous, statuses, connected, updatedAt }
}

/**
 * useSensorHistory — fetches (mock) historical data for a single sensor
 * whenever the sensor or time range changes.
 */
export function useSensorHistory(sensorKey, range) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getSensorHistory(sensorKey, range).then((data) => {
      if (mounted) {
        setHistory(data)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [sensorKey, range])

  return { history, loading }
}
