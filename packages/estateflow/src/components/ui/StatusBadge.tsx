import React from 'react'
import type { PropertyStatus, ApplicantTemperature } from '@/types'

const STATUS_LABELS: Record<PropertyStatus, string> = {
  pre_appraisal: 'Pre-Appraisal',
  market_appraisal: 'Market Appraisal',
  instructed: 'Instructed',
  for_sale: 'For Sale',
  sold_stc: 'Sold STC',
  exchanged: 'Exchanged',
  completed: 'Completed',
  withdrawn: 'Withdrawn',
}

const STATUS_CLASSES: Record<PropertyStatus, string> = {
  pre_appraisal: 'badge--pre-appraisal',
  market_appraisal: 'badge--market-appraisal',
  instructed: 'badge--instructed',
  for_sale: 'badge--for-sale',
  sold_stc: 'badge--sold-stc',
  exchanged: 'badge--exchanged',
  completed: 'badge--completed',
  withdrawn: 'badge--withdrawn',
}

const TEMP_CLASSES: Record<ApplicantTemperature, string> = {
  hot: 'badge--hot',
  warm: 'badge--warm',
  cold: 'badge--cold',
}

interface PropertyStatusBadgeProps {
  status: PropertyStatus
}

interface TemperatureBadgeProps {
  temperature: ApplicantTemperature
}

export const PropertyStatusBadge: React.FC<PropertyStatusBadgeProps> = ({ status }) => (
  <span className={`badge ${STATUS_CLASSES[status]}`}>
    {STATUS_LABELS[status]}
  </span>
)

export const TemperatureBadge: React.FC<TemperatureBadgeProps> = ({ temperature }) => (
  <span className={`badge ${TEMP_CLASSES[temperature]}`}>
    {temperature.charAt(0).toUpperCase() + temperature.slice(1)}
  </span>
)

export const formatPropertyStatus = (status: PropertyStatus): string => STATUS_LABELS[status]
