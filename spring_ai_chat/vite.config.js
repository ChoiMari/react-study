import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // 외부 접근 허용
    port: 5173,        // 포트 변경 가능
    open: true,        // 자동 브라우저 열기
  },
});