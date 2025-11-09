// 목적: 모든 REST 호출에 공통 베이스 URL, 쿠키, JSON 헤더 등을 적용하기 위한 axios 인스턴스
// 실무에서는 인터셉터에서 401 처리(로그인 만료시 강제 이동)도 추가

import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 예: http://localhost:8090
  withCredentials: true, // 세션(JSESSIONID) 쿠키를 백엔드로 보냄
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터: 401 처리 예시
http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // 인증 만료 등 처리: 필요시 전역 이벤트 or 라우터 이동
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default http;
