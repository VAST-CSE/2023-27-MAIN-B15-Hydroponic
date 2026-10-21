import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Global app-wide state: the AUTO/MANUAL system mode (referenced by the
// Controls page and every DeviceCard) and the toast queue used for
// confirmation feedback across the app.

const AppContext = createContext(null)

let toastId = 0

export function AppProvider({ children }) {
  const [systemMode, setSystemMode] = useState('AUTO')
  const [toasts, setToasts] = useState([])
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const pushToast = useCallback((message, tone = 'default') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, tone }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const requestSwitchToManual = useCallback(() => setConfirmModalOpen(true), [])

  const confirmSwitchToManual = useCallback(() => {
    setSystemMode('MANUAL')
    setConfirmModalOpen(false)
    pushToast('System switched to Manual Mode.')
  }, [pushToast])

  const cancelSwitchToManual = useCallback(() => setConfirmModalOpen(false), [])

  const switchToAuto = useCallback(() => {
    setSystemMode('AUTO')
    pushToast('System switched to Auto Mode.')
  }, [pushToast])

  const value = useMemo(
    () => ({
      systemMode,
      isAuto: systemMode === 'AUTO',
      requestSwitchToManual,
      confirmSwitchToManual,
      cancelSwitchToManual,
      confirmModalOpen,
      switchToAuto,
      toasts,
      pushToast,
    }),
    [systemMode, requestSwitchToManual, confirmSwitchToManual, cancelSwitchToManual, confirmModalOpen, switchToAuto, toasts, pushToast],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
