import type { Contact, Property, Applicant, Viewing, Offer, ActivityEvent } from '@/types'
import { contacts as contactFixtures } from './fixtures/contacts'
import { properties as propertyFixtures } from './fixtures/properties'
import { applicants as applicantFixtures } from './fixtures/applicants'
import { viewings as viewingFixtures } from './fixtures/viewings'
import { offers as offerFixtures } from './fixtures/offers'
import { activityEvents as activityFixtures } from './fixtures/activity'

export interface Store {
  contacts: Contact[]
  properties: Property[]
  applicants: Applicant[]
  viewings: Viewing[]
  offers: Offer[]
  activityEvents: ActivityEvent[]
}

let store: Store = {
  contacts: [...contactFixtures],
  properties: [...propertyFixtures],
  applicants: [...applicantFixtures],
  viewings: [...viewingFixtures],
  offers: [...offerFixtures],
  activityEvents: [...activityFixtures],
}

export const getStore = (): Store => store

export const updateStore = (updater: (s: Store) => Store): void => {
  store = updater(store)
}

export const getProperties = () => store.properties
export const getProperty = (id: string) => store.properties.find((p) => p.id === id)
export const getContacts = () => store.contacts
export const getContact = (id: string) => store.contacts.find((c) => c.id === id)
export const getApplicants = () => store.applicants
export const getApplicant = (id: string) => store.applicants.find((a) => a.id === id)
export const getViewings = () => store.viewings
export const getOffers = () => store.offers
export const getActivityEvents = () => store.activityEvents

export const getDashboardMetrics = () => {
  const props = store.properties
  const activeStatuses = ['for_sale', 'sold_stc', 'exchanged', 'instructed']
  const viewingsThisWeek = store.viewings.filter((v) => {
    const d = new Date(v.date)
    const now = new Date('2024-12-07')
    const weekAgo = new Date(now)
    weekAgo.setDate(now.getDate() - 7)
    return d >= weekAgo && d <= now
  })
  const pendingFeedback = store.viewings.filter(
    (v) => v.status === 'attended' && !v.feedback,
  )
  return {
    activeListings: props.filter((p) => p.status === 'for_sale').length,
    soldStc: props.filter((p) => p.status === 'sold_stc').length,
    exchanged: props.filter((p) => p.status === 'exchanged').length,
    viewingsThisWeek: viewingsThisWeek.length,
    activeApplicants: store.applicants.filter((a) => a.status === 'active').length,
    pendingOffers: store.offers.filter((o) => o.status === 'pending').length,
    totalActive: props.filter((p) => activeStatuses.includes(p.status)).length,
    pendingFeedback: pendingFeedback.length,
  }
}
