import { useCallback, useEffect, useState } from 'react'
import { getAlerts, markAlertAsRead, markAllAlertsAsRead, pushAlert } from '../services/alertService'
import { THRESHOLDS } from '../utils/thresholds'

/**
 * useAlerts — owns the alert log. Exposes addAlertFromThreshold so
 * useSensors can report a threshold crossing and have it show up here,
 * in the notification bell, and on the Alerts page automatically.
 */
export function useAlerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAlerts().then((data) => {
      setAlerts(data)
      setLoading(false)
    })
  }, [])

  const markRead = useCallback((alertId) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, read: true } : a)))
    markAlertAsRead(alertId)
  }, [])

  const markAllRead = useCallback(() => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))
    markAllAlertsAsRead()
  }, [])

  const addAlertFromThreshold = useCallback((sensorKey, status, value) => {
    const meta = THRESHOLDS[sensorKey]
    if (!meta) return
    const severity = status === 'critical' ? 'critical' : 'warning'
    const alert = {
      severity,
      title:
        severity === 'critical'
          ? `${meta.label} is outside the safe range`
          : `${meta.label} is approaching the threshold`,
      description: `${meta.label} reading of ${value} ${meta.unit} is outside the configured range of ${meta.min}–${meta.max} ${meta.unit}.`,
      source: `${meta.label} Sensor`,
    }
    pushAlert(alert).then((saved) => setAlerts((prev) => [saved, ...prev]))
  }, [])

  const unreadCount = alerts.filter((a) => !a.read).length

  return { alerts, loading, unreadCount, markRead, markAllRead, addAlertFromThreshold }
}
