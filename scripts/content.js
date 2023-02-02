console.log("Hallo Welt!");

const htmlElement = document.createElement("div")
htmlElement.className = "coarseDot"

const dotstyle = [
    "position: fixed;",
    "top: 10px;",
    "left: 10px;",
    "pointer-events: none;",
    "width: 50px;",
    "height: 50px;",
    "background-color: red;",
    "display:inline-block;",
    "border-radius:50%;",
    "z-index: 99999",]
htmlElement.style = dotstyle.join(" ")

if (confirm("do you want to connect to Server?")){
    const websocketUrl = "";
    const socket = new WebSocket(websocketUrl)
    socket.onmessage = OnMessage
}
document.body.insertAdjacentElement("afterbegin", htmlElement)

const OnMessage = (event) => {
    console.log(event.data)
}