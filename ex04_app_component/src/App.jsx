
import './App.css'
import { useState } from 'react';
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';

function App() {
  const [todos, setTodos] = useState([]); // 빈 배열이 초기값
  //JAVA getter(todos), setter(setTodos)
  //useState : App() 리렌더링 되어도 값을 유지한다.

  //값을 추가하는 함수
  const addTodo = (todo) => {
    //기존 배열에 추가
    setTodos([...todos, todo]); // 기존 배열을 복제해서 펼쳐놓고(spread 연산자)
  }

  //값을 삭제 하는 함수
  const removeTodo = (index) => {
    //Javascript Array
    //isArray, map, foreach, filter 기억하기
    /*
      let array = [3,5,11,0,9,'String']
      let result = array.filter((value) => value < 10)
      결과 : [3,5,0,9]가 나온다 
    */
   setTodos(todos.filter((_, i) => i !== index));
   // i와 index가 같은것만 남겨서 리턴함
   //인덱스와 같지 않은 것만 추출(뽑아냄)
   // _는 무시(아규먼트 안 받겠다)
  // 요소값은 안쓰고 인덱스만 사용
   /*
    const todos ['A', 'B', 'C'];
    const index = 1; // 'B'를 제거

    const newTodos = todos.filter((_, i) => i !== index);
    결과 : newTodos ['A', 'C']
   */

    /*
        const numbers = [1,2,3,4,5,6,7,8,9,10];
        1. const evenNumbers = numbers.filter(num => num % 2 === 0); 암시적 리턴
        2.  { } 명시적 return 
        const evenNumbers = numbers.filter(num => { return num % 2 === 0});

        결과 : [2,4,6,8,10]
     */
  }

  return (
    <div style={{padding:'15px'}}>
      <h3>Todo List</h3>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} />
    </div>
  )
}

export default App
