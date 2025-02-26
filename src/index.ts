import cors from "cors";
import express from "express";
import http from "http";
import {Server} from "socket.io";

import serverconfig from "./config/server.config";
import roomHandler from "./handlers/room.handler";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("new user connected");
    roomHandler(socket);
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

});

server.listen(serverconfig.PORT, () => {
    console.log(`server is running at ${serverconfig.PORT}`);
});
