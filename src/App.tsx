import { Routes, Route, useLocation } from 'react-router-dom'
import Monitoramento from './pages/Monitoramento'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import Agenda from './pages/Agenda'
import Header from './components/Header'
import Chat from './pages/Chat'

function App() {
  const location = useLocation()

  const hideFooterRoutes = ['/']

  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-200">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/monitoramento" element={<Monitoramento />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/home" element={<Home />} />
          <Route path="/agenda" element={<Agenda />} />
        </Routes>
      </div>
      {shouldShowFooter && <Footer />}
    </div>
  )
}

export default App
