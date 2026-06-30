import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.connectClientId': JSON.stringify(process.env.CONNECT_CLIENT_ID ?? ''),
    'process.env.connectOAuthUrl': JSON.stringify(process.env.CONNECT_OAUTH_URL ?? 'https://connect.reapit.cloud'),
    'process.env.connectUserPoolId': JSON.stringify(process.env.CONNECT_USER_POOL_ID ?? ''),
    'process.env.platformApiUrl': JSON.stringify(
      process.env.PLATFORM_API_URL ?? 'https://platform.reapit.cloud',
    ),
  },
})
