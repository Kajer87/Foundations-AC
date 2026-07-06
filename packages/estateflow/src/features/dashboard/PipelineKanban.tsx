import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getProperties } from '@/data/store'
import type { Property, PropertyStatus } from '@/types'

const COLUMNS: { status: PropertyStatus; label: string }[] = [
  { status: 'pre_appraisal', label: 'Pre-Appraisal' },
  { status: 'market_appraisal', label: 'Mkt Appraisal' },
  { status: 'instructed', label: 'Instructed' },
  { status: 'for_sale', label: 'For Sale' },
  { status: 'sold_stc', label: 'Sold STC' },
  { status: 'exchanged', label: 'Exchanged' },
]

const formatPrice = (p: Property): string => {
  const price = p.marketingPrice
  if (!price) return '—'
  return `£${(price / 1000).toFixed(0)}k`
}

const formatAddress = (p: Property): string => {
  const a = p.address
  return [a.line1, a.town].filter(Boolean).join(', ')
}

interface PipelineCardProps {
  property: Property
  onClick: () => void
}

const PipelineCard: React.FC<PipelineCardProps> = ({ property, onClick }) => (
  <div className="pipeline-card" onClick={onClick} role="button" tabIndex={0}>
    <div className="pipeline-card__address">{formatAddress(property)}</div>
    <div className="pipeline-card__price">{formatPrice(property)}</div>
    <div className="pipeline-card__meta">
      <span className="pipeline-card__agent">
        {property.assignedAgentName?.split(' ')[0] ?? '—'}
      </span>
      {property.bedrooms != null && (
        <span>{property.bedrooms} bed</span>
      )}
    </div>
  </div>
)

export const PipelineKanban: React.FC = () => {
  const navigate = useNavigate()
  const properties = getProperties().filter((p) => p.marketingMode === 'sales')

  return (
    <div className="panel" style={{ marginBottom: 20 }}>
      <div className="panel__header">
        <span className="panel__title">Sales Pipeline</span>
        <button className="btn btn--ghost btn--sm" onClick={() => navigate('/sales')}>
          View all →
        </button>
      </div>
      <div className="panel__body">
        <div className="pipeline">
          <div className="pipeline__track">
            {COLUMNS.map(({ status, label }) => {
              const cards = properties.filter((p) => p.status === status)
              return (
                <div className="pipeline__col" key={status}>
                  <div className="pipeline__col-header">
                    <span className="pipeline__col-label">{label}</span>
                    <span className="pipeline__col-count">{cards.length}</span>
                  </div>
                  <div className="pipeline__cards">
                    {cards.length === 0 ? (
                      <div
                        style={{
                          height: 60,
                          border: '1px dashed var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        None
                      </div>
                    ) : (
                      cards.map((p) => (
                        <PipelineCard
                          key={p.id}
                          property={p}
                          onClick={() => navigate(`/sales/${p.id}`)}
                        />
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
