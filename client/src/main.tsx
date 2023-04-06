import { TranslatorContextProvider } from 'context/translator'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const Main = () => {
  return (
    <TranslatorContextProvider>
      <App />
    </TranslatorContextProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
