// Baseline alert log. New alerts get prepended to this shape at runtime
// when a sensor crosses a threshold (see hooks/useAlerts.js).

export const INITIAL_ALERTS = [
  {
    id: 'a1',
    severity: 'critical',
    title: 'pH level is outside the safe range',
    description: 'pH reading of 6.9 exceeds the configured maximum of 6.5.',
    timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    source: 'pH Sensor',
    read: false,
  },
  {
    id: 'a2',
    severity: 'warning',
    title: 'Water level is below 40%',
    description: 'Reservoir level has dropped to 38%. Consider refilling soon.',
    timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    source: 'Water Level Sensor',
    read: false,
  },
  {
    id: 'a3',
    severity: 'info',
    title: 'Water pump activated automatically',
    description: 'AUTO mode started the water pump in response to a low-flow condition.',
    timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    source: 'Water Pump',
    read: true,
  },
  {
    id: 'a4',
    severity: 'warning',
    title: 'Temperature approaching the upper threshold',
    description: 'Air temperature is at 29.4°C, close to the 30°C limit.',
    timestamp: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    source: 'Air Temperature Sensor',
    read: true,
  },
  {
    id: 'a5',
    severity: 'critical',
    title: 'pH sensor disconnected',
    description: 'No signal received from the pH probe for over 5 minutes.',
    timestamp: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
    source: 'pH Sensor',
    read: true,
  },
]
