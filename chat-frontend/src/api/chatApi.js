// 목적: 채팅 REST
// - 방 생성: POST /api/chat/rooms {roomName}
// - 전체 방 목록: GET /api/chat/rooms/list/all
// - 내가 참가한 방 목록: GET /api/chat/rooms
// - 방 참가: POST /api/chat/rooms/{roomId}/join
// - 방 초대: POST /api/chat/rooms/{roomId}/invite {userId}
// - 방 나가기: POST /api/chat/rooms/{roomId}/leave
// - 메시지 조회: GET /api/chat/messages/{roomId}

import http from "./httpClient";

/**
 * 방 생성
 */
export const createRoom = async (roomName) => {
  const res = await http.post("/api/chat/rooms", { roomName });
  return res.data;
};

/**
 * 전체 방 목록 조회 (모든 유저)
 */
export const getAllRooms = async () => {
  const res = await http.get("/api/chat/rooms/list/all");
  return res.data;
};

/**
 * 내가 참가한 방 목록 조회 (로그인한 사용자 기준)
 * 실제로 백엔드에서는 @GetMapping("/api/chat/rooms") 이 메서드로 처리
 */
export const getRooms = async () => {
  const res = await http.get("/api/chat/rooms");
  return res.data;
};

/**
 * 방 참가
 */
export const joinRoom = async (roomId) => {
  const res = await http.post(`/api/chat/rooms/${roomId}/join`);
  return res.data;
};

/**
 * 방 초대
 */
export const inviteUser = async (roomId, userId) => {
  const res = await http.post(`/api/chat/rooms/${roomId}/invite`, { userId });
  return res.data;
};

/**
 * 방 나가기
 */
export const leaveRoom = async (roomId) => {
  const res = await http.post(`/api/chat/rooms/${roomId}/leave`);
  return res.data;
};

/**
 * 메시지 조회
 */
export const getMessages = async (roomId) => {
  const res = await http.get(`/api/chat/messages/${roomId}`);
  return res.data;
};
