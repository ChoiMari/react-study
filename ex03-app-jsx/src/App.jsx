import "./App.css";
import Test from "./component/Test.jsx";
import Test2 from "./component/Test2.jsx";
import Test3 from "./component/Test3.jsx";
import Test4 from "./component/Test4.jsx";
import User from "./component/User.jsx";
/*
App.jsx는 루트 컴포넌트(부모)
그 밑으로 하위 컴포넌트 예) Test.jsx, Test2.jsx는 자식 컴포넌트
그럼 루트가 하위(자식)에게 데이터 전달이 가능
props라고 부른다
전달하는 자원은 {20+10}, {true}, {객체}, {배열}, {함수} 가능

*/
function App() {
  const user = {
    name: "김유신",
    age: 20,
    email: "kim@naver.com",
    imgUrl:
      "https://img.freepik.com/free-psd/3d-illustration-of-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1723697466~exp=1723698066~hmac=cb1308967c2c5686b6bd05ed53f2fe50aa1fcb20554e7f118ed75f53ab5abb03",
  };
  const user2 = {
    name: "홍길동",
    age: 20,
    email: "kim@naver.com",
    imgUrl: "",
  };

  return (
    <div style={{ padding: "10px", fontFmily: "궁서체" }}>
      <Test />
      <Test2 isLoggedIn={true} />
      <Test3 />
      <Test4 />
      <User user={user} />
      <User user={user2} />
    </div> //props 하위 컴포넌트에게 데이터 전달
  );
}

export default App;
