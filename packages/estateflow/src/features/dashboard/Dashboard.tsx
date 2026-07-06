import React from 'react'
import { MetricsRow } from './MetricsRow'
import { PipelineKanban } from './PipelineKanban'
import { ActivityFeed } from './ActivityFeed'
import { AlertsPanel } from './AlertsPanel'

const Dashboard: React.FC = () => (
  <>
    <div className="page-header">
      <div>
        <h1 className="page-header__title">Dashboard</h1>
        <div className="page-header__sub">Monday, 7 December 2024</div>
      </div>
    </div>

    <MetricsRow />

    <div className="dashboard-grid">
      <div className="dashboard-left">
        <PipelineKanban />
        <ActivityFeed />
      </div>
      <div className="dashboard-right">
        <AlertsPanel />
      </div>
    </div>
  </>
)

export default Dashboard
