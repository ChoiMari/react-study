import React from 'react';

const Greeting = (props) => { //props통으로 받으면 props.으로 접근
    return (
        <>
         <h1>hello, {props.name}</h1>   
         <h1>hello, {props.uname}</h1>  
         <h1>hello, {props.count}</h1>  
        </>
    );
};

export default Greeting;