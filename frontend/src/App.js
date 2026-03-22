import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io();

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  

  useEffect(() => {

  const handleReceive = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  socket.on("chat_history", (history) => {
    setMessages(history);
  });

  socket.on("receive_message", handleReceive);

  return () => {
    socket.off("receive_message", handleReceive);
    socket.off("chat_history");
  };

}, []);

  const sendMessage = () => {
    socket.emit("send_message", {
      room: room,
      message: message,
      sender: username
    });
    setMessage("");
  };

  return (
    <div>
      <h2>Real Time Chat</h2>

      <input 
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter room ID"
      />
      <button onClick={() => socket.emit("join_room", room)}>Join Room</button>

      <input 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}> [{msg.timestamp.toString()}] {msg.sender}: {msg.message}</p>
        ))}
      </div>
    </div>
  );
}

export default App;