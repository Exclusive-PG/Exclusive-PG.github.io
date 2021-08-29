
const upBtn     = document.querySelector(".up-button");
const downBtn   = document.querySelector(".down-button");
const sidebar   = document.querySelector(".sidebar");
const mainSlide = document.querySelector(".main-slide");
const slides    = mainSlide.querySelectorAll("div").length;
const container = document.querySelector(".container");



sidebar.style.top = `-${(slides-1)*100}vh`;

let activeSlide = 0;


upBtn.addEventListener("click",()=>{
    changeSlide("up");
})

downBtn.addEventListener("click",()=>{
    changeSlide("down");
})


window.addEventListener("keyup",e=>{
    console.log(e.key)

    e.key === "ArrowUp" && changeSlide("up");

    e.key === "ArrowDown" && changeSlide("down");
   
})



function changeSlide(direction){
 
    if(direction === "up"){
        activeSlide++;

        if(activeSlide === slides){
            activeSlide = 0;
        }
    }
    else if(direction === "down"){
        activeSlide--;
        if(activeSlide < 0){
            activeSlide = slides - 1;
        }
    }

    let height = container.clientHeight;

    mainSlide.style.transform = `translateY(-${activeSlide*height}px)`;
    sidebar.style.transform = `translateY(${activeSlide*height}px)`;
}
