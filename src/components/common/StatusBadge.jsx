import React from 'react'
import { STATUS_LABELS, STATUS_STYLES } from '../../utils/thresholds'

export default function StatusBadge({ status, size = 'md' }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.optimal
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <span className={`inline-flex items-center gap-1.5 ${textSize} font-medium ${style.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {STATUS_LABELS[status] || 'Unknown'}
    </span>
  )
}
