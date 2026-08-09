import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

let io: Server;

export function initializeSocket(server: HttpServer) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });
    io.on("connection", () => {
        console.log("client connected");
    });
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
}
