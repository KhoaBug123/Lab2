// Import StrictMode để kiểm tra các vấn đề tiềm ẩn trong React (chỉ chạy ở dev mode)
import { StrictMode } from 'react'
// Import createRoot để render React app vào DOM (React 18+)
import { createRoot } from 'react-dom/client'
// Import file CSS gốc cho toàn app
import './index.css'
// Import component App (root component)
import App from './App.jsx'

// Render App vào phần tử có id='root' trong index.html
// StrictMode giúp phát hiện lỗi, cảnh báo khi dev
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
