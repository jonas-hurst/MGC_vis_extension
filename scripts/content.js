console.log("Initializing MGC extension...");

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

    const websocketUrl = "ws://localhost:1234";
    const socket = new WebSocket(websocketUrl)

    // Show error message on error
    socket.onerror = (event) => {
        alert("Something went wrong connecting to server.")
    }

    // Add pointer to DOM if connection is open
    socket.onopen = () => {
        document.body.insertAdjacentElement("afterbegin", htmlElement)
    }

    // Remove pointer from DOM once connection closes
    socket.onclose = () => {
        htmlElement.remove();
    }

    // Process message from server
    socket.onmessage = (event) => {
        console.log(event.data);
    }

}
