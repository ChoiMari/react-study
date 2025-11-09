import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  server: {
    host: "0.0.0.0", // 개발 서버 설정 //외부(같은 네트워크)에서 접근 가능하게 함 (예: 휴대폰, 다른 PC) //기본값은 'localhost
    port: 5173, //개발 서버 실행 포트
    open: true, //개발 서버 실행 시 자동으로 기본 브라우저를 열어줌
  },
});
