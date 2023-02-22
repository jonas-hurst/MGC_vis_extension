console.log("Initializing MGC extension...");

const coarseDotSizeInPx = 20;

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

const centercross = document.createElement("div");
centercross.className ="centercross";
centercross.style.width = "50px";
centercross.style.height = "50px"
centercross.style.borderRadius = "50%";
centercross.style.position = "fixed";
centercross.style.border = "4px solid red";
centercross.style.left = "50vw";
centercross.style.top = "50vh";
centercross.style.transform = "translate(-29px, -29px)";
centercross.style.zIndex = "99998";
centercross.style.pointerEvents = "none";
centercross.style.display = "flex";
centercross.style.alignItems = "center";
centercross.style.justifyContent ="center";
centercross.style.opacity = "0";

const horizontalLine = document.createElement("div");
horizontalLine.style.backgroundColor = "red";
horizontalLine.style.position = "fixed";
horizontalLine.style.height = "3px";
horizontalLine.style.width = "inherit";
horizontalLine.style.opacity = "inherit";
centercross.insertAdjacentElement("afterbegin", horizontalLine);

const verticalLine = document.createElement("div");
verticalLine.style.backgroundColor = "red";
verticalLine.style.position = "fixed";
verticalLine.style.height = "inherit";
verticalLine.style.width = "3px";
verticalLine.style.opacity = "inherit";
centercross.insertAdjacentElement("afterbegin", verticalLine)

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
        document.body.insertAdjacentElement("afterbegin", centercross)
    }

    // Remove pointer from DOM once connection closes
    socket.onclose = () => {
        dotRight.remove();
    }

    // Process message from server
    socket.onmessage = (event) => {
        const msgData = JSON.parse(event.data)
        // console.log(msgData)

        if (msgData.centercross){
            centercross.style.opacity = "1";
        } else {
            centercross.style.opacity = "0";
        }

        // Process Left hand data
        if (msgData.left.present){
            dotLeft.style.opacity = "1";
            dotLeft.style.top = `${msgData.left.position.y - coarseDotSizeInPx/2}px`;
            dotLeft.style.right = `${msgData.left.position.x - coarseDotSizeInPx/2}px`;
        } else {
            // console.log("left hand not there");
            dotLeft.style.opacity = "0";
        }

        // Process Right hand data
        if (msgData.right.present){
            dotRight.style.opacity = "1";
            dotRight.style.top = `${msgData.right.position.y - coarseDotSizeInPx/2}px`;
            dotRight.style.right = `${msgData.right.position.x - coarseDotSizeInPx/2}px`;
        } else {
            // console.log("right hand not there");
            dotRight.style.opacity = "0";
        }
        
    }

}


// addEventListener("mousemove", (event) => {
//   console.log(event.pageX, event.pageY)
// });

