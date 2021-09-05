
  
  //    try{ 
  //     id3.fromUrl(("./tracks/003.Ace of Base - All that she wants 2016 (KnTBootleg).mp3").trim()).then((tags) => {
  //       console.log(tags)
  //       console.log(tags.images[0].data)
  //       let content = new Uint8Array(tags.images[0].data);
  //       console.log(content)
  
    
      
  // document.getElementById('track_img').src = URL.createObjectURL(
  //  new Blob([content], { type: tags.images[0].mime} /* (1) */)
  // );
  // }).catch((err)=>{
  // console.log(err)
  // })
  //     }catch(err){
  //         console.log("что-то пошло не так")
  //     }
  
  


import * as id3 from '//unpkg.com/id3js@^2/lib/id3.js';   
import  Controllers  from './Controllers.js';
import EngineControllers from './EngineControllers.js';





let analyzer, canvas, ctx, btn, audio
let audioContext ;


const controllers = new Controllers();
const engine = new EngineControllers();

const createAudioContext = () =>{
   if(!audioContext){
      audioContext    = new AudioContext()
      analyzer = audioContext.createAnalyser()
      analyzer.fftSize = 8192
       //4096
       //8192
       let source = audioContext.createMediaElementSource(audio)
       source.connect(analyzer)
       analyzer.connect(audioContext.destination)
      
         }
         else{
            //console.log("audio context already create")
         }
}



let itemSongs = {
   src:"../tracks/Neizvestnyjj_-_Tokijjskijj_gul_4_sezon_opening_59690834.mp3",
   name:"Tokyo Goul",
   artist : "unravel"
}
let itemSongs1 = {
   src:"../tracks/Alessia_Cara_-_Here_Lucian_Remix_62940245.mp3",
   name:"Here",
   artist : ""
}


     

let songs = [];

songs.push(itemSongs);
songs.push(itemSongs1);

console.log(songs)

let btnControllers = document.querySelectorAll(".btn-controller");


////initialize Draw Mode

   btnControllers.forEach(element => {
      element.addEventListener("click",()=>{
      controllers.Init(drawModeWaves,createAudioContext,audio);
      engine.Init(drawModeWaves,createAudioContext,audio);
      engine.TrackingEnd(songs)
   })
   });


window.addEventListener("resize",()=>{
  // canvas.width = window.innerWidth
   //canvas.height = window.innerHeight
})



window.addEventListener("load",()=>{
   canvas = document.getElementById('canvas')
   canvas.width = window.innerWidth
   canvas.height = window.innerHeight
   ctx = canvas.getContext('2d')
   audio = new Audio();

   
   controllers.playOrPause(document.querySelector(".playOrPause"),songs,"Enter");
  
   controllers.nextTrack(document.querySelector(".next"),songs,"ArrowRight");
 
   controllers.prevTrack(document.querySelector(".prev"),songs,"ArrowLeft");

 
})

window.addEventListener("keyup",(e)=>{
   console.log(e.key)
})















//   document.querySelector('.file_load').addEventListener('change', async (e) => {
//    let file = e.currentTarget.files[0];
//    let url = URL.createObjectURL(file);
//        try{
      
//       const tags = await id3.fromFile(file);
//       console.log(tags)
//       console.log(file)
       
//        audio.src = url;
//        document.querySelector(".full_inner_screen").play();
//       console.log(url)
//        }
//        catch(e){
//          audio.src = url;
//           console.log(e)
//        }
      
//     });
  

      window.addEventListener("keyup",e=>{
        
         if(e.keyCode === 32){
            e.preventDefault();
            
           if(!audio.paused){
      
            document.querySelector(".full_inner_screen").pause();
      
           }else{
           
            document.querySelector(".full_inner_screen").play();
         
           }
         }
      })





 











function drawModeWaves() {
  
   requestAnimationFrame(drawModeWaves)
   let data = new Uint8Array(analyzer.frequencyBinCount)
   analyzer.getByteFrequencyData(data)
   ctx.clearRect(0,0,canvas.width, canvas.height)


   
   let step = 50;
   let sizeHeightWaves = 3;
   
   ctx.beginPath()
   ctx.moveTo(0, canvas.height)
   ctx.lineTo(0,canvas.height - data[0])
   
   for(let i = 0; i < data.length; i += step) {
      
      let currPoint = {
         x: i,
         y: canvas.height - (data[i]*sizeHeightWaves)
      }
 
      let nextPoint = {
         x: i + step,
         y: canvas.height - (data[i + step]*sizeHeightWaves)
      }
      
      let xc = (currPoint.x + nextPoint.x) / 2;
      let yc = (currPoint.y + nextPoint.y) / 2;
      ctx.quadraticCurveTo(currPoint.x, currPoint.y, xc, yc)
      
 
      
   }

  
   ctx.fillStyle = 'rgba(255,255,255,1)';
   ctx.closePath();  //draw to first point
   ctx.shadowColor = 'rgba(178, 0, 0,0.9)';
   ctx.shadowBlur = 20;
   
   ctx.fill();
}


