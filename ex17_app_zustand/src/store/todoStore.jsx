import { create } from 'zustand'

export const useTodoStore = create((set)=>({
  todos : [],
  addTodo : (text) => set( (state) => ({ todos : [...state.todos, {id:Date.now(),text}]})),
  removeTodo : (id) => set( (state) => ({ todos : state.todos.filter((todo) => todo.id != id)}))
}))

/*
create: Zustand의 핵심 함수
set: 상태 변경 함수
todos: 할 일 목록 배열
addTodo, removeTodo: 전역에서 사용할 함수

addtodo : function(text) {  set...  }

increase: () => set((state) => ({ count: state.count + 1 }))
1. increase 함수가 호출되면,
2. set 함수가 실행됨
3. set은 현재 상태를 받아서 새로운 상태 객체 { count: state.count + 1 }를 반환함
4. Zustand 내부에서 상태를 업데이트하고 리렌더링이 발생함 (필요한 컴포넌트만)


*/