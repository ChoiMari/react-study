import React from 'react';

const List = ({items}) => { // {items} -> ["AAA", "BBB", "CCC"]
    return (
        <div>
           
            {
                items.map((item, index) => (
                    <li key={index}>{item}</li>
                )) // {return} -> ()로 암시적 리턴
            }
        </div>
    );
}; //jsx문법 사용 map으로 출력

export default List;