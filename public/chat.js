const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

// emit => emitir alguma informação
// on => escutando alguma informação

    const usernameDiv = document.getElementById("username");
    usernameDiv.innerHTML += `Olá ${username} - Você está na sala ${room} `

socket.emit("select_room", {
    username,
    room
}, (messages) => {
    messages.forEach(message => {
        createMessage(message)
    });
});

document.getElementById("message_input").addEventListener
("keypress", (e) => {
    if(e.key === "Enter") {
        const message = e.target.value;

        const data = {
            room,
            message,
            username
        }

        socket.emit("message", data);

        e.target.value = "";
    }
}
)

socket.on("message", (data) => {
    createMessage(data);
 
}) 

function createMessage(data) {
    const messageDiv = document.getElementById("messages");

    messageDiv.innerHTML += `
        <div class="new_message">
            <label for="form-label">
            <strong> ${data.username} </strong> <span> ${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")} </span>
            </label>
        </div>   
    `

}
document.getElementById("logout").addEventListener("click", (e) => {
    window.location.href = "index.html";
})