import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'

const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MotionConfig reducedMotion={isBot ? 'always' : 'never'}>
          <App />
        </MotionConfig>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
