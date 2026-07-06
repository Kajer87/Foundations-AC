import type { Offer } from '@/types'

export const offers: Offer[] = [
  {
    id: 'o-001',
    propertyId: 'p-002',
    propertyAddress: '7 Birchwood Close, Cheltenham, GL50 2PT',
    applicantId: 'a-003',
    applicantName: 'Mrs Sarah Calloway',
    amount: 670000,
    status: 'accepted',
    conditions: 'Subject to satisfactory survey and mortgage offer.',
    fundingVerified: true,
    increases: [
      {
        amount: 670000,
        date: '2024-11-14T15:30:00Z',
        upliftValue: 20000,
        upliftPercent: 3.08,
        notes: 'Increased from opening offer following counter.',
      },
    ],
    createdAt: '2024-11-12T10:00:00Z',
    updatedAt: '2024-11-14T15:30:00Z',
  },
  {
    id: 'o-002',
    propertyId: 'p-001',
    propertyAddress: '42 Maple Avenue, Oxford, OX2 7HQ',
    applicantId: 'a-001',
    applicantName: 'Dr Amelia Park',
    amount: 415000,
    status: 'pending',
    conditions: 'Subject to survey.',
    fundingVerified: true,
    increases: [],
    createdAt: '2024-12-07T09:30:00Z',
    updatedAt: '2024-12-07T09:30:00Z',
  },
]
