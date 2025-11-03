import React, { useState } from 'react';

const TodoForm = ({addTodo}) => {
    //함수안에 지역변수
    // let data = 0;
    //시점 : data = 100; 함수가 재호출되면 초기화...

    //함수가 호출될때마다 지역변수 초기화 -> 왜 호출 
    // -> 리엑트 함수형 컴포넌트(UI) > 그림(UI) > 데이터 변화 > 화면를 다시 그린다 > 함수호출
   //함수가 재호출 되더라도 그 값을 유지 >> hook >> useState (재랜더링이 되도 값을 유지)

   //재랜더링의 시점 : useState 값의 변화마다 ... (가상돔 성능 문제 ... 전체 랜더링이 아니면 부분 랜더링 )
    const [input, setInput] = useState('');
    //input -> read
    //setInput -> write

    const handleSubmit = (event) => {
        //기본 이벤트를 막아요
        event.preventDefault(); // 서버로 전송 기본 기능(X)
        if(input.trim() != ''){
            console.log(input);
            //부모 컴포넌트 전달 받은 함수(props)
            //App.jsx가 부모 -> 함수 전달
            addTodo(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} placeholder='Enter new todo'
            onChange={(event)=>setInput(event.target.value)} />
            <button type="submit">todo Add</button>
        </form>
    );
};

export default TodoForm;