/**
 * 목적:
 *  - 채팅방 내 메시지 표시 + 전송 + 실시간 수신 처리
 *  - 서버는 isMine을 세팅하지 않음 → 프론트에서 판단
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "../hooks/useWebSocket";
import { getMessages } from "../api/chatApi";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useAuth } from "../context/useAuth";

export default function ChatRoom() {
  const { roomId } = useParams();
  const { loginUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null); // 자동 스크롤용 ref

  /**
   * 1️⃣ 과거 메시지 불러오기
   * - 서버는 isMine을 내려주지 않음 → senderId와 로그인 ID 비교해서 직접 계산
   * - 최신 메시지가 아래쪽에 오도록 reverse()
   */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMessages(roomId);
        const processed = data
          .map((m) => ({
            ...m,
            isMine: Number(m.senderId) === Number(loginUser?.id),
          }))
          .reverse(); // 최신이 아래쪽
        setMessages(processed);
      } catch (err) {
        console.error("메시지 불러오기 실패:", err);
      }
    };
    if (loginUser) load();
  }, [roomId, loginUser]);

  /**
   * 2️⃣ 실시간 수신 메시지 처리
   * - 서버가 broadcast하는 모든 메시지를 받음
   * - 내가 보낸 건 이미 UI에 있으므로 무시
   */
  const handleIncoming = useCallback(
    (msg) => {
      // 안전 체크 (null, undefined 방지)
      if (!msg || !loginUser || !msg.senderId) return;

      // 내가 보낸 메시지는 이미 UI에 있으므로 무시
      if (Number(msg.senderId) === Number(loginUser.id)) return;

      setMessages((prev) => {
        // messageId 중복 방지
        if (prev.some((m) => m.messageId === msg.messageId)) return prev;
        return [...prev, { ...msg, isMine: false }];
      });
    },
    [loginUser?.id]
  );

  /**
   * 3️⃣ WebSocket 연결 (채팅방별 구독)
   */
  const { connected, sendMessage } = useWebSocket(roomId, handleIncoming);

  /**
   * 4️⃣ 메시지 전송 처리
   * - 즉시 UI 반영 (optimistic update)
   * - 서버에 STOMP 메시지 전송
   */
  const handleSend = (text) => {
    if (!text.trim()) return;

    // 프론트에서 즉시 표시할 임시 메시지
    const tempMessage = {
      messageId: Date.now(), // 임시 식별자
      senderId: loginUser.id,
      senderName: loginUser.name,
      content: text,
      createdAt: new Date().toISOString(),
      isMine: true,
    };
    setMessages((prev) => [...prev, tempMessage]);

    // 서버로 전송 (STOMP)
    sendMessage({
      roomId: Number(roomId),
      senderId: loginUser.id,
      content: text,
    });
  };

  /**
   * 5️⃣ 메시지 추가될 때마다 자동 스크롤
   */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  /**
   * 6️⃣ 렌더링
   */
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 700,
        margin: "0 auto",
        height: "80vh",
      }}
    >
      <h2>채팅방 #{roomId}</h2>

      {/* 메시지 표시 영역 */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          border: "1px solid #ddd",
          padding: "10px",
          overflowY: "auto",
          borderRadius: 8,
          backgroundColor: "#f9fafb",
        }}
      >
        {messages.map((m) => (
          <MessageBubble key={m.messageId} message={m} />
        ))}
      </div>

      {/* 입력창 */}
      <MessageInput onSend={handleSend} disabled={!connected} />
    </div>
  );
}
