
const slides = document.querySelectorAll(".slide");
const arrayRGB = ["FE0702","B7C3D5","E3730E"];


window.addEventListener("load",setColor);

const clearSlides = (slides) =>{

    slides.forEach(item=>{
        item.classList.remove('active');
    })
}



slides.forEach(item=>{

 
    
    item.addEventListener('click',()=>{
        clearSlides(slides);
        item.classList.add('active');
        setColor()
    })
})

function setColor() {

    slides.forEach(item=>{
            
               if(item.classList.contains("active")){
                   let currentColor = arrayRGB[Math.floor(Math.random()*arrayRGB.length)]
                console.log( currentColor);
              item.style.boxShadow = "0 0 25px #" + currentColor
          
            }else{
                item.style.boxShadow = "none"
            }
        })
    }

