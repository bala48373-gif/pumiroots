import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import keycloak from './services/keycloak.js'

function Root() {
  const [authenticated, setAuthenticated] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    keycloak
      .init({ onLoad: 'check-sso', pkceMethod: 'S256' })
      .then((auth) => {
        setAuthenticated(auth)
        setInitialized(true)
      })
      .catch((err) => {
        console.error('Keycloak init failed', err)
        setInitialized(true)
      })
  }, [])

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <App authenticated={authenticated} />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)