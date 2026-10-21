// Mock device service.
//
// HOW TO CONNECT YOUR REAL IoT BACKEND LATER:
// Replace getDevices() with a fetch to your backend's device list, and
// updateDeviceState() with a call that actually commands the ESP32/relay
// board (e.g. POST /api/devices/:id). Keep the returned shapes the same.

import { INITIAL_DEVICES } from '../data/mockDevices'

let devices = INITIAL_DEVICES.map((d) => ({ ...d }))

export function getDevices() {
  // Replace with: return fetch('/api/devices').then(r => r.json())
  return Promise.resolve(devices.map((d) => ({ ...d })))
}

export function updateDeviceState(deviceId, updates) {
  // Replace with: return fetch(`/api/devices/${deviceId}`, { method: 'PATCH', body: JSON.stringify(updates) })
  devices = devices.map((d) => (d.id === deviceId ? { ...d, ...updates } : d))
  const updated = devices.find((d) => d.id === deviceId)
  return Promise.resolve({ ...updated })
}
