import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/HomePage'
import Login from './pages/Login/LoginPage'
import Register from './pages/Register/RegisterPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}