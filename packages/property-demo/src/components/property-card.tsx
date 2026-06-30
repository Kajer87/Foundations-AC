import React from 'react'
import { Platform } from '@reapit/foundations-ts-definitions'

interface Props {
  property: Platform.PropertyModel
}

const formatAddress = (address: Platform.PropertyAddressModel | undefined): string => {
  if (!address) return 'Address unavailable'
  return [address.buildingNumber, address.buildingName, address.line1, address.line2, address.postcode]
    .filter(Boolean)
    .join(', ')
}

const formatPrice = (property: Platform.PropertyModel): string => {
  if (property.selling?.price) {
    return `£${property.selling.price.toLocaleString()}`
  }
  if (property.letting?.rent) {
    const freq = property.letting.rentFrequency ?? 'pcm'
    return `£${property.letting.rent.toLocaleString()} ${freq}`
  }
  return 'POA'
}

const formatMode = (mode: string | undefined): string => {
  switch (mode) {
    case 'selling':
      return 'For Sale'
    case 'letting':
      return 'To Let'
    case 'sellingAndLetting':
      return 'For Sale & To Let'
    default:
      return mode ?? ''
  }
}

export const PropertyCard: React.FC<Props> = ({ property }) => {
  const { id, bedrooms, bathrooms, receptions, type, marketingMode } = property

  return (
    <div style={styles.card}>
      <div style={styles.badge}>{formatMode(marketingMode)}</div>
      <div style={styles.price}>{formatPrice(property)}</div>
      <div style={styles.address}>{formatAddress(property.address)}</div>
      <div style={styles.meta}>
        {bedrooms != null && <span>{bedrooms} bed</span>}
        {bathrooms != null && <span>{bathrooms} bath</span>}
        {receptions != null && <span>{receptions} recep</span>}
        {type?.length ? <span>{type[0]}</span> : null}
      </div>
      <div style={styles.id}>Ref: {id}</div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: '16px',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  badge: {
    alignSelf: 'flex-start',
    background: '#0061a8',
    color: '#fff',
    borderRadius: 4,
    padding: '2px 8px',
    fontSize: 12,
    fontWeight: 600,
  },
  price: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a1a',
  },
  address: {
    fontSize: 14,
    color: '#444',
  },
  meta: {
    display: 'flex',
    gap: 12,
    fontSize: 13,
    color: '#666',
  },
  id: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 4,
  },
}
