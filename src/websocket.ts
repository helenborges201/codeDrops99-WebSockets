import {io} from "./http";

interface RoomUser  {
    socket_id: string,
    username: string,
    room: string
}

const users: RoomUser[] = []

io.on("connection", (socket) => {
    socket.on("select_room", (data) => {
        console.log(data);
        // connectando user a uma sala
        socket.join(data.room)
        
        // dados do usuario
        users.push({
            room: data.room, 
            username: data.username, 
            socket_id: socket.id
        })
    });
})