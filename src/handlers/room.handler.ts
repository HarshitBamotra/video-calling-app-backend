import { Socket } from "socket.io/dist";
import {v4 as UUIDv4} from "uuid";
import IRoomParams from "../interfaces/i.room.params";

const rooms: Record<string, string[]> = {};
const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDv4();

        socket.join(roomId);
        rooms[roomId] = [];
        socket.emit("room-created", {roomId});
        console.log(`room created with id: ${roomId}`);
    };

    const joinedRoom = ({roomId, peerId}: IRoomParams) => {
        if (rooms[roomId]) {
            console.log("Room joined: ", roomId, "with peer id: ", peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId);

            socket.emit("get-users", {participants: rooms[roomId]});
        }
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};

export default roomHandler;
