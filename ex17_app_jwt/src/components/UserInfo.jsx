import React, {useState, useEffect} from 'react';
import {getUserInfo} from '../api/auth'

const UserInfo = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        //State값 변경되는 효과
        const fetchUserInfo = async () => {
            try {
                const response = await getUserInfo();
                setUserInfo(response.data);
            } catch (error) {
                console.log(error);
                setError('토큰이 없거나 만료되었거나 권한이 없습니다');
                //리프레시 토큰 만료 시 재발급 요청을 해야함(/refresh)
            }
        }
        fetchUserInfo();
    }, []); // 마운트 되었을 때 한번만 호출

    return (
    <div style={{ padding: '20px' }}>
      <h2> 로그인된 사용자 정보</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userInfo ? (
        <div>
          <p><strong>원본 토큰 Payload 정보:</strong></p>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      ) : (
        !error && <p>정보를 불러오는 중...</p>
      )}
    </div>
    );
};

export default UserInfo;

/*
//JSON객체를 문자열로 변환
JSON.stringify(userInfo, null, 2)
userInfo 객체를 문자열로 변환함.
null: replacer로, 필터링 없이 전체 출력하겠다는 의미.
2: 들여쓰기(indent)를 2칸으로 설정하여 **가독성 좋은 포맷(JSON 포맷)**으로 출력.


const userInfo = {
  name: "홍길동",
  email: "hong@example.com",
  roles: ["ROLE_USER", "ROLE_ADMIN"]
};

// 권한 정보만 추출
const userRoles = userInfo.roles;

return (
  <div>
    <h3>권한 정보</h3>
    <pre>{JSON.stringify(userRoles, null, 2)}</pre>
  </div>
);
*/