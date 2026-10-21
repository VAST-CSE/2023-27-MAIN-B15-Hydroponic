# HydroGrow — Autonomous Hydroponic Farming Dashboard

A React + Vite + Tailwind frontend for an IoT-based autonomous hydroponic
farming system. Currently runs entirely on realistic **mock data** —
built so you can swap in your real ESP32/backend later without
rewriting the UI.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Folder guide

- **`src/data/`** — static mock baselines (`mockSensors.js`, `mockDevices.js`,
  `mockAlerts.js`) plus the history-generation logic. Nothing here talks
  to components directly.
- **`src/services/`** — `sensorService.js`, `deviceService.js`,
  `alertService.js`. This is your **mock API layer**. Every function
  returns a Promise, exactly like a real `fetch()` call would. **This is
  the only place you need to edit when you connect your real backend** —
  swap the function bodies for real HTTP/WebSocket/MQTT calls and keep
  the same return shapes.
- **`src/hooks/`** — `useSensors`, `useDevices`, `useAlerts`. These call
  the services, poll for live updates (currently every ~4 seconds via
  `setInterval`, standing in for a WebSocket push), and expose clean
  state to pages/components.
- **`src/utils/thresholds.js`** — the single source of truth for safe
  min/max ranges and the `getSensorStatus()` function that decides
  optimal/warning/critical. Every card, chart and alert reads from here
  so the logic is never duplicated.
- **`src/utils/formatting.js`** — small formatting helpers (relative
  time, runtime, the mock "drift" function used to simulate live sensor
  movement).
- **`src/context/AppContext.jsx`** — global state: the AUTO/MANUAL
  system mode and the toast notification queue.
- **`src/components/`** — organized by feature area (`dashboard/`,
  `sensors/`, `controls/`, `alerts/`, `analytics/`, `farm/`, `common/`),
  matching the page that uses them.
- **`src/pages/`** — one file per route (Dashboard, Sensors, Analytics,
  Controls, Alerts, Farm, Settings).

## How data flows

1. `useSensors` calls `sensorService.getCurrentSensors()` once on load,
   then calls `tickSensors()` on an interval to simulate live movement.
2. Each tick, `getSensorStatus()` checks every reading against
   `THRESHOLDS`. If a sensor crosses out of the optimal range,
   `useSensors` reports it via `onThresholdCross`, which `App.jsx` wires
   to `useAlerts().addAlertFromThreshold()` — this is how a bad reading
   automatically becomes an alert, updates the notification bell, and
   shows up on the Alerts page, all from one place.
3. Pages just read the hook's returned state (`readings`, `statuses`,
   `connected`, `updatedAt`) and render — they never touch the mock data
   directly.

## How real-time simulation works

`tickSensors()` in `sensorService.js` nudges each value by a small,
bounded random step (`drift()` in `utils/formatting.js`) so numbers move
the way real sensors do — no big jumps. `useSensors` also has a small
random chance each tick of flipping `connected` to `false` for a few
seconds, to demonstrate the offline banner without needing a real
disconnect.

## How device controls work

`useDevices` loads devices from `deviceService.getDevices()`. Toggling a
device calls `toggleDevice()`, which updates local state immediately
(optimistic update) and calls `deviceService.updateDeviceState()` — the
function you'll point at your real backend later. When the global
system mode (`AppContext`) is `AUTO`, `DeviceCard` disables its toggle
and shows "Switch to Manual Mode to control this device."

## Connecting your real ESP32 / backend

You only need to touch **`src/services/*.js`**:

- `sensorService.getCurrentSensors()` → `fetch('/api/sensors')` or read
  the latest MQTT/WebSocket message.
- `sensorService.getSensorHistory()` → `fetch('/api/sensors/:key/history?range=...')`.
- `deviceService.getDevices()` / `updateDeviceState()` → real device
  list and control endpoints.
- `alertService.getAlerts()` / `markAlertAsRead()` → real alert log.

Everything else (`hooks/`, `components/`, `pages/`) expects the same
data shapes it already gets from the mocks, so no other file needs to
change.
