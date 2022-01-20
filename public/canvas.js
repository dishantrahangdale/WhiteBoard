// const Socket  = require("socket.io");

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// let eraser = document.querySelector(".eraser");
let penColorElem = document.querySelectorAll(".pen-color");
let penWidthElem = document.querySelector(".pen-width")
let eraserWidthElem = document.querySelector(".eraser-width")
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
let mouseDown = false;

let tracker = [];
let track = 0;

let penColor = "red"
let penWidth = "3";
let eraserWidth = "3";
let eraserColor = "white"
// let tool = canvas.getContext("2d");
// tool.strokeStyle = "red"; //color
// tool.lineWidth = "5";   //thickness 
// tool.beginPath(); //new graphic / path
// tool.moveTo(10, 10); //start point
// tool.lineTo(100,150); //end point
// tool.stroke(); //fill color (fill graphic)

// // to start a new line beginpath() and move() should be there else path will continue from last end point
// tool.lineTo(200,200);
// tool.stroke();

let tool = canvas.getContext("2d");
tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

canvas.addEventListener("mousedown",(e)=>{
    mouseDown = true;
    socket.emit("beginPath",{
        x : e.clientX,
        y : e.clientY
    });
})

canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown){
        socket.emit("drawStroke",{
            x : e.clientX,
            y : e.clientY,
            color : eraserflag ? eraserColor : penColor,
            width : eraserflag ? eraserWidth : penWidth,
            type: eraserflag ? "erase" : "pen"
        })
    }

    // normal functionality
    // if(mouseDown){
    //     tool.lineTo(e.clientX,e.clientY);
    //     tool.stroke();
    //     tool.strokeStyle = eraserflag ? eraserColor : penColor;
    //     tool.lineWidth = eraserflag ? eraserWidth : penWidth;
    // }
})
canvas.addEventListener("mouseup",(e)=>{
    mouseDown = false;
    let url = canvas.toDataURL();
    tracker.push(url);
    track = tracker.length-1;
})

undo.addEventListener("click",(e)=>{
    if(track > 0) track--;
    socket.emit("undoredo",{
        tracker,
        track
    })
    // let trackerObj = {
    //     trackValue : track,
    //     tracker : tracker
    // }
    // undoredo(trackerObj);
})

redo.addEventListener("click",(e)=>{
    if(track < tracker.length - 1) track++;
    socket.emit("undoredo",{
        tracker,
        track
    })
    // let trackerObj = {
    //     trackValue : track,
    //     tracker : tracker
    // }
    // undoredo(trackerObj);
})

penColorElem.forEach((elem)=>{
    elem.addEventListener("click",(e)=>{
        let col = elem.classList[0];
        penColor = col;
        tool.strokeStyle = penColor;
    })
})

penWidthElem.addEventListener("change",(e)=>{
    penWidth = penWidthElem.value;
    tool.lineWidth = penWidth;
})

eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click",(e)=>{
    eraserflag = !eraserflag;
    if(eraserflag){
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }
    else{
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})

download.addEventListener("click",(e)=>{
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})
function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj) {
    if (strokeObj.type === "pen") penWidthElem.value = strokeObj.width;
    else eraserWidthElem.value = strokeObj.width;
    penColor = strokeObj.color;
    penWidth = strokeObj.width;
    tool.lineWidth = strokeObj.width;
    tool.strokeStyle = strokeObj.color;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}
function undoredo(trackerObj){
    track = trackerObj.trackValue;
    tracker = trackerObj.tracker;

    let url = tracker[track];
    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

socket.on("beginPath", (data)=>{
    // data from server
    beginPath(data);
})
socket.on("drawStroke", (data)=>{
    // data from server
    drawStroke(data);
})
socket.on("undoredo", (data)=>{
    // data from server
    undoredo(data);
})