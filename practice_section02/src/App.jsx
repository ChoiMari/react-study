//state로 상태 관리하기
//함수 컴포넌트에서 state를 생성하려면, import 괄호 열고
//useState라는 리액트가 제공하는 내장 함수를 사용해야 한다.

import {useState} from 'react';
import './App.css';

const Bulb = ({light}) => {
  return (
    <div>
      {light === "ON" ? (<h1 style={{backgroundColor: "pink"}}>ON</h1>) : (<h1 style={{backgroundColor:"green"}}>OFF</h1>)}
    </div>
  );

}

function App() {
  const state1 = useState(); 
  // 리액트에서 상태를 관리하기 위해서 제공하는 내장 함수(Hook)를 
  // state변수에 저장
  console.log(state1); // 값을 확인해봄
  // (2) [undefined, ƒ] 
  // 배열 1번째 요소에는 undefined(값이 정의되지 않음)
  // 2번째 요소에는 함수가 저장되어 있음
  //useState()함수는 두 개의 요소를 담은 배열을 반환한다.
  /*
    이때, 이 배열의 첫번째 요소는 새롭게 생성된 state(상태값)
    그래서 useState로 새로운 state를 생성하면서 useState 함수의 아규먼트로
    초기값을 넣어주게 되면 배열의 첫번째 요소로 이 초기값이 들어오게 됨
    -> 이게 state의 현재값(자바로 치면 getter)

    배열의 2번째 요소는 함수인데, 어떤 함수냐면
    이 state값을 변경하는 상태를 변화시키는 함수가 들어 있다
    (자바로 따지자면 setter메서드)
    그래서 이 함수를 특별히, 상태 변화 함수라고 부른다.
  */

    const state2 = useState(0);
    console.log(state2); //(2) [0, ƒ]
    
    /*
      새로운 state를 생성하는 이 useState라는 함수는
      아규먼트로 state의 초기값을 받아서 두 개의 요소를 담은 배열을 반환하고
      첫번째 요소는 state의 현재값이고, 두번째 요소는 이 state를 
      변경 시키는 상태 변화 함수

      그래서 보통은 반환값을 배열로 저장하기 보다는,
      배열의 구조분해할당 문법을 이용한다.
    */
    const [state3, setState3] = useState('초기값');
    console.log(`state3 : ${state3}, setState3 : ${setState3}`);
    //state3 : 초기값, setState3 : function () { [native code] }

    const [count, setCount] = useState(0);
    //전구의 상태
    const [light, setLight] = useState("OFF");
    
  return (
    <>
      <Bulb light={light}/>
      <div>
        <h1 onMouseOver={()=>{
          setLight(light === "OFF" ? "ON" : "OFF");
        }}>{light}</h1>
      </div>
      <div>
        <h1>{state3}</h1>
        <h2>{count}</h2>
        {/* 버튼을 만들어서 사용자가 클릭할 때마다 
        state값을 변경 시켜보자 -> 변경 시 마다 감지해서 자동 리렌더링 된다
        리렌더링 된다는 것은 App함수를 다시 호출해서 새롭게 반환한 return 값을 다시 화면에 그린다는 것
        간단하게 말하면 state값이 변경되면 return을 다시해서 표시하기 때문에 변경된 state값도 표시된다*/}
        <button onClick={() => {
          setCount(count + 1);
          console.log(`count : ${count}, setCount : ${setCount}`);
        }}>증가</button>
        <button onClick={() => {
          setCount(count - 1);
          console.log(`count : ${count}, setCount : ${setCount}`);
        }}>감소</button>
      </div>
    </>
  )
}

export default App
