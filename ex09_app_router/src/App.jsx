
import './App.css'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

//라우팅 src -> route -> Home.jsx, About.jsx로 만들어야하지만
// 지금은 연습이라서.. 그냥 하신다고 함

function Home(){
  return (
    <div>
      <h3>Home page</h3>
      <p>welcome to homepage</p>
    </div>
  )
}

function About(){
  return (
    <div>
      <h3>About page</h3>
      <p>welcome to homepage</p>
    </div>
  )
}

function Contact(){
  return (
    <div>
      <h3>Contact page</h3>
      <p>welcome to homepage</p>
    </div>
  )
}

function App() {

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
