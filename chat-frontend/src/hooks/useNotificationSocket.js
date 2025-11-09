/**
 * 목적:
 *  - 사용자 ID별 실시간 알림 수신
 *  - /topic/notify/{userId} 구독
 *  - createStompClient 유틸 재활용 (자동 재연결, 하트비트, 에러 핸들링 포함)
 *
 * 실무 포인트:
 *  - 로그인 전에는 userId가 없으므로, 즉시 리턴하여 불필요한 연결 방지
 *  - 클라이언트 연결/해제 관리 (메모리 누수 방지)
 *  - JSON 파싱 실패 대비 try/catch
 */

import { useEffect, useRef } from "react";
import { createStompClient } from "../lib/ws";

export default function useNotificationSocket(userId, onNotify) {
  // STOMP 클라이언트 인스턴스 저장
  const clientRef = useRef(null);

  // 구독 객체 저장 (unsubscribe 시 사용)
  const subRef = useRef(null);

  useEffect(() => {
    // 로그인하지 않은 상태에서는 WebSocket 연결하지 않음
    if (!userId) return;

    // 1️⃣ STOMP 클라이언트 생성
    const client = createStompClient(
      () => {
        console.log("🔔 알림 WebSocket 연결됨");

        // 2️⃣ 특정 사용자 토픽 구독
        subRef.current = client.subscribe(
          `/topic/notify/${userId}`,
          (frame) => {
            try {
              const notify = JSON.parse(frame.body);
              onNotify?.(notify); // 부모 컴포넌트로 콜백 전달
            } catch (err) {
              console.error("알림 파싱 오류:", err);
            }
          }
        );
      },
      (error) => {
        console.warn("STOMP 연결 오류 발생:", error);
      }
    );

    // 3️⃣ 연결 활성화
    client.activate();
    clientRef.current = client;

    // 4️⃣ 언마운트 또는 userId 변경 시 정리
    return () => {
      try {
        subRef.current?.unsubscribe();
      } catch (err) {
        console.error("구독 해제 실패:", err);
      }
      try {
        clientRef.current?.deactivate();
        console.log("🔕 알림 소켓 해제");
      } catch (err) {
        console.error("STOMP 클라이언트 종료 실패:", err);
      }
    };
  }, [userId, onNotify]);
}
