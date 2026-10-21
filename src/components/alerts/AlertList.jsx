import React from 'react'
import AlertCard from './AlertCard'
import EmptyState from '../common/EmptyState'

export default function AlertList({ alerts, onMarkRead }) {
  if (alerts.length === 0) {
    return <EmptyState title="No alerts" description="Everything on the farm is within range." />
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} onMarkRead={onMarkRead} />
      ))}
    </div>
  )
}
