
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:userId" element={<User />} />
        {/* 주소창에 입력해보기 
          동적 라우팅 : localhost:5173/user/1 또는
          localhost:5173/user/2 
          userParams()로 받는다
        */}
      </Routes>
    </BrowserRouter>
  ) //path에 따라 보여지는 요소가 다름
}

export default App
