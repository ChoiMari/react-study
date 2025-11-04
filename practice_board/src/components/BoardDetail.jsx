import React, { useEffect, useState } from "react";
import { getBoardById } from "../api/boardApi";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/BoardDetail.css";

const BoardDetail = () => {
  const [board, setBoard] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBoardById(id).then((res) => setBoard(res.data.data));
  }, [id]);

  if (!board) return <div className="loading-detail">⏳ 로딩 중...</div>;

  return (
    <div className="board-detail-container">
      <h1 className="board-detail-title">{board.title}</h1>
      <div className="board-detail-meta">
        작성자: {board.writer}
      </div>
      <div className="board-detail-content">{board.content}</div>
      <div className="board-detail-buttons">
        <button className="list-button" onClick={() => navigate("/")}>
          📋 목록
        </button>
        <button 
          className="edit-detail-button" 
          onClick={() => navigate(`/edit/${id}`)}
        >
          ✏️ 수정
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;