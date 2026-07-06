// ─── Shared ────────────────────────────────────────────────────────────────

export interface Address {
  line1: string
  line2?: string
  town: string
  county?: string
  postcode: string
}

export interface AuditEntry {
  date: string
  userId: string
  userName: string
  action: string
  detail?: string
}

export type ConsentStatus = 'opted_in' | 'opted_out' | 'not_captured'

export interface ConsentChannel {
  status: ConsentStatus
  capturedAt?: string
  method?: string
  policyVersion?: string
}

export interface MarketingConsent {
  email: ConsentChannel
  sms: ConsentChannel
  postal: ConsentChannel
  phone: ConsentChannel
  thirdParty: ConsentChannel
}

// ─── Contact ────────────────────────────────────────────────────────────────

export type ContactRole =
  | 'seller'
  | 'buyer'
  | 'tenant'
  | 'landlord'
  | 'solicitor'
  | 'mortgage_broker'
  | 'viewing_agent'

export interface ContactNote {
  id: string
  text: string
  role?: ContactRole
  createdAt: string
  createdBy: string
}

export interface Contact {
  id: string
  title?: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  roles: ContactRole[]
  primaryPhone?: string
  secondaryPhone?: string
  email?: string
  preferredContactMethod?: 'phone' | 'email' | 'post'
  currentAddress?: Address
  marketingConsent: MarketingConsent
  source?: string
  idVerificationStatus: 'not_started' | 'pending' | 'verified' | 'failed'
  notes: ContactNote[]
  createdAt: string
  createdBy: string
}

// ─── Property ───────────────────────────────────────────────────────────────

export type PropertyStatus =
  | 'pre_appraisal'
  | 'market_appraisal'
  | 'instructed'
  | 'for_sale'
  | 'sold_stc'
  | 'exchanged'
  | 'completed'
  | 'withdrawn'

export type PropertyType =
  | 'detached'
  | 'semi_detached'
  | 'terraced'
  | 'flat'
  | 'bungalow'
  | 'maisonette'
  | 'other'

export type Tenure = 'freehold' | 'leasehold' | 'share_of_freehold' | 'commonhold'

export type AgencyType = 'sole' | 'multi' | 'joint'

export type MarketingMode = 'sales' | 'lettings' | 'both'

export interface PropertyStatusChange {
  from: PropertyStatus
  to: PropertyStatus
  date: string
  userId: string
  userName: string
  reason?: string
}

export interface Property {
  id: string
  marketingMode: MarketingMode
  status: PropertyStatus
  address: Address
  tenure?: Tenure
  type?: PropertyType
  bedrooms?: number
  bathrooms?: number
  receptions?: number
  floorArea?: number
  epcRating?: string
  conditionRating?: 1 | 2 | 3 | 4 | 5
  parking?: string[]
  outdoorSpace?: string
  keyFeatures?: string[]
  notes?: string
  agencyType?: AgencyType
  marketingPrice?: number
  instructedFee?: number
  instructedFeeType?: 'percent' | 'fixed'
  valuationLow?: number
  valuationHigh?: number
  sellerId?: string
  assignedAgentId?: string
  assignedAgentName?: string
  shortDescription?: string
  longDescription?: string
  portalStatus?: Record<string, 'live' | 'pending' | 'failed' | 'removed'>
  statusHistory: PropertyStatusChange[]
  createdAt: string
  updatedAt: string
  listedAt?: string
  daysOnMarket?: number
}

// ─── Applicant ──────────────────────────────────────────────────────────────

export type ApplicantStatus = 'active' | 'archived'
export type ApplicantTemperature = 'hot' | 'warm' | 'cold'
export type FundingType = 'cash' | 'mortgage' | 'part_part'
export type AipStatus = 'not_started' | 'in_progress' | 'obtained' | 'declined'

export interface Applicant {
  id: string
  contactId: string
  contactName: string
  mode: 'sales' | 'lettings'
  status: ApplicantStatus
  temperature: ApplicantTemperature
  propertyTypes: PropertyType[]
  minBudget?: number
  maxBudget?: number
  minBedrooms?: number
  minBathrooms?: number
  preferredLocations: string[]
  mustHaveFeatures: string[]
  requirementNotes?: string
  motivation?: string
  timescale?: string
  fundingType?: FundingType
  aipStatus?: AipStatus
  aipExpiry?: string
  depositAmount?: number
  currentPropertyStatus?: 'on_market_us' | 'on_market_elsewhere' | 'sold_stc' | 'no_property' | 'unconfirmed'
  financialServicesReferral?: boolean
  financialServicesConsent?: boolean
  createdAt: string
  updatedAt: string
}

// ─── Enquiry / Lead ─────────────────────────────────────────────────────────

export type EnquirySource = 'rightmove' | 'zoopla' | 'onthemarket' | 'phone' | 'email' | 'walk_in' | 'website' | 'referral'
export type EnquiryStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'discarded'

export interface Enquiry {
  id: string
  source: EnquirySource
  status: EnquiryStatus
  contactName: string
  contactPhone?: string
  contactEmail?: string
  propertyId?: string
  message?: string
  notes?: string
  receivedAt: string
  assignedAgentId?: string
  assignedAgentName?: string
}

// ─── Viewing ────────────────────────────────────────────────────────────────

export type ViewingStatus = 'booked' | 'attended' | 'no_show' | 'cancelled'
export type InterestLevel = 'very_interested' | 'interested' | 'neutral' | 'not_interested'

export interface ViewingFeedback {
  interestLevel: InterestLevel
  likelihoodToOffer: 1 | 2 | 3 | 4 | 5
  positives?: string
  concerns?: string
  followUpAction?: string
  internalNotes?: string
  customerFacingNotes?: string
  submittedAt: string
  submittedBy: string
}

export interface Viewing {
  id: string
  propertyId: string
  propertyAddress: string
  applicantId: string
  applicantName: string
  date: string
  duration: number
  type: 'accompanied' | 'unaccompanied'
  agentId?: string
  agentName?: string
  status: ViewingStatus
  feedback?: ViewingFeedback
  createdAt: string
}

// ─── Offer ──────────────────────────────────────────────────────────────────

export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'unsuccessful'

export interface OfferIncrease {
  amount: number
  date: string
  upliftValue: number
  upliftPercent: number
  notes?: string
}

export interface Offer {
  id: string
  propertyId: string
  propertyAddress: string
  applicantId: string
  applicantName: string
  amount: number
  status: OfferStatus
  conditions?: string
  fundingVerified: boolean
  increases: OfferIncrease[]
  solicitorId?: string
  createdAt: string
  updatedAt: string
}

// ─── Key Record ─────────────────────────────────────────────────────────────

export type KeyStatus = 'in_office' | 'released'

export interface KeyRelease {
  recipientName: string
  date: string
  reason: string
  contactId?: string
}

export interface KeyReturn {
  date: string
  receivedBy: string
}

export interface KeyRecord {
  id: string
  keyNumber: string
  propertyId: string
  propertyAddress: string
  keyType: 'front_door' | 'back_door' | 'garage' | 'communal' | 'other'
  copies: number
  status: KeyStatus
  notes?: string
  latestRelease?: KeyRelease
  releases: (KeyRelease & { returnedAt?: string })[]
  createdAt: string
}

// ─── Progression ────────────────────────────────────────────────────────────

export type MilestoneStatus = 'pending' | 'in_progress' | 'completed' | 'overdue' | 'blocked'

export interface ProgressionMilestone {
  id: string
  propertyId: string
  name: string
  status: MilestoneStatus
  targetDate?: string
  completedDate?: string
  notes?: string
  prerequisiteIds: string[]
  order: number
}

export type ChainLinkStatus = 'active' | 'at_risk' | 'fallen_through' | 'completed'

export interface ChainLink {
  id: string
  position: 'above' | 'below'
  isInternal: boolean
  propertyId?: string
  propertyAddress: string
  buyerName?: string
  sellerName?: string
  status: ChainLinkStatus
  agentName?: string
  lastConfirmedDate?: string
  notes?: string
}

export interface Chain {
  id: string
  propertyId: string
  links: ChainLink[]
  createdAt: string
  updatedAt: string
}

// ─── Document ────────────────────────────────────────────────────────────────

export type DocumentType =
  | 'terms_of_business'
  | 'aml_id_form'
  | 'epc_order'
  | 'sales_particulars'
  | 'viewing_confirmation'
  | 'offer_notification'
  | 'memorandum_of_sale'
  | 'sales_progression_pack'
  | 'exchange_confirmation'
  | 'completion_confirmation'
  | 'invoice'
  | 'withdrawal_letter'

export interface Document {
  id: string
  type: DocumentType
  propertyId: string
  propertyAddress: string
  recipientId?: string
  recipientName?: string
  generatedAt: string
  generatedBy: string
  sentAt?: string
  isAiAssisted?: boolean
}

// ─── Activity Feed ───────────────────────────────────────────────────────────

export type ActivityEventType =
  | 'property_status_change'
  | 'viewing_booked'
  | 'viewing_attended'
  | 'offer_submitted'
  | 'offer_accepted'
  | 'applicant_registered'
  | 'enquiry_received'
  | 'document_sent'
  | 'milestone_completed'

export interface ActivityEvent {
  id: string
  type: ActivityEventType
  description: string
  propertyId?: string
  propertyAddress?: string
  userId: string
  userName: string
  occurredAt: string
}
