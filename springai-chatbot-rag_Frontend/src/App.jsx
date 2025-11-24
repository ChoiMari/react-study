import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Rag from './components/Rag'

function App() {

  return (
    <BrowserRouter>
      <nav style={{
        margin:'20px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
       <Link to="/rag">Rag호출</Link>
      </nav>
      <Routes>
        <Route path='/rag' element={<Rag/>}/>
        <Route path='/' element={<div>404페이지 요청 없음</div>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
