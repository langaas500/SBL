import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Tjenester from './pages/Tjenester'
import Prosjekter from './pages/Prosjekter'
import Om from './pages/Om'
import Kontakt from './pages/Kontakt'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tjenester" element={<Tjenester />} />
        <Route path="/prosjekter" element={<Prosjekter />} />
        <Route path="/om" element={<Om />} />
        <Route path="/kontakt" element={<Kontakt />} />
        {/* Gamle sider som er fjernet */}
        <Route path="/priser" element={<Navigate to="/kontakt" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
