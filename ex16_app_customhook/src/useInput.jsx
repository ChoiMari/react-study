import React, { useState } from 'react';

export function useInput(initValue, submitAction) { // hello, 함수
    const [inputValue, setInputValue] = useState(initValue);
    const handleChange = (e) => {
        setInputValue(e.target.value);
    } 

    const handleSubmit = () => {
        setInputValue('');
        submitAction(inputValue); //  useInput(initValue, submitAction)
    }

    return [inputValue, handleChange, handleSubmit];
}

