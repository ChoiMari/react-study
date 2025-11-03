
import { useState } from 'react';
import './App.css'

function App() {
  // event
  console.log("App 함수 호출");

  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  let nomalCount = 0; //함수의 지역변수 : 상태 저장 못씀..호출 시 초기화됨

  const handelClick = () => {
    nomalCount += 1;
    setCount(count + 1);
    console.log("nomalCount : " + nomalCount);
    console.log("Count : " + count);
  };

  const inputClick = (e) => {
    setText(e.target.value);
  }; 

  return (
    <div className='App'>
      <p>count : {count}</p>
      <button onClick={handelClick}>count 증가</button>
      <hr />
      <input type='text' value={text} onChange={inputClick} />
      <p>Enter text : {text}</p>
    </div>
  )
}

export default App
