
import React, { useState, useMemo } from 'react';
import './App.css'

//복잡한 계산
const hardCalcuate = (number) => {
  console.log("복잡한 논리를 가지는 계산");
  for(let i = 0;i < 999999999; i++){
    //복잡한 논리

  }

  return number + 10000;

}

//쉬운 계산
const easyCalculate = (number) => {
  console.log("쉬운계산");
  return number + 1;
}

function App() {
  const [hardNumber, setHardNumber] = useState(1);
  //hardNumber값이 변경 되면 App는 호출 되서 재 렌더링
  const [easyNumber, setEasyNumber] = useState(1);
  //easyNumber값이 변경 되면 App 호출 -> 재 렌더링

  //const hardSum = hardCalcuate(hardNumber); 
  // 함수 호출 값을 hardSum에 할당
  //const easySum = easyCalculate(easyNumber);

  const hardSum = useMemo(() => {return hardCalcuate(hardNumber)}, [hardNumber]);
  const easySum = useMemo(() => {return easyCalculate(easyNumber)}, [easyNumber]);

  /*
  이 코드는 hardNumber가 바뀔 때만 hardCalculate()가 호출되고,
  그 외에는 이전 계산된 값(hardSum)을 메모이제이션된 값으로 재사용합니다.
  따라서 콘솔에 "복잡한 논리를 가지는 계산"은 hardNumber가 바뀔 때만 출력됩니다.

 */

  return (
    <div>
      <h3>복잡한 계산기 논리 수행</h3>
      <input type="number" value={hardNumber} 
      onChange={(e) => (setHardNumber(parseInt(e.target.value)))} />
      <span>+ 10000= {hardSum}</span>

      <h3>쉬운 계산기 논리 수행</h3>
      <input type="number" value={easyNumber} 
      onChange={(e) => (setEasyNumber(parseInt(e.target.value)))} />
      <span>+ 1= {easySum}</span>
    </div>
  )
}

export default App

/*
아래 코드의 문제점
두 개의 논리(함수)를 가지고 있음
1개는 복잡한 논리 함수
1개는 단순한 논리 함수

useState값이 변경되면, App()가 재 호출되면서 재 렌더링 된다.
문제는, 이 2가지 함수가 같이 호출되는 문제점이 있음
나는 단순한 논리함수만 호출하고 싶은데
복잡한 노리함수도 같이 실행되서 호출되고 있다...
App() 함수 내부의 모든 함수가 실행되고 있음..

그래서.. 해결 방안.. 메모이제이션 사용

해결)
        useMemo는 메모이제이션(Memoization)을 통해 특정 값이 변경될 때만 재계산을 수행하도록 
        하여 불필요한 연산을 줄여줍니다
        값(useState)이 변하지 않으면 이전에 계산된 값을 재사용하는 것입니다. 
        이 방법은 특히 계산 비용이 큰 연산을 할 때 유용합니다.
        
        결국 ...useState  변경시에만 특정 계산을 수행

function App() {
  const [hardNumber, setHardNumber] = useState(1);
  //hardNumber값이 변경 되면 App는 호출 되서 재 렌더링
  const [easyNumber, setEasyNumber] = useState(1);
  //easyNumber값이 변경 되면 App 호출 -> 재 렌더링

  const hardSum = hardCalcuate(hardNumber); 
  // 함수 호출 값을 hardSum에 할당
  const easySum = easyCalculate(easyNumber);

  return (
    <div>
      <h3>복잡한 계산기 논리 수행</h3>
      <input type="number" value={hardNumber} 
      onChange={(e) => (setHardNumber(parseInt(e.target.value)))} />
      <span>+ 10000= {hardSum}</span>

      <h3>쉬운 계산기 논리 수행</h3>
      <input type="number" value={easyNumber} 
      onChange={(e) => (setEasyNumber(parseInt(e.target.value)))} />
      <span>+ 1= {easySum}</span>
    </div>
  )
}

export default App
*/