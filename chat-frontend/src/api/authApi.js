import http from "./httpClient";

/**
 * ✅ 공통 설명:
 * 모든 요청은 백엔드 UserController의 /api/users/* 엔드포인트와 통신합니다.
 * axios 인스턴스(http)는 withCredentials:true 설정을 포함해야
 * 브라우저에서 세션 쿠키(JSESSIONID)를 자동으로 주고받을 수 있습니다.
 */

/**
 * 아이디 중복 검사
 * - username을 쿼리 파라미터로 전달하여 서버에서 존재 여부 확인
 * - 서버 응답값: true (중복 있음), false (사용 가능)
 */
export const apiCheckUsername = async (username) => {
  if (!username) throw new Error("Username is required.");

  try {
    const res = await http.get("/api/users/check", {
      params: { username }, // 자동 URL 인코딩
    });
    return res.data; // Boolean
  } catch (err) {
    console.error("❌ 아이디 중복검사 실패:", err);
    throw err;
  }
};

/**
 * 회원가입
 * - username, password, name을 전달
 * - 서버에서 RegisterResponse DTO를 반환
 */
export const apiRegister = async (username, password, name) => {
  try {
    const res = await http.post("/api/users/register", {
      username,
      password,
      name,
    });
    return res.data; // RegisterResponse
  } catch (err) {
    console.error("❌ 회원가입 실패:", err);
    throw err;
  }
};

/**
 * 로그인
 * - username, password 전달
 * - 서버 세션(HttpSession)에 로그인 정보 저장
 * - 성공 시 LoginResponse DTO 반환
 */
export const apiLogin = async (username, password) => {
  try {
    const res = await http.post("/api/users/login", { username, password });
    return res.data; // LoginResponse
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
    console.error("❌ 로그인 실패:", err);
    throw err;
  }
};

/**
 * 로그아웃
 * - 세션을 무효화 (서버 측에서 invalidate)
 * - 응답코드 204(No Content)
 */
export const apiLogout = async () => {
  try {
    await http.post("/api/users/logout");
  } catch (err) {
    console.error("❌ 로그아웃 실패:", err);
    throw err;
  }
};

/**
 * 로그인 유지 확인
 * - 세션에 로그인 정보(loginUser)가 있으면 반환
 * - 없으면 401 반환
 */
export const apiMe = async () => {
  try {
    const res = await http.get("/api/users/me");
    return res.data; // LoginResponse or "로그인이 필요합니다."
  } catch (err) {
    if (err.response?.status === 401) {
      return null; // 로그인 안된 상태
    }
    console.error("❌ 세션 확인 실패:", err);
    throw err;
  }
};
