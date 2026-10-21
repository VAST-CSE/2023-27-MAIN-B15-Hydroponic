// Mock alert service.
//
// HOW TO CONNECT YOUR REAL IoT BACKEND LATER:
// Replace getAlerts() with a fetch to your backend's alert log, and
// markAlertAsRead() with a call that persists read state server-side.

import { INITIAL_ALERTS } from '../data/mockAlerts'

let alerts = INITIAL_ALERTS.map((a) => ({ ...a }))

export function getAlerts() {
  // Replace with: return fetch('/api/alerts').then(r => r.json())
  return Promise.resolve(alerts.map((a) => ({ ...a })))
}

export function markAlertAsRead(alertId) {
  // Replace with: return fetch(`/api/alerts/${alertId}/read`, { method: 'POST' })
  alerts = alerts.map((a) => (a.id === alertId ? { ...a, read: true } : a))
  return Promise.resolve(true)
}

export function markAllAlertsAsRead() {
  alerts = alerts.map((a) => ({ ...a, read: true }))
  return Promise.resolve(true)
}

// Called by useAlerts when a live sensor reading crosses a threshold, so
// the alert log stays in sync with what's actually happening on the farm.
export function pushAlert(alert) {
  const withId = { id: `a-${Date.now()}`, read: false, timestamp: new Date().toISOString(), ...alert }
  alerts = [withId, ...alerts]
  return Promise.resolve(withId)
}
