
import './App.css'
import {useState, useReducer} from 'react'


//자바의 열거형(enum)처럼 또는 DB코드 테이블처럼 만듬
//-> 객체형태로
//01 이면 입금, 02면 출금
// 이렇게 판별할 수 있는 것들을 객체로 만듬
const ACTION_TYPES = {
  deposit: 'deposit',
  withdraw: 'withdraw'
};

//복잡한 논리를 처리하는 함수 
const reducer = (state, action) => { // state 값, action은 논리를 제공
  switch(action.type){//action.type이 판단 조건
    case ACTION_TYPES.deposit : return state + action.payload; //입금
    case ACTION_TYPES.withdraw : return state - action.payload; //출금
  }
}

/*
  reducer : 로직, state(값)을 변경하는 논리
  action : 행위에 따라서 논리가 적용되게 하겠다(입금, 출금, 계좌생성, 송금)
  dispatch : 요구, 은행 직원에게 요구함(요구사항을 제시)

  행위에는 입금과 출금이 있음
  onclick 이벤트가 발생하면 dispatch()호출, 부르면
  -> reducer 호출
*/

function App() {
  const [number, setNumber] = useState(0);
//() => {dispatch({type:"deposit", payload:number})
// {type:"deposit", payload:number} 이게 action 객체로 줌

  const [money, dispatch] = useReducer(reducer, 0);
  //const [state, dispatch] = useReducer(reducer, initialState);
  //dispatch → 상태를 바꾸기 위한 트리거(명령 함수)
  //→ 호출 시 자동으로 reducer() 실행됨
  //reducer : 상태(state)가 어떻게 변해야 하는지 정의한 함수
  //action : 어떤 행동을 할지, 어떤 데이터로 처리할지를 담은 객체
  //initialState 초기값
  //{dispatch({type:"deposit", payload:0}
  return (
    <div className='App'>
      <h3>KOSA 은행</h3>
      <p>잔액: {money}</p>
      <hr />
      <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value)) } step="1000" />
      <hr />
      <button onClick={() => {dispatch({type:"deposit", payload:number})}}>예금하기</button>
      <hr />
      <button onClick={() => {dispatch({type:"withdraw", payload:number})}}>출금하기</button>
    </div>
  )
}

export default App
