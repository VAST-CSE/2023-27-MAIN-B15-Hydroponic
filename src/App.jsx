import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import MobileMenu from './components/layout/MobileMenu'
import ToastStack from './components/common/ToastStack'
import ConfirmModeModal from './components/common/ConfirmModeModal'
import { AppProvider } from './context/AppContext'
import { useSensors } from './hooks/useSensors'
import { useDevices } from './hooks/useDevices'
import { useAlerts } from './hooks/useAlerts'

import Dashboard from './pages/Dashboard'
import Sensors from './pages/Sensors'
import Analytics from './pages/Analytics'
import Controls from './pages/Controls'
import Alerts from './pages/Alerts'
import Farm from './pages/Farm'
import Settings from './pages/Settings'

function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const alertsState = useAlerts()
  const sensorsState = useSensors({
    onThresholdCross: (sensorKey, status, value) => {
      alertsState.addAlertFromThreshold(sensorKey, status, value)
    },
  })
  const devicesState = useDevices()

  return (
    <div className="flex min-h-screen bg-[#f6f8f6]">
      <Sidebar />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar
          onMenuClick={() => setMobileMenuOpen(true)}
          updatedAt={sensorsState.updatedAt}
          connected={sensorsState.connected}
          alerts={alertsState.alerts}
          unreadCount={alertsState.unreadCount}
          markRead={alertsState.markRead}
        />

        <main className="flex-1 p-4 md:p-6">
          <Routes>
            <Route
              path="/"
              element={<Dashboard sensors={sensorsState} devices={devicesState} alerts={alertsState} navigate={navigate} />}
            />
            <Route path="/sensors" element={<Sensors sensors={sensorsState} />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/controls" element={<Controls devices={devicesState} />} />
            <Route path="/alerts" element={<Alerts alerts={alertsState} />} />
            <Route path="/farm" element={<Farm sensors={sensorsState} devices={devicesState} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      <ToastStack />
      <ConfirmModeModal />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
