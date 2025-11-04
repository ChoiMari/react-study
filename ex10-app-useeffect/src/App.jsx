import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');
  const handleCountUpdate = () => {
    setCount(count + 1);
  }

  const handleInputChange = (e) => {
    setName(e.target.value);
  }

  //useEffect 랜더링(호출) 마운트, 업데이트(state 변환, 언마운트)

  useEffect(
    () => {
      console.log("매번 랜더링...");
    }
  )

  //마운트 시에 한 번 호출되고, count라는 useState가 변화될 때 마다
    useEffect(
    () => {
      console.log("count 변화 렌더링");
    }, [count]
  )

    useEffect(
    () => {
      console.log("name 변화 랜더링...");
    }, [name]
  )

  //마운트 때 1번만 호출 - 초기화 가능
    useEffect(
    () => {
      console.log("[] 변화 랜더링...");
    }, []
  )

  return (
    <div className='App'>
      <button onClick={handleCountUpdate}>count_update</button>
      <span>count:{count}</span><br />
      <input type='text' value={name} onChange={handleInputChange}/>
    </div>
  )
}

export default App
