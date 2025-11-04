import React, { useState, useEffect } from "react";
import { createBoard, updateBoard, getBoardById } from "../api/boardApi";
import { useNavigate, useParams } from "react-router-dom";

const BoardForm = () => {
  const [board, setBoard] = useState({ title: "", writer: "", content: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // 수정모드라면 기존 데이터 불러오기
      getBoardById(id).then((res) => setBoard(res.data.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (id) {
      await updateBoard(id, board);
      alert("수정 완료!");
    } else {
      await createBoard(board);
      alert("등록 완료!");
    }
    navigate("/");
  };

  return (
    <div style={{ width: "60%", margin: "30px auto" }}>
      <h2>{id ? "게시글 수정" : "게시글 작성"}</h2>
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={board.title}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      />
      <input
        type="text"
        name="writer"
        placeholder="작성자"
        value={board.writer}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      />
      <textarea
        name="content"
        placeholder="내용"
        value={board.content}
        onChange={handleChange}
        style={{ width: "100%", height: "200px", padding: "8px" }}
      />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        {id ? "수정" : "등록"}
      </button>
    </div>
  );
};

export default BoardForm;
