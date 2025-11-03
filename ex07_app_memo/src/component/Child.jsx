import React from 'react';

const Child = ({name}) => {
    console.log("child component가 렌더링 되었습니다.. 호출");
    return (
        <div>
            Child 컴포넌트 {name}
        </div>
    );
};

export default React.memo(Child);
//name값이 변경이 되었으면, 
//name -> memo -> 그 값이 변경되면 name값을 그때 렌더링 하겠다.
//-> React.memo Props를 검사
// 성능 때문에 쓰는 것.
//하위 컴포넌트가 같이 안바뀌게 설정하는 것.
// 홍길동 값이 변경되면 바뀜
// 메모해둔 것과 다르면 재렌더링