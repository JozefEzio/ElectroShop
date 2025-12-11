import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Ventes from './pages/Ventes'
import AjouterVentes from './pages/AjouterVentes'
import EditVentes from './pages/EditVentes'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='min-h-screen flex flex-col transition-colors duration-300 bg-background'>
      <Navbar />
      <div className='flex-1 bg-main'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/ventes' element={<Ventes />} />
          <Route path='/ventes/ajouter' element={<AjouterVentes />} />
          <Route path="/ventes/modifier/:id" element={<EditVentes />} />
        </Routes>
      </div>
    </div>
  )
}

export default App