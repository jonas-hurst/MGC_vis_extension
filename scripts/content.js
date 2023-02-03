console.log("Initializing MGC extension...");

const htmlElement = document.createElement("div")
htmlElement.className = "coarseDot"

htmlElement.innerText = "R";

const coarseDotSizeInPx = 50;

htmlElement.style.textAlign = "center";
htmlElement.style.lineHeight = `${coarseDotSizeInPx}px`;
htmlElement.style.position = "fixed";
htmlElement.style.top = "10px";
htmlElement.style.right = "10px";
htmlElement.style.pointerEvents = "none";
htmlElement.style.width = `${coarseDotSizeInPx}px`;
htmlElement.style.height = `${coarseDotSizeInPx}px`;
htmlElement.style.backgroundColor = "red";
htmlElement.style.borderRadius = "50%";
htmlElement.style.zIndex = "99999";



if (confirm("do you want to connect to Server?")){

    const websocketUrl = "ws://localhost:8765";
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
        const msgData = JSON.parse(event.data)
        // console.log(msgData)

        // Process Left hand data
        if (msgData.left.present){
            console.log("left hand present. not further implemented");
        }

        // Process Right hand data
        if (msgData.right.present){
            htmlElement.style.top = `${msgData.right.position.y - coarseDotSizeInPx/2}px`;
            htmlElement.style.right = `${msgData.right.position.x - coarseDotSizeInPx/2}px`;
        }
        
    }

}


// addEventListener("mousemove", (event) => {
//   console.log(event.pageX, event.pageY)
// });

