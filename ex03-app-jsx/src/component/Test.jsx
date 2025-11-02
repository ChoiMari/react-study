import React from "react";

const Test = () => {
  const name = "김유신";
  const age = 25;
  return (
    <div>
      <h3>{name}</h3>
      <p>{age >= 20 ? "성인" : "미성년자"}</p>
    </div> //{}안에 자바스크립트 문법 사용 가능.
  );
};

export default Test; //default로 내보냄
//import할때 {}안씀(문법)
