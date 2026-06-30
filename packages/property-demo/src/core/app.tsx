import React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { PropertyList } from '../components/property-list'

const App: React.FC = () => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)

  if (!connectSession || connectInternalRedirect) {
    return null
  }

  return <PropertyList />
}

export default App
