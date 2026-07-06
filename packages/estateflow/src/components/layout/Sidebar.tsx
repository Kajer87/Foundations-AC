import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

interface NavItem {
  path: string
  label: string
  icon: React.ComponentProps<typeof Icon>['name']
}

interface NavSection {
  section: string
  items: NavItem[]
}

const NAV: NavSection[] = [
  {
    section: 'Overview',
    items: [
      { path: '/', label: 'Dashboard', icon: 'dashboard' },
    ],
  },
  {
    section: 'Sales',
    items: [
      { path: '/sales', label: 'Properties', icon: 'home' },
      { path: '/sales/applicants', label: 'Applicants', icon: 'users' },
      { path: '/viewings', label: 'Viewings', icon: 'calendar' },
      { path: '/offers', label: 'Offers', icon: 'tag' },
      { path: '/progression', label: 'Sales Progression', icon: 'trending-up' },
    ],
  },
  {
    section: 'Lettings',
    items: [
      { path: '/lettings', label: 'Properties', icon: 'building' },
      { path: '/lettings/applicants', label: 'Applicants', icon: 'users' },
    ],
  },
  {
    section: 'Operations',
    items: [
      { path: '/keys', label: 'Keys', icon: 'key' },
      { path: '/contacts', label: 'Contacts', icon: 'book' },
      { path: '/documents', label: 'Documents', icon: 'file-text' },
      { path: '/settings', label: 'Settings', icon: 'settings' },
    ],
  },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <aside className="app-sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo__mark">EF</div>
        <span className="sidebar-logo__name">Estateflow</span>
      </div>

      <nav className="sidebar-nav">
        {NAV.map((group) => (
          <React.Fragment key={group.section}>
            <div className="sidebar-nav__section">{group.section}</div>
            {group.items.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path)
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`sidebar-nav__item${isActive ? ' sidebar-nav__item--active' : ''}`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </NavLink>
              )
            })}
          </React.Fragment>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user__avatar">EC</div>
          <div>
            <div className="sidebar-user__name">Emma Clarke</div>
            <div className="sidebar-user__role">Negotiator</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
