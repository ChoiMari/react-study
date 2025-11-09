// src/api/notifyApi.js
// 목적: 알림 관련 REST API 호출 모듈
// - 목록 조회(GET) / 개별 읽음(PATCH) / 전체 읽음(PATCH)
// - 모든 함수는 axios 인스턴스(httpClient) 기반으로 호출함
// - 반환 데이터는 항상 "배열" 형태를 보장함 (프론트 map/filter 안정성 확보)

import http from "./httpClient";

/**
 * 📩 알림 목록 조회
 * 백엔드 응답 예시:
 * {
 *   "userId": 1,
 *   "notifications": [
 *     { "id": 10, "message": "새 메시지 도착", "isRead": false },
 *     { "id": 11, "message": "시스템 점검 예정", "isRead": true }
 *   ]
 * }
 */
export const getNotifications = async () => {
  const res = await http.get("/api/notify", { withCredentials: true });

  // 응답이 객체일 경우 내부 notifications 배열 꺼내기
  const data = res.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.notifications)) return data.notifications;

  // 배열이 아닐 경우 빈 배열로 반환
  return [];
};

/**
 * 📬 특정 알림 읽음 처리
 * PATCH /api/notify/{id}/read
 * @param {number} id - 알림 ID
 */
export const readNotification = async (id) => {
  await http.patch(`/api/notify/${id}/read`, null, { withCredentials: true });
};

/**
 * 📭 전체 알림 읽음 처리
 * PATCH /api/notify/read-all
 */
export const readAllNotifications = async () => {
  await http.patch("/api/notify/read-all", null, { withCredentials: true });
};
