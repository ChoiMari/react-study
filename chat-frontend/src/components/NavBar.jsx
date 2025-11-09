// src/components/NavBar.jsx
import { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useNotification } from "../context/useNotification";
import useNotificationSocket from "../hooks/useNotificationSocket";
import { getNotifications } from "../api/notifyApi";

export default function NavBar() {
  const { loginUser, logout } = useAuth();
  const { notifyCount, setCount, increase, reset } = useNotification();
  const navigate = useNavigate();

  // ✅ 실시간 웹소켓 알림 수신 (자동 증가)
  useNotificationSocket(
    loginUser?.id,
    useCallback(
      (notify) => {
        increase();
        console.log("새 알림:", notify);
      },
      [increase]
    )
  );

  // ✅ 로그인 시 알림 개수 초기화
  useEffect(() => {
    if (loginUser) {
      (async () => {
        try {
          const res = await getNotifications();

          // 응답이 배열인지 확인 (배열 아니면 .data 내부 확인)
          const list = Array.isArray(res)
            ? res
            : Array.isArray(res.data)
            ? res.data
            : [];

          setCount(list.filter((n) => !n.isRead).length);
        } catch (e) {
          console.error("알림 조회 실패", e);
          setCount(0);
        }
      })();
    } else {
      reset();
    }
  }, [loginUser, setCount, reset]);

  // ✅ 로그아웃 처리
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("로그아웃 실패");
    }
  };

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
      <div
        style={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        WebSocket Chat
      </div>

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
