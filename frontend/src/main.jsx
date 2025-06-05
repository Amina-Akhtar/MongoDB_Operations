import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MongoDBOperations from './Components/MongoDBOperations.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MongoDBOperations />
  </StrictMode>,
)
