import React, { useEffect, useState } from "react";
import { getBoardList, deleteBoard } from "../api/boardApi";
import { useNavigate } from "react-router-dom";
import "../styles/BoardList.css";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadBoards();
  }, [page]);

  const loadBoards = async () => {
    try {
      setLoading(true);
      const res = await getBoardList(page, 10);
      console.log("📥 서버 응답:", res.data);

      if (res.data.success && res.data.data){
        const { boards, totalCount } = res.data.data; // 구조분해로 꺼내기
        setBoards(boards || []);
        setTotalCount(totalCount || 0);
      } else {
          setBoards([]);
          setTotalCount(0);
      }
    } catch (err) {
      console.error("목록 로드 실패:", err);
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteBoard(id);
      alert("삭제 완료!");
      loadBoards();
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  if (loading) return <div className="loading-message">⏳ 게시글을 불러오는 중...</div>;
  if (error) return <div className="error-message">❌ {error}</div>;

  return (
    <div className="board-list-container">
      <div className="board-header">
        <h2>게시판 목록</h2>
        <button className="write-button" onClick={() => navigate("/create")}>
          ✏️ 글쓰기
        </button>
      </div>

      <table className="board-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>ID</th>
            <th style={{ width: "50%" }}>제목</th>
            <th style={{ width: "20%" }}>작성자</th>
            <th style={{ width: "20%" }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {boards.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-message">
                등록된 게시글이 없습니다.
              </td>
            </tr>
          ) : (
            boards.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td className="title-cell" onClick={() => handleDetail(b.id)}>
                  {b.title}
                </td>
                <td>{b.writer}</td>
                <td className="action-buttons">
                  <button 
                    className="edit-button"
                    onClick={() => navigate(`/edit/${b.id}`)}
                  >
                    수정
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(b.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(totalCount / 10) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoardList;