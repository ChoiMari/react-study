// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  server: {
    host: "0.0.0.0", // 같은 네트워크의 다른 기기에서도 접근 가능
    port: 5173,      // 프론트엔드 포트
    open: true,
    proxy: {
      // ✅ /api로 시작하는 요청은 모두 백엔드(8090)으로 프록시
      "/api": {
        target: "http://192.168.2.229:8090",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
