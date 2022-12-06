import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './MPP/App'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

ReactDOM.createRoot(document.body as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
