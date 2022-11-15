import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login/LoginPage'
import Home from './pages/Home/HomePage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}