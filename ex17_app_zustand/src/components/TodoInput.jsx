import React from 'react';
import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

const TodoInput = () => {

    const [text , setText] = useState('');
    const addTodo = useTodoStore((state)=>state.addTodo);
    // 여기서 state 는 현재 스토어 내부에 저장된 값을 나타내는 객체 덩어리 (객체.속성명)
    // { count:0 , addTodo:fucntion(){} , remove:function(){} }  전체를 받아서 특정 자원 사용
    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim()){
            addTodo(text);
            setText('');
        }
    }

    return (
     <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할 일을 입력하세요"  />
      <button type="submit">추가</button>
    </form>
    );
};

export default TodoInput;

/*
// counterStore.js


import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

>>>>
import React from "react";
import { useCounterStore } from "./counterStore";

function Counter() {

  //전체 구독
  const { count, increase, decrease, reset } = useCounterStore();

  return (
    <div style={{ padding: 20 }}>
      <h2>Count: {count}</h2>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;


>>>>
선택 구독 버전 (추천)
const count = useCounterStore((state) => state.count);
const increase = useCounterStore((state) => state.increase);


→ 이렇게 하면 필요한 상태만 리렌더링되어 성능 최적화에 유리합니다.
*/