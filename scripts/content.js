console.log("Initializing MGC extension...");

const htmlElement = document.createElement("div")
htmlElement.className = "coarseDot"

const coarseDotSizeInPx = 50;

htmlElement.style.position = "fixed";
htmlElement.style.top = "10px";
htmlElement.style.left = "10px";
htmlElement.style.pointerEvents = "none";
htmlElement.style.width = `${coarseDotSizeInPx}px`;
htmlElement.style.height = `${coarseDotSizeInPx}px`;
htmlElement.style.backgroundColor = "red";
htmlElement.style.borderRadius = "50%";
htmlElement.style.zIndex = "99999";



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
