// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/useAuth"; // ✅ 경로 수정됨
import { useNavigate } from "react-router-dom";

/**
 * Login 컴포넌트
 * - 사용자 입력을 받아 로그인 요청
 * - 로그인 성공 시 /chat 페이지로 이동
 * - 로그인 실패 시 알림 표시
 */
export default function Login() {
  const [username, setUsername] = useState(""); // 사용자명 입력 상태
  const [password, setPassword] = useState(""); // 비밀번호 입력 상태
  const { login } = useAuth(); // 전역 AuthContext의 로그인 함수 사용
  const navigate = useNavigate(); // 페이지 이동용

  /**
   * 로그인 처리 함수
   * - AuthProvider의 login() 호출
   * - 성공 시 /chat으로 이동
   * - 실패 시 경고창 표시
   */
  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/chat");
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인 실패");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>로그인</h2>

      <input
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
