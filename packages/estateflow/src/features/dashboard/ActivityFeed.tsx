import React from 'react'
import { getActivityEvents } from '@/data/store'
import type { ActivityEventType } from '@/types'
import { Icon } from '@/components/ui/Icon'

const EVENT_CONFIG: Record<
  ActivityEventType,
  { iconClass: string; icon: React.ComponentProps<typeof Icon>['name'] }
> = {
  offer_submitted: { iconClass: 'activity-icon--offer', icon: 'tag' },
  offer_accepted: { iconClass: 'activity-icon--offer', icon: 'check' },
  viewing_booked: { iconClass: 'activity-icon--viewing', icon: 'calendar' },
  viewing_attended: { iconClass: 'activity-icon--viewing', icon: 'calendar' },
  property_status_change: { iconClass: 'activity-icon--status', icon: 'home' },
  applicant_registered: { iconClass: 'activity-icon--applicant', icon: 'users' },
  enquiry_received: { iconClass: 'activity-icon--enquiry', icon: 'bell' },
  document_sent: { iconClass: 'activity-icon--document', icon: 'file-text' },
  milestone_completed: { iconClass: 'activity-icon--status', icon: 'check' },
}

const formatRelativeTime = (iso: string): string => {
  const now = new Date('2024-12-07T12:00:00Z')
  const then = new Date(iso)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

export const ActivityFeed: React.FC = () => {
  const events = getActivityEvents().slice(0, 8)

  return (
    <div className="panel" style={{ marginBottom: 20 }}>
      <div className="panel__header">
        <span className="panel__title">Recent Activity</span>
      </div>
      <div className="activity-feed">
        {events.map((event) => {
          const config = EVENT_CONFIG[event.type]
          return (
            <div key={event.id} className="activity-item">
              <div className={`activity-icon ${config.iconClass}`}>
                <Icon name={config.icon} size={13} />
              </div>
              <div className="activity-item__body">
                <div className="activity-item__desc">{event.description}</div>
                <div className="activity-item__meta">
                  <span>{event.userName}</span>
                  <span>·</span>
                  <span>{formatRelativeTime(event.occurredAt)}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
