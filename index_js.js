let optionsCont = document.querySelector(".options-cont")
let toolsCont = document.querySelector(".tools-cont")
let penToolCont = document.querySelector(".pen-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pen = document.querySelector(".pen")
let sticky = document.querySelector(".sticky");
let eraser = document.querySelector(".eraser");
let upload = document.querySelector(".upload");
let classBars = "fa-bars"
let classTimes = "fa-times"
let penflag = false;
let eraserflag = false;
let optionflag = true;


optionsCont.addEventListener("click",(e)=>{
    optionflag = !optionflag;
    if(optionflag){
        openTools();
    }
    else{
        closeTools();
    }
})

let sym = document.querySelector(".fas")
function openTools(){
    sym.classList.remove(classBars);
        sym.classList.add(classTimes)
    toolsCont.style.display = "none";

}
function closeTools(){
    sym.classList.remove(classTimes);
    sym.classList.add(classBars)
    toolsCont.style.display = "flex";
    penToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

pen.addEventListener("click",(e)=>{
    penflag = !penflag;
    if(penflag){
        penToolCont.style.display = "block";
    }
    else{
        penToolCont.style.display = "none";
    }
})


eraser.addEventListener("click",(e)=>{
    eraserflag = !eraserflag;
    if(eraserflag){
        eraserToolCont.style.display = "flex";
    }
    else{
        eraserToolCont.style.display = "none";
    }
})

sticky.addEventListener("click",(e)=>{
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class","sticky-cont");
    stickyCont.innerHTML = `
        <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
            <textarea spellcheck="false" class="textarea"></textarea>
        </div>
    `;
    document.body.appendChild(stickyCont);
    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize,remove,stickyCont);
    stickyCont.onmousedown = function(event) {
        dragAndDrop(stickyCont,event)
    };

    stickyCont.ondragstart = function() {
        return false;
    };
})

upload.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyCont = document.createElement("div");
        stickyCont.setAttribute("class","sticky-cont");
        stickyCont.innerHTML = `
            <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
            </div>
            <div class="note-cont">
                <img src = "${url}"/>
            </div>
        `;
        document.body.appendChild(stickyCont);
        let minimize = stickyCont.querySelector(".minimize");
        let remove = stickyCont.querySelector(".remove");
        noteActions(minimize,remove,stickyCont);
        stickyCont.onmousedown = function(event) {
            dragAndDrop(stickyCont,event)
        };

        stickyCont.ondragstart = function() {
            return false;
        };
    })
})

function createSticky(){

}

function noteActions(minimize,remove,stickyCont){
    remove.addEventListener("click",(e)=>{
        stickyCont.remove();
    })
    minimize.addEventListener("click",(e)=>{
        // console.log("sadada");
        let noteCont = stickyCont.querySelector(".note-cont")
        let display1 = getComputedStyle(noteCont).getPropertyValue("display");
        if(display1 === "none"){
            noteCont.style.display = "block";
        }
        else{
            noteCont.style.display = "none";
        }
    })
}

function dragAndDrop(element,event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
      
        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        // document.body.append(element);
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        element.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          element.onmouseup = null;
        };
      
      
}