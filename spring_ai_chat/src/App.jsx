import React, { useState, useRef, useEffect } from 'react';
import './ChatApp.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userIdError, setUserIdError] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!userId.trim()) {
      setUserIdError(true);
      return;
    }
    
    setUserIdError(false);

    const userMessage = {
      sender: 'user',
      text: inputMessage
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.2.229:8090/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          message: inputMessage
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Backend response:', data);
      
      if (data.messages && data.messages.length > 0) {
        // 마지막 AI 메시지만 가져오기 (가장 최근 응답)
        const aiMessages = data.messages.filter(msg => msg.sender !== 'user');
        console.log('Filtered AI messages:', aiMessages);
        
        if (aiMessages.length > 0) {
          const lastAiMessage = aiMessages[aiMessages.length - 1]; // 마지막 메시지만
          console.log('Last AI message:', lastAiMessage);
          setMessages(prev => [...prev, lastAiMessage]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        sender: 'AI',
        text: '죄송합니다. 메시지를 전송하는 중 오류가 발생했습니다.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>고객 지원 챗봇</h2>
        <div className="user-info">
          <label>User ID: </label>
          <input 
            type="text" 
            value={userId} 
            onChange={(e) => {
              setUserId(e.target.value);
              setUserIdError(false);
            }}
            className={`user-id-input ${userIdError ? 'error' : ''}`}
            placeholder="사용자 ID를 입력하세요"
          />
          {userIdError && <span className="error-message">User ID를 입력해주세요</span>}
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-sender">
              {msg.sender === 'user' ? `👤 ${userId}` : '🤖 AI'}
            </div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai-message">
            <div className="message-sender">🤖 AI</div>
            <div className="message-text loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-form">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
          className="chat-input"
          rows="1"
        />
        <button 
          onClick={handleSendMessage}
          className="send-button"
          disabled={isLoading || !inputMessage.trim() || !userId.trim()}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default App;