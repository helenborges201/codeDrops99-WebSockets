const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

// emit => emitir alguma informação
// on => escutando algumainformação

socket.emit("select_room", {
    username,
    room
})

console.log(username, room);