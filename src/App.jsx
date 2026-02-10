import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tjenester from './pages/Tjenester'
import Prosjekter from './pages/Prosjekter'
import Priser from './pages/Priser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tjenester" element={<Tjenester />} />
        <Route path="/prosjekter" element={<Prosjekter />} />
        <Route path="/priser" element={<Priser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
