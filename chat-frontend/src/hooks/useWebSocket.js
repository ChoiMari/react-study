import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

/**
 * 목적:
 *  - 채팅방별 STOMP WebSocket 연결 관리
 *  - 연결 / 해제 / 메시지 전송 / 수신 처리
 */
export default function useWebSocket(roomId, onMessageReceived) {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    // SockJS 기반 STOMP 클라이언트 생성
    const socket = new SockJS(`${import.meta.env.VITE_WS_BASE_URL}`);
    const client = over(socket);

    client.connect({}, () => {
      setConnected(true); // ✅ 연결 성공 → 상태 갱신
      console.log("💬 WebSocket 연결 성공");

      // 메시지 수신 구독
      client.subscribe(`/topic/chat/${roomId}`, (frame) => {
        const msg = JSON.parse(frame.body);
        onMessageReceived?.(msg);
      });
    });

    clientRef.current = client;

    // 언마운트 시 해제
    return () => {
      if (client.connected)
        client.disconnect(() => {
          console.log("🧹 WebSocket 연결 종료");
          setConnected(false);
        });
    };
  }, [roomId, onMessageReceived]);

  // 메시지 전송 함수
  const sendMessage = (msg) => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.warn("소켓이 아직 연결되지 않았습니다.");
      return;
    }
    clientRef.current.send("/app/chat.send", {}, JSON.stringify(msg));
  };

  return { connected, sendMessage };
}
