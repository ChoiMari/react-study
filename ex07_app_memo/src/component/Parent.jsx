
import React, { useState } from 'react';
import Child from './Child';

const Parent = () => {
    
    console.log("Parent component가 렌더링 되었습니다.");
    const [count, setCount] = useState(0);
    const [name, setName] = useState("홍길동");
    return (
        <div>
            <h3>
                Count : {count}
            </h3>
            <button onClick={() => (setCount(count + 1))}>count 증가</button> 
            <button onClick={() => setName("김유신")}>Props 값 변경 전달</button>
            <hr /> 
            {/* memo 사용해서, props 변경 시 컴포넌트 재렌더링 */}
            <Child name={name} />   
        </div>
    );
};

export default Parent;