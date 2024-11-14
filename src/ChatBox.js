import React, { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Live Chat</h2>
      <div className="flex-grow overflow-y-auto bg-gray-700 p-2 rounded-lg mb-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-600"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet. Start chatting!</p>
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 rounded-l-lg bg-gray-700 text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
