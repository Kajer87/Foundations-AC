import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'

const rootElement = document.querySelector('#root') as Element
createRoot(rootElement).render(<App />)
