import React from 'react';
import { useTodoStore } from '../store/todoStore';

const TodoList = () => {
const {todos , removeTodo} = useTodoStore();

    return (
          <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                {todo.text}{' '}
                <button onClick={() => removeTodo(todo.id)}>삭제</button>
                </li>
            ))}
            </ul>
    );
};

export default TodoList;