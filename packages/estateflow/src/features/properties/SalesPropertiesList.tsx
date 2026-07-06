import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProperties } from '@/data/store'
import type { Property, PropertyStatus } from '@/types'
import { PropertyStatusBadge, formatPropertyStatus } from '@/components/ui/StatusBadge'
import { Icon } from '@/components/ui/Icon'

const ALL_STATUSES: PropertyStatus[] = [
  'pre_appraisal',
  'market_appraisal',
  'instructed',
  'for_sale',
  'sold_stc',
  'exchanged',
  'completed',
  'withdrawn',
]

const formatAddress = (p: Property): string => {
  const a = p.address
  return [a.line1, a.line2, a.town, a.postcode].filter(Boolean).join(', ')
}

const formatPrice = (p: Property): string => {
  const price = p.marketingPrice
  if (!price) return '—'
  return `£${price.toLocaleString('en-GB')}`
}

const formatDate = (iso: string | undefined): string => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

type SortKey = 'address' | 'status' | 'price' | 'bedrooms' | 'agent' | 'listed' | 'dom'
type SortDir = 'asc' | 'desc'

const SalesPropertiesList: React.FC = () => {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: 'listed', dir: 'desc' })

  const allProps = getProperties().filter((p) => p.marketingMode === 'sales')

  const filtered = useMemo(() => {
    let list = allProps
    if (statusFilter !== 'all') {
      list = list.filter((p) => p.status === statusFilter)
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) =>
          formatAddress(p).toLowerCase().includes(q) ||
          (p.assignedAgentName ?? '').toLowerCase().includes(q) ||
          p.address.postcode.toLowerCase().includes(q),
      )
    }
    return [...list].sort((a, b) => {
      let cmp = 0
      switch (sort.key) {
        case 'address':
          cmp = formatAddress(a).localeCompare(formatAddress(b))
          break
        case 'status':
          cmp = ALL_STATUSES.indexOf(a.status) - ALL_STATUSES.indexOf(b.status)
          break
        case 'price':
          cmp = (a.marketingPrice ?? 0) - (b.marketingPrice ?? 0)
          break
        case 'bedrooms':
          cmp = (a.bedrooms ?? 0) - (b.bedrooms ?? 0)
          break
        case 'agent':
          cmp = (a.assignedAgentName ?? '').localeCompare(b.assignedAgentName ?? '')
          break
        case 'listed':
          cmp = (a.listedAt ?? a.createdAt).localeCompare(b.listedAt ?? b.createdAt)
          break
        case 'dom':
          cmp = (a.daysOnMarket ?? 0) - (b.daysOnMarket ?? 0)
          break
      }
      return sort.dir === 'asc' ? cmp : -cmp
    })
  }, [allProps, statusFilter, search, sort])

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProps.length }
    for (const s of ALL_STATUSES) {
      counts[s] = allProps.filter((p) => p.status === s).length
    }
    return counts
  }, [allProps])

  const toggleSort = (key: SortKey) => {
    setSort((s) => ({
      key,
      dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc',
    }))
  }

  const SortIcon: React.FC<{ col: SortKey }> = ({ col }) => {
    if (sort.key !== col) return <Icon name="sort" size={12} />
    return sort.dir === 'asc' ? <Icon name="arrow-up" size={12} /> : <Icon name="arrow-down" size={12} />
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Sales Properties</h1>
          <div className="page-header__sub">{allProps.length} properties total</div>
        </div>
        <button className="btn btn--primary">
          <Icon name="plus" size={14} />
          Add Property
        </button>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab${statusFilter === 'all' ? ' filter-tab--active' : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          All <span style={{ opacity: 0.7, marginLeft: 4 }}>({statusCounts.all})</span>
        </button>
        {ALL_STATUSES.filter((s) => statusCounts[s] > 0).map((s) => (
          <button
            key={s}
            className={`filter-tab${statusFilter === s ? ' filter-tab--active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {formatPropertyStatus(s)}{' '}
            <span style={{ opacity: 0.7, marginLeft: 4 }}>({statusCounts[s]})</span>
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <div className="filter-bar__search">
          <span className="filter-bar__search-icon">
            <Icon name="search" size={14} />
          </span>
          <input
            type="search"
            placeholder="Search address, postcode, agent…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-muted text-sm">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="table-wrap">
          <div className="empty-state">
            <Icon name="home" size={32} />
            <div className="empty-state__title">No properties found</div>
            <div className="empty-state__sub">Try adjusting the filter or search term</div>
          </div>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => toggleSort('address')}>
                  Address <SortIcon col="address" />
                </th>
                <th onClick={() => toggleSort('status')}>
                  Status <SortIcon col="status" />
                </th>
                <th onClick={() => toggleSort('price')}>
                  Price <SortIcon col="price" />
                </th>
                <th onClick={() => toggleSort('bedrooms')}>
                  Beds <SortIcon col="bedrooms" />
                </th>
                <th>Type</th>
                <th onClick={() => toggleSort('agent')}>
                  Agent <SortIcon col="agent" />
                </th>
                <th onClick={() => toggleSort('listed')}>
                  Listed <SortIcon col="listed" />
                </th>
                <th onClick={() => toggleSort('dom')}>
                  DOM <SortIcon col="dom" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} onClick={() => navigate(`/sales/${p.id}`)}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.address.line1}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                      {p.address.town}, {p.address.postcode}
                    </div>
                  </td>
                  <td>
                    <PropertyStatusBadge status={p.status} />
                  </td>
                  <td style={{ fontWeight: 600 }}>{formatPrice(p)}</td>
                  <td>{p.bedrooms ?? '—'}</td>
                  <td style={{ textTransform: 'capitalize' }}>
                    {p.type?.replace('_', ' ') ?? '—'}
                  </td>
                  <td>{p.assignedAgentName ?? '—'}</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{formatDate(p.listedAt)}</td>
                  <td style={{ color: p.daysOnMarket && p.daysOnMarket > 60 ? 'var(--color-warning)' : 'var(--color-text-secondary)' }}>
                    {p.daysOnMarket != null ? `${p.daysOnMarket}d` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default SalesPropertiesList
