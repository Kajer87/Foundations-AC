import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

const ROUTE_ACTIONS: Record<string, { label: string }> = {
  '/': { label: 'Add Property' },
  '/sales': { label: 'Add Property' },
  '/sales/applicants': { label: 'Register Applicant' },
  '/viewings': { label: 'Book Viewing' },
  '/offers': { label: 'Record Offer' },
  '/progression': { label: 'Add Sale' },
  '/lettings': { label: 'Add Letting' },
  '/lettings/applicants': { label: 'Register Applicant' },
  '/keys': { label: 'Add Key' },
  '/contacts': { label: 'Add Contact' },
  '/documents': { label: 'New Document' },
}

interface Props {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
}

export const TopBar: React.FC<Props> = ({ theme, onThemeToggle }) => {
  const location = useLocation()
  const [search, setSearch] = useState('')

  const action = ROUTE_ACTIONS[location.pathname] ?? { label: 'New' }

  return (
    <header className="topbar">
      <div className="topbar__search">
        <span className="topbar__search-icon">
          <Icon name="search" size={14} />
        </span>
        <input
          type="search"
          placeholder="Search properties, contacts, applicants…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="topbar__spacer" />

      <div className="topbar__actions">
        <button className="topbar__theme-toggle" onClick={onThemeToggle} title="Toggle theme">
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
        </button>

        <button className="btn btn--ghost" title="Notifications">
          <Icon name="bell" size={16} />
        </button>

        <button className="btn btn--primary">
          <Icon name="plus" size={14} />
          {action.label}
        </button>
      </div>
    </header>
  )
}
