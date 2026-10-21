import React from 'react'

export default function DeviceToggle({ isOn, disabled, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={() => onChange(!isOn)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${isOn ? 'bg-canopy-600' : 'bg-ink-200'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          isOn ? 'translate-x-[22px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}
