import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './routes/router'
import './styles/index.css'

const root = document.querySelector('#root') as Element
createRoot(root).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
