import React from 'react';
import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom'; 
//import { Navigate } from 'react-router-dom'; 

const RegisterForm = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // 기본옵션 막음

        try {
            await register({username, password});
            alert('회원가입 성공, 로그인 페이지로 이동');
            navigate('/');
            //Navigate('/');
        } catch (error) {
                alert('회원가입 실패 : ' + error.response);
            }
    }
    

    return (
    <form onSubmit={handleRegister} style={{ padding: '20px' }}>
      <h2>회원가입</h2>
      <div>
        <label>ID: </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>PW: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">회원가입</button>
    </form>
    );
};

export default RegisterForm;