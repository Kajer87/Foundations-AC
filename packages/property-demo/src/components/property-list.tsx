import React, { useEffect, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Platform } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { getProperties } from '../services/properties'
import { PropertyCard } from './property-card'

const PAGE_SIZE = 12

export const PropertyList: React.FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [properties, setProperties] = useState<Platform.PropertyModel[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [filter, setFilter] = useState<'all' | 'selling' | 'letting'>('all')

  useEffect(() => {
    if (!connectSession?.accessToken) return

    const fetch = async () => {
      setLoading(true)
      setError(null)
      const marketingMode = filter === 'all' ? ['selling', 'letting', 'sellingAndLetting'] : [filter]
      const result = await getProperties(connectSession.accessToken, {
        pageSize: PAGE_SIZE,
        pageNumber: page,
        marketingMode,
      })
      if (!result) {
        setError('Failed to load properties.')
      } else {
        setProperties(result._embedded ?? [])
        setTotalCount(result.totalCount)
        setTotalPages(result.totalPageCount)
      }
      setLoading(false)
    }

    fetch()
  }, [connectSession, page, filter])

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Properties</h1>
        <div style={styles.filters}>
          {(['all', 'selling', 'letting'] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f)
                setPage(1)
              }}
              style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}
            >
              {f === 'all' ? 'All' : f === 'selling' ? 'For Sale' : 'To Let'}
            </button>
          ))}
        </div>
      </div>

      {loading && <p style={styles.info}>Loading...</p>}
      {error && <p style={{ ...styles.info, color: '#c00' }}>{error}</p>}

      {!loading && !error && properties.length === 0 && <p style={styles.info}>No properties found.</p>}

      <div style={styles.grid}>
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      {!loading && totalPages > 1 && (
        <div style={styles.pagination}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={styles.pageBtn}>
            Previous
          </button>
          <span style={styles.pageInfo}>
            Page {page} of {totalPages} &mdash; {totalCount} properties
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={styles.pageBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '24px 16px',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
  },
  filters: {
    display: 'flex',
    gap: 8,
  },
  filterBtn: {
    padding: '6px 16px',
    border: '1px solid #ccc',
    borderRadius: 20,
    background: '#fff',
    cursor: 'pointer',
    fontSize: 13,
    color: '#444',
  },
  filterBtnActive: {
    background: '#0061a8',
    borderColor: '#0061a8',
    color: '#fff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
  },
  info: {
    color: '#666',
    fontSize: 15,
    padding: '32px 0',
    textAlign: 'center',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 32,
  },
  pageBtn: {
    padding: '8px 20px',
    border: '1px solid #0061a8',
    borderRadius: 4,
    background: '#fff',
    color: '#0061a8',
    cursor: 'pointer',
    fontSize: 14,
  },
  pageInfo: {
    fontSize: 14,
    color: '#666',
  },
}
