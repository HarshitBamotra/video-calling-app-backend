import { Socket } from "socket.io/dist";
import {v4 as UUIDv4} from "uuid";

const roomHandler = (socket: Socket) => {

    const createRoom = ()=>{
        const roomId = UUIDv4();

        socket.join(roomId);
        socket.emit("room-created", {roomId});
        console.log(`room created with id: ${roomId}`);
    }

    const joinRoom = ({roomId}: {roomId: String})=>{
        console.log("Room joined: ", roomId);
    }

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinRoom);
}

export default roomHandler;