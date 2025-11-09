import { useEffect, useState } from "react";
import { getAllRooms, getRooms, createRoom, joinRoom } from "../api/chatApi";
import { Link } from "react-router-dom";

export default function ChatRoomList() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(false);

  // ✅ 방 목록 로드
  useEffect(() => {
    loadRooms();
  }, [showAll]);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = showAll ? await getAllRooms() : await getRooms();
      setRooms(data);
    } catch (e) {
      console.error("방 목록 조회 실패:", e);
      alert("방 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 새 방 생성
  const handleCreate = async () => {
    if (!roomName.trim()) return;
    try {
      await createRoom(roomName);
      setRoomName("");
      await loadRooms();
    } catch (e) {
      console.error("방 생성 실패:", e);
      alert("방 생성 중 오류가 발생했습니다.");
    }
  };

  // ✅ 방 참가
  const handleJoin = async (roomId) => {
    try {
      await joinRoom(roomId);
      // 방 참여 후 해당 방 상태만 업데이트 (전체 reload 방지)
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.roomId === roomId ? { ...room, joined: true } : room
        )
      );
    } catch (e) {
      console.error("방 참가 실패:", e);
      alert("방 참가 중 오류가 발생했습니다.");
    }
  };

  // ✅ 새로고침 버튼 클릭 시 목록 재로드
  const handleRefresh = async () => {
    await loadRooms();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>💬 채팅방 목록</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => setShowAll(true)}
          style={{
            flex: 1,
            backgroundColor: showAll ? "#2563eb" : "#ccc",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          전체 방
        </button>
        <button
          onClick={() => setShowAll(false)}
          style={{
            flex: 1,
            backgroundColor: !showAll ? "#2563eb" : "#ccc",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          내 참여방
        </button>
        <button
          onClick={handleRefresh}
          style={{
            backgroundColor: "#059669",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          🔄 새로고침
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="새 방 이름"
          style={{
            padding: "6px 10px",
            border: "1px solid #ccc",
            borderRadius: 4,
            marginRight: 8,
            width: "70%",
          }}
        />
        <button
          onClick={handleCreate}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          방 만들기
        </button>
      </div>

      {loading ? (
        <p>⏳ 방 목록을 불러오는 중...</p>
      ) : rooms.length === 0 ? (
        <p>등록된 채팅방이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {rooms.map((room) => (
            <li
              key={room.roomId}
              style={{
                border: "1px solid #ddd",
                borderRadius: 6,
                padding: "12px 16px",
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f9fafb",
              }}
            >
              <div>{room.roomName}</div>

              {/* ✅ joined 여부에 따라 버튼 변경 */}
              {room.joined ? (
                <Link
                  to={`/chat/${room.roomId}`}
                  style={{
                    backgroundColor: "#16a34a",
                    color: "white",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: 4,
                  }}
                >
                  입장하기
                </Link>
              ) : (
                <button
                  onClick={() => handleJoin(room.roomId)}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  참여하기
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
