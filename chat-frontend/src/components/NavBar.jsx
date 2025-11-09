// src/components/NavBar.jsx
import { useCallback, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation 추가
import { useAuth } from "../context/useAuth";
import { useNotification } from "../context/useNotification";
import useNotificationSocket from "../hooks/useNotificationSocket";
import { getNotifications } from "../api/notifyApi";

export default function NavBar() {
  const { loginUser, logout } = useAuth();
  const { notifyCount, setCount, increase, reset } = useNotification();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 현재 경로 확인용

  /**
   * ✅ 실시간 WebSocket 알림 처리
   * - type: "NEW" → 알림 개수 증가 (단, 알림 페이지 제외)
   * - type: "READ" → 알림 개수 감소
   * - type: "READ_ALL" → 전체 초기화
   */
  useNotificationSocket(
    loginUser?.id,
    useCallback(
      (event) => {
        console.log("🔔 알림 이벤트 수신:", event);

        switch (event.type) {
          case "NEW":
            // ✅ 알림 페이지에 있으면 뱃지 증가하지 않음
            if (location.pathname === "/notifications") {
              console.log("📍 알림 페이지 내 → NavBar 카운트 증가 생략");
              break;
            }
            increase();
            break;

          case "READ":
            setCount((prev) => Math.max(prev - 1, 0));
            break;

          case "READ_ALL":
            reset();
            break;

          default:
            console.warn("⚠️ 알 수 없는 알림 이벤트:", event);
            break;
        }
      },
      [increase, reset, setCount, location.pathname] // ✅ 경로를 의존성에 포함
    )
  );

  /**
   * ✅ 로그인 후 알림 개수 초기화
   * - 서버에서 읽지 않은(isRead = false) 알림만 카운트
   */
  useEffect(() => {
    if (loginUser) {
      (async () => {
        try {
          const res = await getNotifications();

          // 응답이 배열인지 확인 (백엔드 DTO 구조 대응)
          const list = Array.isArray(res)
            ? res
            : Array.isArray(res.data)
            ? res.data
            : [];

          const unreadCount = list.filter((n) => !n.isRead).length;
          setCount(unreadCount);
        } catch (e) {
          console.error("알림 목록 조회 실패:", e);
          setCount(0);
        }
      })();
    } else {
      reset();
    }
  }, [loginUser, setCount, reset]);

  /**
   * ✅ 로그아웃 처리
   */
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("로그아웃 실패");
    }
  };

  /**
   * ✅ 렌더링 영역
   */
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#2563eb",
        color: "white",
        padding: "12px 24px",
        fontSize: "1rem",
      }}
    >
      {/* 좌측 로고 / 메인 이동 */}
      <div
        style={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        WebSocket Chat
      </div>

      {/* 중앙 메뉴 */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          홈
        </Link>
        <Link
          to="/chatrooms"
          style={{ color: "white", textDecoration: "none" }}
        >
          채팅방
        </Link>

        {loginUser && (
          <Link
            to="/notifications"
            style={{
              position: "relative",
              color: "white",
              textDecoration: "none",
            }}
          >
            🔔 알림
            {notifyCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -10,
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "0.7em",
                  padding: "2px 6px",
                }}
              >
                {notifyCount}
              </span>
            )}
          </Link>
        )}
      </div>

      {/* 우측 유저 정보 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {loginUser ? (
          <>
            <span>{loginUser.name} 님</span>
            <button
              onClick={handleLogout}
              style={{
                background: "white",
                color: "#2563eb",
                border: "none",
                padding: "6px 10px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              로그인
            </Link>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
