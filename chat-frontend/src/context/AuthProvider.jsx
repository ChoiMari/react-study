// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import http from "../api/httpClient";
import { AuthContext } from "./AuthContext";

/**
 * AuthProvider
 * - 세션 기반 로그인 유지
 * - 로그인 시 JSESSIONID 쿠키를 받아 브라우저에 저장
 * - 새로고침 시 /api/users/me 호출로 로그인 복구
 */
export function AuthProvider({ children }) {
  const [loginUser, setLoginUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 세션 복구 (새로고침 시 자동)
  useEffect(() => {
    (async () => {
      try {
        const res = await http.get("/api/users/me", {
          withCredentials: true, // ✅ 쿠키 포함해서 요청
        });
        setLoginUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          console.log("세션 없음 → 로그인 필요");
        } else {
          console.error("세션 복구 실패:", err);
        }
        setLoginUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ 로그인
  const login = async (username, password) => {
    const res = await http.post(
      "/api/users/login",
      { username, password },
      { withCredentials: true } // ✅ Set-Cookie 인식용
    );
    setLoginUser(res.data);
    return res.data;
  };

  // ✅ 로그아웃
  const logout = async () => {
    try {
      await http.post("/api/users/logout", {}, { withCredentials: true });
    } finally {
      setLoginUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
