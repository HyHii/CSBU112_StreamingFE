import React, { useState, useRef, useEffect } from "react";
import "./../styles/ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // Tạo tham chiếu đến phần cuối của danh sách tin nhắn

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  // Cuộn xuống cuối khi danh sách tin nhắn thay đổi
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full flex flex-col w-[400px] h-[600px]">
      <h2 className="text-lg font-semibold mb-4">Live Chat</h2>
      <div className="flex-grow overflow-y-auto bg-gray-700 p-2 rounded-lg mb-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chatbox-message ${
                msg.sender === "You" ? "user" : "other"
              } mb-2 p-2 rounded-lg`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet. Start chatting!</p>
        )}
        {/* Phần tử dùng để cuộn xuống cuối */}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 rounded-l-lg bg-gray-700 text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-600 p-2 rounded-r-lg text-white"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
