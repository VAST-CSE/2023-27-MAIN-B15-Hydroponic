import React, { useState } from 'react'
import { THRESHOLDS } from '../utils/thresholds'
import { useApp } from '../context/AppContext'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink-500">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-ink-100 bg-ink-50 px-3 py-2 text-sm text-ink-800 focus:border-canopy-400 focus:bg-white'

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div>
        <p className="text-sm font-medium text-ink-700">{label}</p>
        {description && <p className="text-xs text-ink-400">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-canopy-600' : 'bg-ink-200'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export default function Settings() {
  const { pushToast } = useApp()

  const [system, setSystem] = useState({
    farmName: 'Greenhouse Bay 3',
    timezone: 'Asia/Kolkata',
    tempUnit: 'Celsius',
    refreshInterval: 5,
  })

  const [thresholds, setThresholds] = useState({
    phMin: THRESHOLDS.ph.min,
    phMax: THRESHOLDS.ph.max,
    tdsMin: THRESHOLDS.tds.min,
    tdsMax: THRESHOLDS.tds.max,
    waterTempMin: THRESHOLDS.waterTemp.min,
    waterTempMax: THRESHOLDS.waterTemp.max,
    humidityMin: THRESHOLDS.humidity.min,
    humidityMax: THRESHOLDS.humidity.max,
    waterLevelMin: THRESHOLDS.waterLevel.min,
  })

  const [automation, setAutomation] = useState({
    autoPump: true,
    autoLighting: true,
    autoNutrient: true,
    autoAlerts: true,
  })

  const [notifications, setNotifications] = useState({
    critical: true,
    warning: true,
    disconnect: true,
  })

  const [errors, setErrors] = useState({})

  const updateThreshold = (key, value) => {
    setThresholds((prev) => ({ ...prev, [key]: value }))
  }

  const validateAndSave = () => {
    const nextErrors = {}
    const pairs = [
      ['phMin', 'phMax'],
      ['tdsMin', 'tdsMax'],
      ['waterTempMin', 'waterTempMax'],
      ['humidityMin', 'humidityMax'],
    ]
    pairs.forEach(([minKey, maxKey]) => {
      if (Number(thresholds[minKey]) >= Number(thresholds[maxKey])) {
        nextErrors[minKey] = 'Minimum must be less than maximum.'
      }
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      pushToast('Settings saved.')
    }
  }

  return (
    <div className="space-y-5 pb-8">
      <div>
        <h1 className="text-lg font-semibold text-ink-800">Settings</h1>
        <p className="text-sm text-ink-400">Configure the farm profile, thresholds, automation and alerts.</p>
      </div>

      <section className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
        <h2 className="font-semibold text-ink-800">System</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Farm Name">
            <input
              className={inputClass}
              value={system.farmName}
              onChange={(e) => setSystem({ ...system, farmName: e.target.value })}
            />
          </Field>
          <Field label="Timezone">
            <select
              className={inputClass}
              value={system.timezone}
              onChange={(e) => setSystem({ ...system, timezone: e.target.value })}
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New York</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </Field>
          <Field label="Temperature Unit">
            <select
              className={inputClass}
              value={system.tempUnit}
              onChange={(e) => setSystem({ ...system, tempUnit: e.target.value })}
            >
              <option value="Celsius">Celsius (°C)</option>
              <option value="Fahrenheit">Fahrenheit (°F)</option>
            </select>
          </Field>
          <Field label="Data Refresh Interval (seconds)">
            <input
              type="number"
              min={1}
              max={60}
              className={inputClass}
              value={system.refreshInterval}
              onChange={(e) => setSystem({ ...system, refreshInterval: e.target.value })}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
        <h2 className="font-semibold text-ink-800">Thresholds</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="pH Minimum">
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={thresholds.phMin}
              onChange={(e) => updateThreshold('phMin', e.target.value)}
            />
            {errors.phMin && <p className="mt-1 text-xs text-rust-500">{errors.phMin}</p>}
          </Field>
          <Field label="pH Maximum">
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={thresholds.phMax}
              onChange={(e) => updateThreshold('phMax', e.target.value)}
            />
          </Field>

          <Field label="TDS Minimum (ppm)">
            <input
              type="number"
              className={inputClass}
              value={thresholds.tdsMin}
              onChange={(e) => updateThreshold('tdsMin', e.target.value)}
            />
            {errors.tdsMin && <p className="mt-1 text-xs text-rust-500">{errors.tdsMin}</p>}
          </Field>
          <Field label="TDS Maximum (ppm)">
            <input
              type="number"
              className={inputClass}
              value={thresholds.tdsMax}
              onChange={(e) => updateThreshold('tdsMax', e.target.value)}
            />
          </Field>

          <Field label="Water Temperature Minimum (°C)">
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={thresholds.waterTempMin}
              onChange={(e) => updateThreshold('waterTempMin', e.target.value)}
            />
            {errors.waterTempMin && <p className="mt-1 text-xs text-rust-500">{errors.waterTempMin}</p>}
          </Field>
          <Field label="Water Temperature Maximum (°C)">
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={thresholds.waterTempMax}
              onChange={(e) => updateThreshold('waterTempMax', e.target.value)}
            />
          </Field>

          <Field label="Humidity Minimum (%)">
            <input
              type="number"
              className={inputClass}
              value={thresholds.humidityMin}
              onChange={(e) => updateThreshold('humidityMin', e.target.value)}
            />
            {errors.humidityMin && <p className="mt-1 text-xs text-rust-500">{errors.humidityMin}</p>}
          </Field>
          <Field label="Humidity Maximum (%)">
            <input
              type="number"
              className={inputClass}
              value={thresholds.humidityMax}
              onChange={(e) => updateThreshold('humidityMax', e.target.value)}
            />
          </Field>

          <Field label="Water Level Minimum (%)">
            <input
              type="number"
              className={inputClass}
              value={thresholds.waterLevelMin}
              onChange={(e) => updateThreshold('waterLevelMin', e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
        <h2 className="font-semibold text-ink-800">Automation</h2>
        <div className="mt-1 divide-y divide-ink-100">
          <Toggle
            label="Automatic pump control"
            description="Let the system run water and circulation pumps based on sensor readings."
            checked={automation.autoPump}
            onChange={(v) => setAutomation({ ...automation, autoPump: v })}
          />
          <Toggle
            label="Automatic lighting"
            description="Schedule grow lights based on time of day."
            checked={automation.autoLighting}
            onChange={(v) => setAutomation({ ...automation, autoLighting: v })}
          />
          <Toggle
            label="Automatic nutrient control"
            description="Dose nutrients automatically when TDS drifts out of range."
            checked={automation.autoNutrient}
            onChange={(v) => setAutomation({ ...automation, autoNutrient: v })}
          />
          <Toggle
            label="Automatic alerts"
            description="Generate alerts automatically when thresholds are crossed."
            checked={automation.autoAlerts}
            onChange={(v) => setAutomation({ ...automation, autoAlerts: v })}
          />
        </div>
      </section>

      <section className="rounded-xl border border-ink-100 bg-white p-5 shadow-panel">
        <h2 className="font-semibold text-ink-800">Notifications</h2>
        <div className="mt-1 divide-y divide-ink-100">
          <Toggle
            label="Critical alerts"
            checked={notifications.critical}
            onChange={(v) => setNotifications({ ...notifications, critical: v })}
          />
          <Toggle
            label="Warning alerts"
            checked={notifications.warning}
            onChange={(v) => setNotifications({ ...notifications, warning: v })}
          />
          <Toggle
            label="Sensor disconnect alerts"
            checked={notifications.disconnect}
            onChange={(v) => setNotifications({ ...notifications, disconnect: v })}
          />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          onClick={validateAndSave}
          className="rounded-lg bg-canopy-600 px-4 py-2 text-sm font-medium text-white hover:bg-canopy-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}
