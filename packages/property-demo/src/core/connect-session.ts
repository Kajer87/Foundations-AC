import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: process.env.connectClientId,
  connectOAuthUrl: process.env.connectOAuthUrl,
  connectUserPoolId: process.env.connectUserPoolId,
})
