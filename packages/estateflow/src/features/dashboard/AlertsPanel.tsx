import React from 'react'
import { getStore } from '@/data/store'

interface Alert {
  id: string
  severity: 'red' | 'amber' | 'blue'
  text: string
  action?: string
}

const buildAlerts = (): Alert[] => {
  const store = getStore()
  const alerts: Alert[] = []

  const attendedNoFeedback = store.viewings.filter(
    (v) => v.status === 'attended' && !v.feedback,
  )
  if (attendedNoFeedback.length > 0) {
    alerts.push({
      id: 'feedback',
      severity: 'amber',
      text: `${attendedNoFeedback.length} viewing${attendedNoFeedback.length > 1 ? 's' : ''} attended without feedback`,
      action: 'Chase feedback',
    })
  }

  const noIdVerified = store.contacts.filter(
    (c) => c.roles.includes('seller') && c.idVerificationStatus === 'not_started',
  )
  if (noIdVerified.length > 0) {
    alerts.push({
      id: 'aml',
      severity: 'red',
      text: `${noIdVerified.length} seller${noIdVerified.length > 1 ? 's' : ''} with AML/ID check not started`,
      action: 'Review',
    })
  }

  const expiringSoon = store.applicants.filter((a) => {
    if (!a.aipExpiry) return false
    const expiry = new Date(a.aipExpiry)
    const now = new Date('2024-12-07')
    const diffDays = (expiry.getTime() - now.getTime()) / 86400000
    return diffDays <= 14 && diffDays >= 0
  })
  if (expiringSoon.length > 0) {
    alerts.push({
      id: 'aip',
      severity: 'amber',
      text: `${expiringSoon.length} applicant AIP${expiringSoon.length > 1 ? 's' : ''} expiring within 14 days`,
      action: 'View',
    })
  }

  const pendingOffers = store.offers.filter((o) => o.status === 'pending')
  if (pendingOffers.length > 0) {
    alerts.push({
      id: 'offers',
      severity: 'blue',
      text: `${pendingOffers.length} offer${pendingOffers.length > 1 ? 's' : ''} awaiting vendor response`,
      action: 'View offers',
    })
  }

  const exchangedNoCompletion = store.properties.filter(
    (p) => p.status === 'exchanged',
  )
  if (exchangedNoCompletion.length > 0) {
    alerts.push({
      id: 'completion',
      severity: 'blue',
      text: `${exchangedNoCompletion.length} propert${exchangedNoCompletion.length > 1 ? 'ies' : 'y'} exchanged — confirm completion date`,
      action: 'View',
    })
  }

  return alerts
}

export const AlertsPanel: React.FC = () => {
  const alerts = buildAlerts()

  return (
    <div className="panel">
      <div className="panel__header">
        <span className="panel__title">Actions Required</span>
        {alerts.length > 0 && (
          <span
            style={{
              background: 'var(--color-danger)',
              color: '#fff',
              borderRadius: 'var(--radius-full)',
              padding: '1px 8px',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {alerts.length}
          </span>
        )}
      </div>
      {alerts.length === 0 ? (
        <div className="empty-state" style={{ padding: '24px 16px' }}>
          <div className="empty-state__title">All clear</div>
          <div className="empty-state__sub">No actions required right now</div>
        </div>
      ) : (
        alerts.map((alert) => (
          <div key={alert.id} className="alert-item">
            <div className={`alert-dot alert-dot--${alert.severity}`} />
            <div className="alert-item__text">{alert.text}</div>
            {alert.action && (
              <span className="alert-item__action">{alert.action}</span>
            )}
          </div>
        ))
      )}
    </div>
  )
}
