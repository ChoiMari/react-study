import React from 'react';
import { useState } from 'react';
import useTodoStore from '../store/todoStore';

const TodoInput = () => {

    const [text, setText] = useState('');
    const addTodo = useTodoStore((state) => state.addTodo);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                placeholder="할 일을 입력하세요"
            />
            <button type="submit">추가</button>
        </form>
    );
};

export default TodoInput;