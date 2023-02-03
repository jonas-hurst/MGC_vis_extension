console.log("Initializing MGC extension...");

const coarseDotSizeInPx = 50;

function addCoarseCssToDot(element, color) {

    element.style.textAlign = "center";
    element.style.lineHeight = `${coarseDotSizeInPx}px`;
    element.style.position = "fixed";
    element.style.top = "10px";
    element.style.right = "10px";
    element.style.pointerEvents = "none";
    element.style.width = `${coarseDotSizeInPx}px`;
    element.style.height = `${coarseDotSizeInPx}px`;
    element.style.backgroundColor = color;
    element.style.borderRadius = "50%";
    element.style.zIndex = "99999";
    element.style.opacity = "1"
}

const dotRight = document.createElement("div")
dotRight.className = "dotRight"
dotRight.innerText = "R";
addCoarseCssToDot(dotRight, "red")

const dotLeft = document.createElement("div");
dotLeft.className = "dotLeft";
dotLeft.innerText = "L";
addCoarseCssToDot(dotLeft, "blue")



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
        document.body.insertAdjacentElement("afterbegin", dotLeft)
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
            dotLeft.style.opacity = "1";
            dotLeft.style.top = `${msgData.left.position.y - coarseDotSizeInPx/2}px`;
            dotLeft.style.right = `${msgData.left.position.x - coarseDotSizeInPx/2}px`;
        } else {
            console.log("left hand not there");
            dotLeft.style.opacity = "0";
        }

        // Process Right hand data
        if (msgData.right.present){
            dotRight.style.opacity = "1";
            dotRight.style.top = `${msgData.right.position.y - coarseDotSizeInPx/2}px`;
            dotRight.style.right = `${msgData.right.position.x - coarseDotSizeInPx/2}px`;
        } else {
            console.log("right hand not there");
            dotRight.style.opacity = "0";
        }
        
    }

}


// addEventListener("mousemove", (event) => {
//   console.log(event.pageX, event.pageY)
// });

