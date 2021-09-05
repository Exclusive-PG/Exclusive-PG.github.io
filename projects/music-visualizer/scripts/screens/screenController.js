
import { initFM } from './fileManager/fm.js';



const screens = document.querySelectorAll(".screen");
const btns = document.querySelectorAll(".nav-list > li");
console.log(btns)
console.log(screens)

for(let btn of btns){

    btn.addEventListener("click",()=>{
     
        if(!btn.hasAttribute("data-screen")) return;
       
        switch(btn.getAttribute("data-screen")){
            
            case "file_manager" : {

                screens.forEach(item =>{
                    if(item.hasAttribute("data-screen-target")){
                        
                        item.getAttribute("data-screen-target") === "file_manager" && item.classList.toggle("selected")
                    }
                })
                
                return console.log("file_manager")
            }
           
        }
    })
}


document.addEventListener("DOMContentLoaded",initFM);