//JSX 주의 사항
// 1. {} 내부에는 자바스크립트 표현식만 사용 가능하다.
//  자바스크립트 표현식 ? 삼항연산자나 값이나 변수처럼 특정한 값으로 평가되는 식을 말함
//  {}안에 if문이나 for문을 쓰면 오류발생 -> 값으로 평가 되지 않음
// 2. JSX에서는 숫자, 문자열 배열 값만 렌더링 된다.
//    {true} boolean타입이나 {undefined}, {null}은 렌더링 되지 않는다.
//    {true},{undefined},{null} 이건 오류는 나지 않지만 그려지지는 않음
//     {객체}는 오류 발생. 리액트는 객체를 직접 JSX안에 렌더링 할 수 없다.
const Main = () => {

    const number = 9;
    const obj = {name : "나는 객체"};

    const users = [
            { name: "길동이", age: 20 },
            { name: "춘향이", age: 22 }
        ];

    return (
        <main>
            <h1>main</h1>
            <h2>{number % 2 === 0 ? "짝수" : "홀수" }</h2>
            {10} <br />
            {number} <br />
            {[1,2,3,4,5]} <br />
            {/*아래는 화면에 렌더링 되지 않음
            숫자, 문자열, 배열 값만 화면에 그려짐 */}
            {true}
            {undefined}
            {null}
            {/*객체를 넣으면 오류발생
            객체는 리액트의 자식으로써 유효하지 않음 */}
            {/* {obj}-> 오류 발생 */}
            {obj.name}
            {users.map((user, index) => {
                return <p key={index}>{user.name}, {user.age}</p>
            })}

        </main>
    )
}
export default Main;
//Main 함수 컴포넌트를 기본으로 내보냄
// default로 내보내게 되면 호출하는 곳에서 import 시 {}생략
