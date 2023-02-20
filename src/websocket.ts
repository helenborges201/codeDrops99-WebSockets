import {io} from "./http";

interface RoomUser  {
    socket_id: string,
    username: string,
    room: string
}

interface Message {
    room: string,
    text: string,
    createdAt: Date,
    username: string
}

const users: RoomUser[] = [];
const messages: Message[] = []

io.on("connection", (socket) => {
    socket.on("select_room", (data, callback) => {
       
        // connectando user a uma sala
        socket.join(data.room)

        const userInRoom = users.find(
            (user) => user.username === data.username && user.room === data.room
        ) 

        if(userInRoom) {
            userInRoom.socket_id = socket.id;
        }
        else {
            // dados do usuario
            users.push({
                room: data.room, 
                username: data.username, 
                socket_id: socket.id
            })
        }

        const messagesRoom = getMessagesRoom(data.room);
        callback(messagesRoom);
        
    });

    socket.on("message", (data) => {
        // Salvar as mensagens 
        const message: Message = {
            room: data.room,
            username: data.username,
            text: data.message,
            createdAt: new Date()
        };

        messages.push(message);

        // Enviar para os usuarios da salas
        io.to(data.room).emit("message", message);


    })
})

function getMessagesRoom(room: string) {
    const messagesRoom = messages.filter(message => message.room === room);
    return messagesRoom;
}
