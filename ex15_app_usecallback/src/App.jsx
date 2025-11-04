import {useEffect, useState, useCallback} from 'react'; 
import './App.css'

function App() {

  const [number, setNumber] = useState(0);
  const [toggle, setToggle] = useState(true);

  /*
  const someFunction = () => {
    console.log("number : " + number);
    return;
  };
  // POINT : App() 이게 렌더링 될 때마다 함수의 주소가 변한다.

  useEffect(() => {
    console.log("useEffect call");
  }, [someFunction]); // 함수의 주소값이 바뀌면 실행
  //함수의 주소는 재렌더링 될 때마다 다른 값을 갖는다.
  //근데 꼭 바뀌어야하나? 호출 시 마다 참조(주소)가 같으면 안되나?
*/

  const someFunction = useCallback(() => {
    console.log("number : " + number);
    return;
  },[number]); //someFunction은 의존성 배열([number])이 바뀌지 않으면,
  //동일한 함수를 참조하겠다(메모리 주소를 유지하겠다)
//number의 값이 바뀌면 새로운 함수 생성(재렌더링 시 메모리 주소가 달라짐)

    useEffect(() => {
    console.log("useEffect call");
  }, [someFunction]);
  //함수도 주소값을 가지고 있다. (함수도 객체(1급객체))
  //함수의 주소가 바뀌면 useEffect 실행(다른 값으로 판단)
//useEffect [값] 바뀌면 호출 
//someFunction 함수의 주소가 동일하면 실행 안됨
//someFunction 함수의 주소가 바뀔때 마다 useEffect가 실행된다.

/*
            useEffect (콜백함수,[의존성 배열])
            
            1. useEffect(()=>{ 작업 });  랜더링 될때마다
            
            2번의 논리 알고 있어  (value 함수의 이름 )
            2. useEffect(()=>{ 작업 }, [value]);  화면에 첫 랜터링 될대 실행 ,  value 값이 바뀔때 실행
            
            3. useEffect(()=>{ 작업 }, []);     화면에 첫 랜터링  한번 실행 

           답) useState 바꾸면 랜더링 발생 >> 함수 초기화 (다른 주소값을 가지게 됨) >> useEffect  함수의 주소가 다르니
               useEffect  계속 호출

           해결) useCallBack



           일반 함수 (()=>{})	항상 실행됨	렌더링마다 someFunction은 새로운 함수 객체가 됨
          useCallback(()=>..., [number])	number가 바뀔 때만 실행됨	number가 같으면 함수 참조도 유지됨 (메모이제이션)
            버튼 클릭시 마다 TEST


          useCallback은 number가 변경되지 않으면 이전의 함수 객체를 재사용합니다.
         따라서 someFunction의 참조(주소)가 동일하게 유지됨 → useEffect는 실행되지 않음
  */

  return (
    <div className='App'>
      <input type='number' value={number} onChange={(e) => setNumber(e.target.value)} />
      <button onClick={() => {setToggle(!toggle)}}>{toggle.toString()}</button>
      <hr />
      <button onClick={someFunction}>call somefunction</button>
    </div>
  )
}

export default App
