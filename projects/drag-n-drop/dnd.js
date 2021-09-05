let items = document.querySelectorAll(".item");
const DropPlaces = document.querySelectorAll(".placeholder");
let currentItem ;

const DragStart = (e) =>{
    console.log("drag start");
    e.target.classList.add("hold");
    currentItem = e.target;
    setTimeout(() => {e.target.classList.add("hide");}, 0);
    }
    
    
const DragEnd = (e) =>{
    console.log("drag end");
  
   setTimeout(() => {
    e.target.classList.remove("hold" , "hide");
   }, 100);

    }

const dragOver = (e)=>e.preventDefault();

const dragEnter = (e)=>{
    e.target.classList.add("entered");
    

}
const dragLeave = (e)=>{
    e.target.classList.remove("entered");
}
const drop = (e)=>{
  
    if(e.target.classList.contains("fa-trash-alt")){
        
        e.target.classList.remove("entered");
        setTimeout(() => {
            document.querySelector(".hold").remove()
        }, 10);
    }


    if(e.target.classList.contains("item")) {
        e.target.classList.remove("entered");
        return;
    }else{
        e.target.append(currentItem);
        e.target.classList.remove("entered");
    }
}



for ( const DropPlace of DropPlaces){

    DropPlace.addEventListener("dragover",dragOver);
    DropPlace.addEventListener("dragenter",dragEnter);
    DropPlace.addEventListener("dragleave",dragLeave);
    DropPlace.addEventListener("drop",drop);
}



window.addEventListener("load",generateFunc);




document.querySelector(".btn-add").addEventListener("click",()=>{
    let inputPlace = document.querySelector(".input-new-goal");
    let div = document.createElement("div");
    div.className = "item";  

    if(inputPlace.value !== ""){
    div.innerHTML = inputPlace.value;
    div.title = inputPlace.value
    inputPlace.value = "";
    div.setAttribute("draggable",true);
    document.querySelector(".generate").append(div);
    generateFunc();
    }
})

function generateFunc(){
    items = document.querySelectorAll(".item");
    items.forEach(item=>{
        item.setAttribute("draggable",true);
        item.addEventListener("dragstart",DragStart);
        item.addEventListener("dragend",DragEnd);


    })
}