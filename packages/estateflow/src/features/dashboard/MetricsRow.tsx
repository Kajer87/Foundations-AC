import React from 'react'
import { getDashboardMetrics } from '@/data/store'

interface MetricCardProps {
  label: string
  value: number | string
  sub?: string
  accent?: 'default' | 'green' | 'amber' | 'red'
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, sub, accent = 'default' }) => (
  <div className={`metric-card metric-card__accent${accent !== 'default' ? `--${accent}` : ''}`}>
    <div className="metric-card__label">{label}</div>
    <div className="metric-card__value">{value}</div>
    {sub && <div className="metric-card__sub">{sub}</div>}
  </div>
)

export const MetricsRow: React.FC = () => {
  const m = getDashboardMetrics()

  return (
    <div className="metrics-row">
      <MetricCard label="Active Listings" value={m.activeListings} sub="For Sale" accent="green" />
      <MetricCard label="Sold STC" value={m.soldStc} sub="Progressing" accent="amber" />
      <MetricCard label="Exchanged" value={m.exchanged} sub="Awaiting completion" accent="amber" />
      <MetricCard label="Viewings This Week" value={m.viewingsThisWeek} sub="Booked or attended" />
      <MetricCard label="Active Applicants" value={m.activeApplicants} sub="Registered buyers" accent="default" />
      <MetricCard label="Pending Offers" value={m.pendingOffers} sub="Awaiting decision" accent="amber" />
      {m.pendingFeedback > 0 && (
        <MetricCard
          label="Feedback Outstanding"
          value={m.pendingFeedback}
          sub="Attended, no feedback"
          accent="red"
        />
      )}
    </div>
  )
}
