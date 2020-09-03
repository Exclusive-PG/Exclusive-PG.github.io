const parallax = (event) =>{
let backImage = document.querySelector(".background-audio");
let speedParallax = backImage.getAttribute("data-speed-parallax");
backImage.style.transform = `translateX(${event.clientX*speedParallax/3000}px)`;

}

document.addEventListener("mousemove",parallax);