import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import FoodItems from './pages/FoodItems'
import WasteManagement from './pages/WasteManagement'
import Staff from './pages/Staff'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="lg:pl-64">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/food-items" element={<FoodItems />} />
                <Route path="/waste-management" element={<WasteManagement />} />
                <Route path="/staff" element={<Staff />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
