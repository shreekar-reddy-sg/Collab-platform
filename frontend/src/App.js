import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  

  useEffect(() => {
  const handleReceive = (data) => {
    setMessages((prev) => [...prev, data.message]);
  };

  socket.on("receive_message", handleReceive);

  return () => {
    socket.off("receive_message", handleReceive);
  };
}, []);

  const sendMessage = () => {
    socket.emit("send_message", {
      room: room,
      message: message,
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;