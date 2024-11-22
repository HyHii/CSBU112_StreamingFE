import React, { useState, useRef, useEffect } from "react";

// Room ID
const roomId = "12";
const SOCKET_SERVER_URL = `ws://marmoset-unbiased-logically.ngrok-free.app/chat?roomId=12`;

const ChatBox = ({ user = "Guest" }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(""); // State để lưu thông báo lỗi
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Khởi tạo WebSocket khi component mount
  useEffect(() => {
    socketRef.current = new WebSocket(SOCKET_SERVER_URL);

    socketRef.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("Message:", event.data);
    };

    socketRef.current.onopen = () => {
      const message = {
         user: user,
         roomId: roomId,
         message: "dang coi"
      };
      socketRef.current.send(JSON.stringify(message));
   };
    socketRef.current.onerror = () => {
      console.error("Lỗi WebSocket:", socketRef.current.readyState);
      setError("Có lỗi xảy ra trong kết nối WebSocket. Vui lòng thử lại sau.");
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket đã đóng:", event);
      setError("Kết nối WebSocket đã bị đóng.");
   };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSend = () => {
    if (input.trim() && socketRef.current.readyState === WebSocket.OPEN) {
      const timeSent = new Date().toLocaleTimeString();
      const newMessage = { message:messages, user: user, roomId:roomId};

      socketRef.current.send(JSON.stringify(newMessage));
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
    } else if (socketRef.current.readyState !== WebSocket.OPEN) {
      setError("Không thể gửi tin nhắn, kết nối chưa sẵn sàng.");
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
    <div className="bg-gray-850 rounded-2xl flex flex-col w-[400px] h-[600px] shadow-lg overflow-hidden">
      {/* Tiêu đề */}
      <h2 className="text-lg font-semibold mb-4 text-center text-white py-2 border-b border-gray-700">
        Live Chat
      </h2>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && (
        <div className="bg-red-500 text-white text-sm py-2 px-4 mb-2">
          {error}
        </div>
      )}

      {/* Khung hiển thị tin nhắn */}
      <div className="flex-grow overflow-y-auto bg-gray-850 p-2 rounded-lg mb-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="text-white mb-2" style={{ wordBreak: "break-word" }}>
              <strong>{msg.sender}:</strong> {msg.text}
              <span className="text-gray-400 text-sm ml-2">({msg.time})</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet. Start chatting!</p>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Khung nhập liệu */}
      <div className="bg-gray-850 p-3 border-t border-gray-700 flex items-center gap-2">
        <textarea
          className="flex-grow p-2 rounded-l-lg bg-gray-700 text-white resize-none h-12"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition flex items-center justify-center"
          onClick={handleSend}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
            style={{ transform: "rotate(180deg)" }}
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
