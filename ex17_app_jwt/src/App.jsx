import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage';
import InfoPage from './pages/InfoPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/info" element={<InfoPage />}/>
          <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
