import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({todos, removeTodo}) => {
    //todos 할일 목록 : ['잠자기', '밥먹기'] ...
    //TodoItem 목록 만들기(배열의 개수만큼)
    
    //javascript 함수 (forEach, map, filter, ...)
    // map(value, index, array) Point -> 목록을 만듬
    return (
        <ul>
            {
                todos.map((todo, index) => (
                    // {return }안써도 됨 ()안에 쓰면(암시적 return된다)
                    <TodoItem key={index} todo={todo} index={index} 
                        removeTodo={removeTodo} />
                ))
            } 
        </ul>
    );
};

export default TodoList;