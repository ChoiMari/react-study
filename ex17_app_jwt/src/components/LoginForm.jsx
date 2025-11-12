import React, { useState } from 'react';
import {login} from '../api/auth';
import { useNavigate } from 'react-router-dom'; 

const LoginForm = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();

        const handleLogin = async (e) => {
            e.preventDefault(); //form태그 기본옵션 막음
            try {
                const response = await login({username, password});
                // 구조분해 할당으로 넘겨줌
                //로컬스토리지 사용, 서버쪽에서 응답한 데이터(response)를 받음
                localStorage.setItem('token', response.data);
                //서버쪽에서 응답한 JWT
                navigate('/info');
            } catch (error) {
                alert('로그인 실패 : ' + error.response);
            }
        };

    return (
    <form onSubmit={handleLogin} style={{ padding: '20px' }}>
      <h2>로그인</h2>
      <div>
        <label>ID: </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>PW: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">로그인</button>
    </form>
    );
};

export default LoginForm;