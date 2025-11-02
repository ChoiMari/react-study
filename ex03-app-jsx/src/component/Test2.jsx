import React from "react";

const Test2 = ({ isLoggedIn }) => {
  return <div>{isLoggedIn ? <p>환영합니다</p> : <p>로그인이 필요</p>}</div>;
};

export default Test2;
