import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// 코드 하이라이팅을 위한 스타일시트 (highlight.js)
import 'highlight.js/styles/github-dark.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
