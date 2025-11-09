/**
 * 목적:
 *  - 사용자별 알림(WebSocket) 수신 처리
 *  - /topic/notify/{userId}, /read, /read-all 구독
 *  - createStompClient 유틸 사용 (자동 재연결 및 하트비트 관리)
 *
 * 기능 요약:
 *  ① 새 알림 발생 시 → onNotify({ type: "NEW", data })
 *  ② 개별 알림 읽음 시 → onNotify({ type: "READ", id })
 *  ③ 전체 알림 읽음 시 → onNotify({ type: "READ_ALL" })
 */

import { useEffect, useRef } from "react";
import { createStompClient } from "../lib/ws";

export default function useNotificationSocket(userId, onNotify) {
  const clientRef = useRef(null);
  const subsRef = useRef([]); // 구독 목록 저장

  useEffect(() => {
    if (!userId) return;

    // 1️⃣ STOMP 클라이언트 생성
    const client = createStompClient(
      () => {
        console.log("🔔 알림 WebSocket 연결됨");

        // 2️⃣ 새 알림 도착
        const subMain = client.subscribe(`/topic/notify/${userId}`, (frame) => {
          try {
            const data = JSON.parse(frame.body);
            onNotify?.({ type: "NEW", data });
          } catch (err) {
            console.error("알림 파싱 오류:", err);
          }
        });

        // 3️⃣ 개별 알림 읽음
        const subRead = client.subscribe(
          `/topic/notify/${userId}/read`,
          (frame) => {
            try {
              const readId = JSON.parse(frame.body);
              onNotify?.({ type: "READ", id: readId });
            } catch (err) {
              console.error("READ 알림 파싱 오류:", err);
            }
          }
        );

        // 4️⃣ 전체 알림 읽음
        const subAll = client.subscribe(
          `/topic/notify/${userId}/read/all`,
          () => {
            onNotify?.({ type: "READ_ALL" });
          }
        );

        // 구독 목록 등록
        subsRef.current = [subMain, subRead, subAll];
      },
      (error) => {
        console.warn("⚠️ STOMP 연결 오류:", error);
      }
    );

    // 5️⃣ 연결 활성화
    client.activate();
    clientRef.current = client;

    // 6️⃣ 언마운트 시 정리
    return () => {
      try {
        subsRef.current.forEach((s) => s.unsubscribe());
        console.log("🔕 알림 구독 해제 완료");
      } catch (err) {
        console.error("구독 해제 실패:", err);
      }
      try {
        clientRef.current?.deactivate();
        console.log("🔌 알림 소켓 연결 종료");
      } catch (err) {
        console.error("STOMP 종료 실패:", err);
      }
    };
  }, [userId, onNotify]);
}
