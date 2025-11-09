// src/components/MessageBubble.jsx
/**
 * 목적:
 *  - 채팅방에서 한 줄의 메시지를 표시하는 컴포넌트
 *  - 보낸 사람/받은 사람에 따라 스타일 다르게 표현
 *
 * props:
 *  - message: { senderName, content, createdAt, isMine }
 */
export default function MessageBubble({ message }) {
  const { senderName, content, createdAt, isMine } = message;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        margin: "8px 0",
      }}
    >
      <div
        style={{
          backgroundColor: isMine ? "#2563eb" : "#e5e7eb",
          color: isMine ? "white" : "black",
          padding: "10px 14px",
          borderRadius: "12px",
          maxWidth: "65%",
          wordBreak: "break-word",
        }}
      >
        {/* 상대방 메시지만 이름 표시 */}
        {!isMine && (
          <div
            style={{
              fontWeight: "bold",
              fontSize: "0.85em",
              marginBottom: 4,
            }}
          >
            {senderName}
          </div>
        )}
        <div>{content}</div>
        <div
          style={{
            textAlign: "right",
            fontSize: "0.7em",
            opacity: 0.7,
            marginTop: 4,
          }}
        >
          {new Date(createdAt).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
