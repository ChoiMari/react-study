import React, { useEffect, useState } from "react";
import { getBoardById } from "../api/boardApi";
import { useNavigate, useParams } from "react-router-dom";

const BoardDetail = () => {
  const [board, setBoard] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBoardById(id).then((res) => setBoard(res.data.data));
  }, [id]);

  if (!board) return <p>로딩 중...</p>;

  return (
    <div style={{ width: "60%", margin: "30px auto" }}>
      <h2>{board.title}</h2>
      <p>작성자: {board.writer}</p>
      <hr />
      <p>{board.content}</p>
      <button onClick={() => navigate("/")}>목록</button>
      <button onClick={() => navigate(`/edit/${id}`)}>수정</button>
    </div>
  );
};

export default BoardDetail;
