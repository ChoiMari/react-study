import React from 'react';

const TodoItem = ({todo, index, removeTodo}) => {
    return (
        <div>
            {todo}
            <button onClick={() => {removeTodo(index)}}
                style={{marginLeft:'10px'}}>DataDelete</button>
        </div>
    );
};

export default TodoItem;