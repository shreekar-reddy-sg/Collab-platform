import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID: ", socket.id);
    });
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", message);
    setMessage("");
  };

  return (
    <div>
      <h2>Real Time Chat</h2>

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