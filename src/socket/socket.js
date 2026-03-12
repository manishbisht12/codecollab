import { io } from "socket.io-client";

const socket = io("https://codecollab-backend-4t1d.onrender.com");

socket.emit("message", "Hello from frontend");