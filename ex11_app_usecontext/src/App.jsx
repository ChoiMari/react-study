import './App.css';
import {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

function App() { //root component

  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar(){
  //Toolbar()는 Theme 기능을 사용하지 않는다.
  return (
    <div>
      <h3>Toolbar</h3>
      <ThemeButton />
    </div>
  )
}

function ThemeButton(){
  //난 필요해 App() 부모 컴포넌트가 가지는 데이터를 사용
  const {theme, setTheme} = useContext(ThemeContext); // 전역 객체 사용하겠다
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
      }}
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  )
}

export default App
