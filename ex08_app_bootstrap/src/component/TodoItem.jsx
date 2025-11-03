import React from 'react';

function TodoItem({ todo, index, deleteTodo, editTodo }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {todo}
      <div>
        <button onClick={() => editTodo(index)} className="btn btn-sm btn-warning me-2">
          Edit
        </button>
        <button onClick={() => deleteTodo(index)} className="btn btn-sm btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;