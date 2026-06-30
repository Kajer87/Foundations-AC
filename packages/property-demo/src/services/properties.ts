import { Platform } from '@reapit/foundations-ts-definitions'

const API_VERSION = '2020-01-31'
const BASE_URL = process.env.platformApiUrl

export interface PropertiesResult {
  _embedded: Platform.PropertyModel[]
  pageNumber: number
  pageSize: number
  pageCount: number
  totalCount: number
  totalPageCount: number
}

export interface GetPropertiesParams {
  pageSize?: number
  pageNumber?: number
  marketingMode?: string[]
  embed?: string[]
}

export const getProperties = async (
  accessToken: string,
  params: GetPropertiesParams = {},
): Promise<PropertiesResult | null> => {
  const query = new URLSearchParams()

  if (params.pageSize) query.set('pageSize', String(params.pageSize))
  if (params.pageNumber) query.set('pageNumber', String(params.pageNumber))
  params.marketingMode?.forEach((m) => query.append('marketingMode', m))
  params.embed?.forEach((e) => query.append('embed', e))

  const response = await fetch(`${BASE_URL}/properties?${query}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': API_VERSION,
    },
  })

  if (!response.ok) return null
  return response.json()
}
