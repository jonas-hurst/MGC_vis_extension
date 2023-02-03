console.log("Initializing MGC extension...");

const dotRight = document.createElement("div")
dotRight.className = "dotRight"
dotRight.innerText = "R";

const coarseDotSizeInPx = 50;

dotRight.style.textAlign = "center";
dotRight.style.lineHeight = `${coarseDotSizeInPx}px`;
dotRight.style.position = "fixed";
dotRight.style.top = "10px";
dotRight.style.right = "10px";
dotRight.style.pointerEvents = "none";
dotRight.style.width = `${coarseDotSizeInPx}px`;
dotRight.style.height = `${coarseDotSizeInPx}px`;
dotRight.style.backgroundColor = "red";
dotRight.style.borderRadius = "50%";
dotRight.style.zIndex = "99999";



if (confirm("do you want to connect to Server?")){

    const websocketUrl = "ws://localhost:8765";
    const socket = new WebSocket(websocketUrl)

    // Show error message on error
    socket.onerror = (event) => {
        alert("Something went wrong connecting to server.")
    }

    // Add pointer to DOM if connection is open
    socket.onopen = () => {
        document.body.insertAdjacentElement("afterbegin", dotRight)
    }

    // Remove pointer from DOM once connection closes
    socket.onclose = () => {
        dotRight.remove();
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
            dotRight.style.top = `${msgData.right.position.y - coarseDotSizeInPx/2}px`;
            dotRight.style.right = `${msgData.right.position.x - coarseDotSizeInPx/2}px`;
        }
        
    }

}


// addEventListener("mousemove", (event) => {
//   console.log(event.pageX, event.pageY)
// });

