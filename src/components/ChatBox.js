import React, { useState, useRef, useEffect } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-850 rounded-2xl flex flex-col w-[400px] h-[600px] shadow-lg overflow-hidden">
      {/* Tiêu đề */}
      <h2 className="text-lg font-semibold mb-4 text-center text-white py-2 border-b border-gray-700">
        Live Chat
      </h2>
      
      {/* Khung hiển thị tin nhắn */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-850">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="text-white mb-2"
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet. Start chatting!</p>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Khung nhập liệu */}
      <div className="bg-gray-850 p-3 border-t border-gray-700 flex items-center gap-2">
        <input
          type="text"
          className="flex-grow p-3 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;