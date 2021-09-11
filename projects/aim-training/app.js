const startBtn = document.querySelector(".start");

const screens = document.querySelectorAll(".screen");


const timeModes = document.querySelector(".time-list");
const timeHTML = document.querySelector("#time");
let time = 5;
let score = 0;

let interval ;

startBtn.addEventListener("click",(e)=>{

    e.preventDefault();
    screens[0].classList.add("up");
})

timeModes.addEventListener("click",e=>{
    if(e.target.classList.contains("time-btn")){
        console.log(e.target);
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add("up");
        startGame();
    }
})


function startGame(){
    interval = setInterval(decreaseTime, 1000);
    resetField()
    createRandomCircle()
    timeHTML.innerHTML = `00:${time}`;
   
}

function decreaseTime(){
    
    if(time === 0){
        finishGame();
    }else{
        let currentTime = --time;
        if(currentTime<10){

            timeHTML.innerHTML = `00:0${currentTime}`; 
        }
        else{
            timeHTML.innerHTML = `00:${currentTime}`;
        }
    }
  
}

function finishGame(){
    document.querySelector("#board").innerHTML = `<h1>Your score :${score}</h1>`
}

function createRandomCircle(){
    const circle = document.createElement("div");

    circle.classList.add("circle");
    let sizeCircle = getRandomNumber(10,50);
    const {height,width} = document.querySelector("#board").getBoundingClientRect();
    
    const x = getRandomNumber(0,width-sizeCircle);
    const y = getRandomNumber(0,height-sizeCircle)

    circle.style.width = sizeCircle + "px";
    circle.style.height = sizeCircle + "px";
    circle.style.top = y + "px";
    circle.style.left = x + "px";
    circle.style.background = "#" + genRanHex(6);
    document.querySelector("#board").append(circle);
}


function getRandomNumber(min,max){
    return Math.round(Math.random()*(max-min)+min);
}


document.querySelector("#board").addEventListener("click",e=>{
    if(e.target.classList.contains("circle")){
        ++score;
        e.target.remove();
        createRandomCircle()
    }
})


const genRanHex = size => {
    
  return  [...Array(size)].map(() => 
      
    Math.floor(Math.random() * 16).toString(16)).join('');
  
}

document.querySelector(".back-btn").addEventListener("click",()=>{
    finishGame();
    screens[1].classList.remove("up");
    clearInterval(interval)
})

function resetField (){
    document.querySelector("#board").innerHTML = ""
}