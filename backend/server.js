import connectDB from './config/database.js';
import dotenv from 'dotenv';
import app from './app.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';

app.use(cors());
app.use(express.json());

dotenv.config({ path: './.env' });

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);
    socket.on("send_message", (data) => {
        console.log("Message received: ", data);
        io.emit("receive_message", data);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected: ', socket.id);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});