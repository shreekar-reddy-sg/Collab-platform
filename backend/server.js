import connectDB from './config/database.js';
import dotenv from 'dotenv';
import app from './app.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import Message from './models/message.model.js';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

await pubClient.connect();
await subClient.connect();

app.use(cors());
app.use(express.json());

dotenv.config({ path: './.env' });

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.adapter(createAdapter(pubClient, subClient));

io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);

    socket.on("join_room", async (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);

        const messages = await Message.find({ room }).sort({ timestamp: 1 });

        socket.emit("chat_history", messages);
    });

    socket.on("send_message", async (data) => {

  const message = new Message({
    room: data.room,
    message: data.message,
    sender: data.sender   
  });

  const savedMessage = await message.save();

  io.to(data.room).emit("receive_message", savedMessage);

});

    socket.on('disconnect', () => {
        console.log('A user disconnected: ', socket.id);
    });
});
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});