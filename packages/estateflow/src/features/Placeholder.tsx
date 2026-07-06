import React from 'react'
import { Icon } from '@/components/ui/Icon'

interface Props {
  title: string
  description?: string
}

const Placeholder: React.FC<Props> = ({ title, description }) => (
  <>
    <div className="page-header">
      <h1 className="page-header__title">{title}</h1>
    </div>
    <div className="panel">
      <div className="empty-state" style={{ padding: '64px 24px' }}>
        <Icon name="file-text" size={36} />
        <div className="empty-state__title">{title} — coming soon</div>
        <div className="empty-state__sub">
          {description ?? 'This screen is planned for a future milestone.'}
        </div>
      </div>
    </div>
  </>
)

export default Placeholder
