
import { useState } from 'react'
import './App.css'
import { useRef } from 'react';

//useState, 지역변수, useRef의 차이를 이해하고
// 렌더링에서의 함수 재호출을 이해한다.
function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0); // 내부적으로 {current:0}
  //접근 방식 countRef.current 

  let countvar = 0;

  console.log("countRef : " + countRef);
  console.log("App 렌더링..");

  //함수
  const increaseCount = () => {
    setCount(count + 1);
  }

  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    console.log("ref: " + countRef.current);
  }


  return (
    <div className="App">
          <p>useState : {count}</p>
          <p>useRef : {countRef.current}</p>

          <button onClick={increaseCount}>useState증가</button>
          <button onClick={increaseRef}>useRef증가</button>
    </div>
  )
}

export default App
