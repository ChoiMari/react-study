import { useEffect, useState } from "react";
import { getNotifications, readNotification } from "../api/notifyApi";
import { useAuth } from "../context/useAuth";
import { useNotification } from "../context/useNotification";

export default function NotificationPage() {
  const [notifies, setNotifies] = useState([]);
  const { loginUser } = useAuth();
  const { decrease } = useNotification();

  useEffect(() => {
    if (loginUser) {
      loadNotifications();
    }
  }, [loginUser]);

  const loadNotifications = async () => {
    try {
      const list = await getNotifications();
      setNotifies(list);
    } catch (e) {
      console.error("알림 조회 실패", e);
    }
  };

  const handleRead = async (id) => {
    try {
      await readNotification(id);
      setNotifies((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      decrease();
    } catch (e) {
      console.error("읽음 처리 실패", e);
    }
  };

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
              onClick={() => handleRead(n.id)}
              style={{
                backgroundColor: n.isRead ? "#f9fafb" : "#e0f2fe",
                marginBottom: 8,
                padding: "12px 16px",
                borderRadius: 6,
                cursor: "pointer",
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
