// src/lib/ws.js
// 목적: STOMP WebSocket 클라이언트 생성 유틸
// - SockJS 기반 WebSocket 연결
// - 자동 재연결 및 하트비트 설정
// - STOMP 및 네트워크 오류 모두 핸들링
// - 채팅/알림 공통 사용

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// ✅ 환경 변수 기본값 (미설정 시 fallback)
const WS_URL =
  import.meta.env.VITE_WS_BASE_URL || "http://localhost:8090/ws-stomp";

/**
 * createStompClient
 * 목적: STOMP 클라이언트를 생성해 자동 재연결, 하트비트, 에러 처리 지원
 *
 * @param {Function} onConnect - 연결 성공 시 실행할 콜백
 * @param {Function} onError - 연결 또는 STOMP 프로토콜 오류 발생 시 실행할 콜백
 * @returns {Client} 구성 완료된 STOMP 클라이언트 인스턴스
 */
export function createStompClient(onConnect, onError) {
  // ✅ SockJS 팩토리 함수 (자동 재연결 지원)
  const socketFactory = () => new SockJS(WS_URL);

  // ✅ STOMP 클라이언트 생성
  const client = new Client({
    webSocketFactory: socketFactory, // SockJS 인스턴스 반환
    reconnectDelay: 3000, // 연결 끊김 시 3초마다 재시도
    heartbeatIncoming: 10000, // 서버 → 클라이언트 하트비트
    heartbeatOutgoing: 10000, // 클라이언트 → 서버 하트비트
    debug: () => {}, // 콘솔 로그 비활성화

    // 연결 성공 시
    onConnect,

    // STOMP 프로토콜 레벨 오류
    onStompError: (frame) => {
      console.error("❌ STOMP 프로토콜 오류:", frame);
      onError?.(frame);
    },

    // 네트워크/WebSocket 단절 등 물리적 오류 처리
    onWebSocketError: (event) => {
      console.error("⚠️ 웹소켓 연결 오류:", event);
      onError?.(event);
    },
  });

  return client;
}
