// src/components/MessageInput.jsx
/**
 * 목적:
 *  - 메시지 입력창과 전송 버튼을 표시
 *  - 부모 컴포넌트(ChatRoom 등)에서 전달받은 sendMessage() 호출
 *
 * props:
 *  - onSend(messageText)
 */
import { useState } from "react";

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginTop: 10,
        alignItems: "center",
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
        disabled={disabled}
        style={{
          flex: 1,
          resize: "none",
          height: 50,
          padding: "8px 10px",
          borderRadius: 6,
          border: "1px solid #ccc",
          fontFamily: "inherit",
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? "#9ca3af" : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
          padding: "10px 14px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        보내기
      </button>
    </div>
  );
}
