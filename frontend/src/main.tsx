import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const rootEl = document.getElementById('root')!

// react-snap prerenders the app and saves the HTML.
// When a user visits the prerendered page, React must HYDRATE (attach to existing DOM)
// instead of RENDER (replace DOM). This is the React 18 compatible way to do that.
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootEl,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
