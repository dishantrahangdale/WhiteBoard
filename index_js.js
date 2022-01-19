let optionsCont = document.querySelector(".options-cont")
let toolsCont = document.querySelector(".tools-cont")
let penToolCont = document.querySelector(".pen-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let classBars = "fa-bars"
let classTimes = "fa-times"

optionsCont.addEventListener("click",(e)=>{
    let sym = document.querySelector(".fas")
    if(sym.classList.contains(classBars)){
        sym.classList.remove(classBars);
        sym.classList.add(classTimes)
        openTools();
        
    }
    else{
        sym.classList.remove(classTimes);
        sym.classList.add(classBars)
        closeTools();
    }
})

function openTools(){
    toolsCont.style.display = "none";
}
function closeTools(){
    toolsCont.style.display = "flex";
    penToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}