// src/context/AuthContext.jsx
import { createContext } from "react";

/**
 * AuthContext
 * - 로그인 상태를 전역으로 관리하기 위한 Context 객체
 * - 로직은 AuthProvider.jsx에서 처리
 */
export const AuthContext = createContext(null);
