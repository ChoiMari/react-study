// src/context/useAuth.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * useAuth
 * - 어디서든 로그인 상태나 login/logout 함수 접근 가능
 */
export const useAuth = () => useContext(AuthContext);
