import axios from "axios";
const api = axios.create({
  baseURL: "http://192.168.2.229:8090/api", 
});

// 게시글 목록 조회
export const getBoardList = (page = 1, size = 10) =>
  api.get(`/board?page=${page}&size=${size}`);

// 단건 조회
export const getBoardById = (id) => api.get(`/board/${id}`);

// 등록
export const createBoard = (board) => api.post(`/board`, board);

// 수정
export const updateBoard = (id, board) => api.put(`/board/${id}`, board);

// 삭제
export const deleteBoard = (id) => api.delete(`/board/${id}`);
