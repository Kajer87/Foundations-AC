# Estateflow CRM — Build Spec

## Product overview

Estateflow is a lightweight CRM for a UK estate and letting agency covering the full lifecycle: capturing and qualifying property instructions and applicants, preparing properties for market, matching and engaging buyers/tenants, managing offers, and progressing sales through to completion. It supports both Sales and Lettings workflows and multi-branch, multi-user operation.

**Terminology note:** prospective buyers and prospective tenants are both referred to as applicants.

---

## Core entities

- **Contact** — any individual the agency interacts with. Can hold multiple roles (seller, applicant, tenant, landlord, solicitor, mortgage broker). Central record that other records link to.
- **Property** — a sales or lettings property, moving through a defined status lifecycle.
- **Enquiry / Lead** — an inbound enquiry (portal, phone, email) before it becomes a full record.
- **Applicant** — a registered buyer or tenant with search requirements.
- **Viewing** — a booked property viewing with outcome and feedback.
- **Offer** — an offer made by an applicant on a property (one live offer per applicant per property, with increase history).
- **KeyRecord** — a physical key held against a property.
- **ProgressionMilestone** — a sales progression step (mortgage, survey, searches, etc.).
- **Chain** — linked transactions connected to a sale.
- **Document** — generated paperwork produced from templates at lifecycle triggers.

---

## Property status lifecycle (sales)

Pre-Appraisal → Market Appraisal → Instructed → For Sale → Sold Subject to Contract → Exchanged → Completed, plus Withdrawn reachable from any active status.

- Status changes auto-drive dependent behaviour (For Sale enables portal publishing + matching; Completed/Withdrawn removes from active matching and live listings).
- Full audit trail of every status change (date, time, user).
- Fall-through after STC/Exchanged can revert to For Sale (remarket) or Withdrawn, with reason + date logged.
- Invalid transitions are blocked or require confirmation, per configurable business rules.

---

## Phase 1 — Capture & Qualify (Sales properties)

**Receive valuation/appraisal request** (portal or website) — inbound requests auto-create an enquiry record with submitted details, visible to the relevant agent.

**Capture inbound phone/email enquiry** — manually log enquiries with source, contact details, date/time, and notes.

**Manage enquiry** — add notes without converting; convert to a full property record; or remove/archive with audit trail. On entering contact details, the system flags potential duplicate contact/enquiry/property records and offers to link to the existing record instead of creating a new one.

**Create full property record from enquiry** — pre-populated from enquiry data, linked back to origin.

**Capture address, tenure, ownership** — saved and visible wherever the property is referenced.

**Book and attend market appraisal** — schedule with date/time/assigned agent; appears in diary; check for diary conflicts. Record outcome as Attended / No-show / Postponed; no-show and postponed prompt notes and rebooking. Full appraisal history is auditable.

**Record valuation range, pricing strategy, and fees** — low/high estimate, pricing strategy notes, agreed fee (% or fixed, VAT in/ex), and appraisal notes (timestamped, attributed). All required before progressing to instruction.

**Capture property attributes** — before a market appraisal is carried out. Structured fields plus a free-text property notes box. Required attributes: property type; bedrooms; bathrooms; reception rooms; other room types; floor area; floors/storeys; outdoor space + size; parking; overall condition rating; EPC rating; current situation (empty / owner occupied / rented / other); key features/selling points; property notes (free text). Selecting "rented" or "other" prompts for extra context. Mandatory fields must be complete before the record is marked ready for appraisal.

**Confirm instruction and agency type** — requires valuation, pricing strategy, and quoted fee first. Select agency type (sole / multi / joint) and enter type-specific terms. Enter agreed marketing price and instructed fee; system calculates and highlights the difference between quoted and instructed fee. On save: status → Instructed, confirmation date + agent recorded. Instruction details locked without an audit trail of changes.

---

## Phase 2 — Prepare Property for Market

**Enter property descriptions** (manual or AI-generated) — four labelled fields: Short Description, Long Description, Situation, Location.

**Capture EPC and regulatory compliance data** — search EPC register by address/postcode; import rating, expiry, certificate document. Missing/expired items block publishing.

**Complete Material Information (Parts A, B, C)**

- Part A (mandatory): council tax band, price, tenure.
- Part B (mandatory): property type; rooms; construction; utilities; broadband; mobile.
- Part C (where applicable): building safety; restrictions; rights; flood risk; planning; accessibility; coalfield/mining.

**Upload and order property media** — photos/floorplans; web order and brochure order; AI photo enhancement with preview.

**Run pre-listing checklist** — validates required fields; missing Must items block publishing.

**Publish property to portals** — Rightmove, Zoopla, OnTheMarket; per-portal status.

---

## Phase 3 — Match & Engage Buyers

**Match property to active applicants** — dynamic matching with match score. Email individually or in bulk.

**Monitor listing performance** — web traffic, enquiries, viewings, feedback.

**Book viewing from applicant record** — diary conflict check; confirmations to applicant + seller/occupant.

**Capture viewing feedback** — structured fields + internal/customer-facing notes.

**Submit and manage offer** — one live offer per applicant per property; increase history; accept/reject/withdraw.

**Capture applicant solicitor details at point of offer.**

---

## Phase 4 — Sales Progression

**Track progression milestones** — MoS issued; solicitors instructed; mortgage application; surveys; searches; contracts; exchange; completion. Target dates; overdue flagging.

**Manage property chains** — visual chain; internal/external links; split chains; fallen-through flagging.

**Sales progression dashboard** — all active STC → Exchanged sales with overdue + chain-risk flags.

**Confirm exchange of contracts** — pre-exchange milestones check; status → Exchanged.

**Completion management** — confirm completion; final invoice; key release.

---

## Buyers / Applicants — Register & Qualify

**Receive leads from portals** — auto-create lead records.

**Register applicant with requirements** — property type, style, budget, bedrooms, location, features. Structured fields feed matching.

**Qualify motivation and timescale.**

**Capture funding position** — cash / mortgage / AIP; AIP expiry alert.

**Record hot / warm / cold status.**

**Archive / deactivate non-suitable applicant.**

---

## Lettings

Mirrors Sales with lettings-specific fields:
- Rental valuation range; letting fee (tenant-find) + management fee (ongoing).
- Lettings offer: proposed rent (pcm), move-in date, tenancy term, holding deposit (Tenant Fees Act).

---

## Cross-cutting

**Contact record** — title, name, DOB, roles (multi), phones, email, address, consent, source, linked contacts, ID verification, notes.

**Contact notes** — locked once submitted; append-only; filterable by role/context.

**Key management** — key number, property, type, copies, status; release/return records; overdue-return flagging.

**Marketing preferences & GDPR** — per-channel consent; opt-out removes from all lists immediately.

**Document generation** — templates auto-offered at lifecycle triggers; merge fields; tracked sends.

**User management** — roles (Admin, Manager, Negotiator, Viewing Agent, Read Only); branch-level visibility; 2FA; audit log.

**Branding & templates** — logo, brand colours, email header/footer, document library.

---

## Non-functional / build notes

- Regulatory items to verify: Material Information (NTSELAT), AML/ID (Money Laundering Regs), GDPR consent (ICO), holding deposits (Tenant Fees Act 2019).
- Audit trails are a recurring requirement — build a reusable audit-log pattern early.
- Duplicate detection recurs across enquiries, leads, and contacts — build once, reuse.
- Locked/immutable records (submitted notes, submitted feedback) need an append-only pattern.
- Multi-branch + role-based visibility should be in the data model from the start.
