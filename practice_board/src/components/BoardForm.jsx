import React, { useState, useEffect } from "react";
import { createBoard, updateBoard, getBoardById } from "../api/boardApi";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/BoardForm.css";

const BoardForm = () => {
  const [board, setBoard] = useState({ title: "", writer: "", content: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBoardById(id).then((res) => setBoard(res.data.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!board.title.trim() || !board.writer.trim() || !board.content.trim()) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    try {
      if (id) {
        await updateBoard(id, board);
        alert("수정 완료!");
      } else {
        await createBoard(board);
        alert("등록 완료!");
      }
      navigate("/");
    } catch (err) {
      console.error("저장 실패:", err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="board-form-container">
      <h2>{id ? "게시글 수정" : "게시글 작성"}</h2>
      
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="제목을 입력하세요"
          value={board.title}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="writer">작성자</label>
        <input
          id="writer"
          type="text"
          name="writer"
          placeholder="작성자를 입력하세요"
          value={board.writer}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          placeholder="내용을 입력하세요"
          value={board.content}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>

      <div className="form-buttons">
        <button className="submit-button" onClick={handleSubmit}>
          {id ? "✅ 수정하기" : "✅ 등록하기"}
        </button>
        <button className="cancel-button" onClick={() => navigate("/")}>
          ❌ 취소
        </button>
      </div>
    </div>
  );
};

export default BoardForm;