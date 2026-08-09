import {Server} from 'socket.io';

let io: Server;

export function initializeSocket(server:any){
    io = new Server(server, {
        cors:{
            origin: "http://localhost:3000"
        }
    });
    io.on("connection",()=>{
        console.log("client connected")
    })
}

export function getIO(){
    return io;
}