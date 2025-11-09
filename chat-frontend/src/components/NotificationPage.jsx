/**
 * NotificationPage.jsx
 *
 * 기능:
 *  - 로그인된 사용자의 알림 목록 조회
 *  - 페이지 진입 시 전체 읽음 처리
 *  - 실시간 WebSocket으로 새 알림 수신 시 목록 자동 업데이트
 */

import { useEffect, useState, useCallback } from "react";
import { getNotifications, readAllNotifications } from "../api/notifyApi";
import { useAuth } from "../context/useAuth";
import { useNotification } from "../context/useNotification";
import { useNavigate } from "react-router-dom";
import useNotificationSocket from "../hooks/useNotificationSocket";

export default function NotificationPage() {
  const [notifies, setNotifies] = useState([]);
  const { loginUser } = useAuth();
  const { reset } = useNotification();
  const navigate = useNavigate();

  // 📩 목록 로드 함수
  const loadNotifications = useCallback(async () => {
    try {
      const list = await getNotifications();
      setNotifies(list);
    } catch (e) {
      console.error("알림 조회 실패:", e);
    }
  }, []);

  // ✅ 페이지 진입 시 전체 읽음 처리 + 목록 로드
  useEffect(() => {
    if (!loginUser) return;
    (async () => {
      await readAllNotifications();
      reset(); // Navbar 뱃지 초기화
      await loadNotifications();
    })();
  }, [loginUser, reset, loadNotifications]);

  // ✅ 실시간 새 알림 수신 처리
  useNotificationSocket(
    loginUser?.id,
    useCallback((event) => {
      if (event.type === "NEW") {
        console.log("📩 새 알림 수신:", event.data);
        // 새 알림 맨 위에 추가
        setNotifies((prev) => [event.data, ...prev]);
      }
    }, [])
  );

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>🔔 알림 목록</h2>
      {notifies.length === 0 ? (
        <p>새로운 알림이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifies.map((n) => (
            <li
              key={n.id}
              onClick={() => n.roomId && navigate(`/chatrooms/${n.roomId}`)}
              style={{
                backgroundColor: "#f9fafb",
                marginBottom: 8,
                padding: "12px 16px",
                borderRadius: 6,
                cursor: n.roomId ? "pointer" : "default",
                transition: "background 0.3s",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{n.title}</div>
              <div style={{ fontSize: "0.9em" }}>{n.message}</div>
              <div
                style={{
                  fontSize: "0.75em",
                  color: "#666",
                  textAlign: "right",
                  marginTop: 4,
                }}
              >
                {new Date(n.createdAt).toLocaleString("ko-KR")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
