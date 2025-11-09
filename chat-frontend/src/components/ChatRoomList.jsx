import { useEffect, useState } from "react";
import { getAllRooms, getRooms, createRoom, joinRoom } from "../api/chatApi";
import { Link } from "react-router-dom";

export default function ChatRoomList() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    loadRooms();
  }, [showAll]);

  const loadRooms = async () => {
    const data = showAll ? await getAllRooms() : await getRooms();
    setRooms(data);
  };

  const handleCreate = async () => {
    if (!roomName.trim()) return;
    await createRoom(roomName);
    setRoomName("");
    loadRooms();
  };

  const handleJoin = async (roomId) => {
    try {
      await joinRoom(roomId);
      loadRooms();
    } catch (e) {
      console.error("방 참가 실패", e);
    }
  };

  return (
    <div>
      <h2>채팅방 목록</h2>
      <div>
        <button onClick={() => setShowAll(true)}>전체 방</button>
        <button onClick={() => setShowAll(false)}>내 방</button>
      </div>

      <input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="새 방 이름"
      />
      <button onClick={handleCreate}>방 만들기</button>

      <ul>
        {rooms.map((room) => (
          <li key={room.roomId}>
            <div>{room.roomName}</div>
            {room.joined ? (
              <Link to={`/chat/${room.roomId}`}>입장하기</Link>
            ) : (
              <button onClick={() => handleJoin(room.roomId)}>참여하기</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
