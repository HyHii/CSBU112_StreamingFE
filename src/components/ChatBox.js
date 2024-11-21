import React, { useState, useRef, useEffect } from "react";

const roomId = "12"; // Thay bằng roomId phù hợp
const SOCKET_SERVER_URL = `ws://marmoset-unbiased-logically.ngrok-free.app/chat?roomId=${roomId}`;

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(""); // State để hiển thị lỗi
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(SOCKET_SERVER_URL);

    socketRef.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socketRef.current.onopen = () => {
      socketRef.current.send(`Hello, Room ${roomId}`);
      setError(""); // Xóa lỗi nếu kết nối thành công
    };

    socketRef.current.onerror = () => {
      setError("WebSocket connection error. Please try again later.");
    };

    socketRef.current.onclose = () => {
      setError("WebSocket connection closed.");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const timeSent = new Date().toLocaleTimeString();
      const newMessage = { text: input, sender: "You", time: timeSent };

      socketRef.current.send(JSON.stringify(newMessage));
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-box">
      <h2 className="chat-title">Live Chat</h2>

      {/* Hiển thị lỗi */}
      {error && <p className="error-message">{error}</p>}

      <div className="messages-container">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.sender}:</strong> {msg.text}
              <span className="time-stamp">({msg.time})</span>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages yet. Start chatting!</p>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="input-container">
        <textarea
          className="message-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send-button" onClick={handleSend}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="send-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2 12l19-10-5 10 5 10-19-10z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
