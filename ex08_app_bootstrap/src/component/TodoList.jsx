import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, editTodo }) {
  return (
    <ul className="list-group">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
