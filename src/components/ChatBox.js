import React, { useState, useRef, useEffect } from "react";

// Room ID
const roomId = "12"; // Thay bằng roomId phù hợp
const SOCKET_SERVER_URL = `ws://marmoset-unbiased-logically.ngrok-free.app/chat?roomId=12`; // URL với roomId

const ChatBox = () => {
  const [messages, setMessages] = useState([]); // Danh sách tin nhắn
  const [input, setInput] = useState(""); // Nội dung nhập
  const messagesEndRef = useRef(null); // Tham chiếu đến cuối danh sách tin nhắn
  const socketRef = useRef(null); // Tham chiếu đến kết nối WebSocket

  // Khởi tạo WebSocket khi component mount
  useEffect(() => {
    // Tạo kết nối WebSocket với roomId
    socketRef.current = new WebSocket(SOCKET_SERVER_URL);

    // Xử lý sự kiện khi nhận tin nhắn từ server
    socketRef.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data); // Chuyển dữ liệu từ server về dạng JSON
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Xử lý khi kết nối thành công
    socketRef.current.onopen = () => {
      socketRef.current.send(`Hello, Room ${roomId}`); // Gửi tin nhắn tham gia phòng
    };

    // Xử lý lỗi kết nối WebSocket
    socketRef.current.onerror = () => {
      alert("WebSocket connection error. Please try again later.");
    };

    // Xử lý khi kết nối bị đóng
    socketRef.current.onclose = () => {
      alert("WebSocket connection closed.");
    };

    // Cleanup khi component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // Hàm gửi tin nhắn qua WebSocket
  const handleSend = () => {
    if (input.trim()) {
      const timeSent = new Date().toLocaleTimeString(); // Lấy thời gian hiện tại
      const newMessage = { text: input, sender: "You", time: timeSent };

      // Gửi tin nhắn qua WebSocket
      socketRef.current.send(JSON.stringify(newMessage));

      // Cập nhật tin nhắn trong giao diện
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput(""); // Xóa nội dung nhập
    }
  };

  // Cuộn xuống cuối khi danh sách tin nhắn thay đổi
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Hàm xử lý khi nhấn phím Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      event.preventDefault(); // Ngừng textarea xuống dòng
      handleSend(); // Gửi tin nhắn
    }
  };

  return (
    <div className="bg-gray-850 rounded-2xl flex flex-col w-[400px] h-[600px] shadow-lg overflow-hidden">
      {/* Tiêu đề */}
      <h2 className="text-lg font-semibold mb-4 text-center text-white py-2 border-b border-gray-700">
        Live Chat
      </h2>

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
