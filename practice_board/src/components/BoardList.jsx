import React, { useEffect, useState } from "react";
import { getBoardList, deleteBoard } from "../api/boardApi";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
  const [boards, setBoards] = useState([]); // 게시글 목록
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalCount, setTotalCount] = useState(0); // 총 게시글 수
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 페이지 변경 시마다 호출
  useEffect(() => {
    loadBoards();
  }, [page]);

  // ✅ 게시글 목록 불러오기
  const loadBoards = async () => {
    try {
      setLoading(true);
      const res = await getBoardList(page, 10);
      console.log("📥 서버 응답:", res.data);

      if (res.data.success && Array.isArray(res.data.data)) {
        setBoards(res.data.data);
        setTotalCount(res.data.data.length); // 백엔드에서 totalCount 안줄 때 임시 처리
      } else {
        setBoards([]);
      }
    } catch (err) {
      console.error("목록 로드 실패:", err);
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 게시글 삭제
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

  // ✅ 게시글 상세 보기
  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  if (loading) return <p>⏳ 게시글을 불러오는 중...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div style={{ width: "70%", margin: "30px auto" }}>
      <h2>게시판 목록</h2>

      {/* 글쓰기 버튼 */}
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={() => navigate("/create")}>글쓰기</button>
      </div>

      {/* 게시판 테이블 */}
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
           
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {boards.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                등록된 게시글이 없습니다.
              </td>
            </tr>
          ) : (
            boards.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => handleDetail(b.id)}
                >
                  {b.title}
                </td>
                <td>{b.writer}</td>
               
                <td>
                  <button onClick={() => navigate(`/edit/${b.id}`)}>수정</button>
                  <button
                    style={{ marginLeft: "5px" }}
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

      {/* 페이지네이션 */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        {Array.from({ length: Math.ceil(totalCount / 10) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              margin: "0 3px",
              backgroundColor: page === i + 1 ? "#007BFF" : "#f0f0f0",
              color: page === i + 1 ? "#fff" : "#000",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
