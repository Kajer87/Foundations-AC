import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

const Dashboard = lazy(() => import('@/features/dashboard/Dashboard'))
const SalesPropertiesList = lazy(() => import('@/features/properties/SalesPropertiesList'))
const Placeholder = lazy(() => import('@/features/Placeholder'))

const Loading: React.FC = () => (
  <div style={{ padding: 32, color: 'var(--color-text-muted)', fontSize: 13 }}>Loading…</div>
)

const mkPlaceholder = (title: string, desc?: string) => (
  <Suspense fallback={<Loading />}>
    <Placeholder title={title} description={desc} />
  </Suspense>
)

export const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="sales"
          element={
            <Suspense fallback={<Loading />}>
              <SalesPropertiesList />
            </Suspense>
          }
        />
        <Route path="sales/:id" element={mkPlaceholder('Property Detail')} />
        <Route path="sales/applicants" element={mkPlaceholder('Sales Applicants')} />
        <Route path="viewings" element={mkPlaceholder('Viewings')} />
        <Route path="offers" element={mkPlaceholder('Offers')} />
        <Route path="progression" element={mkPlaceholder('Sales Progression')} />
        <Route path="lettings" element={mkPlaceholder('Lettings Properties')} />
        <Route path="lettings/applicants" element={mkPlaceholder('Lettings Applicants')} />
        <Route path="keys" element={mkPlaceholder('Keys')} />
        <Route path="contacts" element={mkPlaceholder('Contacts')} />
        <Route path="documents" element={mkPlaceholder('Documents')} />
        <Route path="settings" element={mkPlaceholder('Settings')} />
      </Route>
    </Routes>
  </BrowserRouter>
)
