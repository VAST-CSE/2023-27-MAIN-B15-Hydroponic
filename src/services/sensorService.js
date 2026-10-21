// Mock sensor service.
//
// HOW TO CONNECT YOUR REAL IoT BACKEND LATER:
// Every function here returns a Promise with the same shape a real
// REST/WebSocket backend would return. When your ESP32 / MQTT broker /
// backend is ready, replace the body of each function with a real
// `fetch(...)` call (or subscribe to a WebSocket and resolve with the
// latest message) and keep the return shape unchanged — no other file
// in the app needs to change.

import { BASELINE_READINGS, DRIFT_CONFIG, generateHistory } from '../data/mockSensors'
import { drift } from '../utils/formatting'

let currentReadings = { ...BASELINE_READINGS }

export function getCurrentSensors() {
  // Replace with: return fetch('/api/sensors').then(r => r.json())
  return Promise.resolve({ ...currentReadings, updatedAt: new Date().toISOString() })
}

// Advances the in-memory mock readings one "tick". Called by useSensors
// on an interval to simulate a live feed. A real integration would not
// need this — the backend or WebSocket message would already be live.
export function tickSensors() {
  const next = {}
  for (const key of Object.keys(currentReadings)) {
    const cfg = DRIFT_CONFIG[key]
    next[key] = cfg ? drift(currentReadings[key], cfg.step, cfg.min, cfg.max) : currentReadings[key]
  }
  currentReadings = next
  return { ...currentReadings, updatedAt: new Date().toISOString() }
}

export function getSensorHistory(sensorKey, range) {
  // Replace with: return fetch(`/api/sensors/${sensorKey}/history?range=${range}`).then(r => r.json())
  return Promise.resolve(generateHistory(sensorKey, range))
}
