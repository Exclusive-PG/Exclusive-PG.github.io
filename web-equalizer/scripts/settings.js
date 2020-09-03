const checkBoxFirst     = document.getElementById("show-element");
const audioBlock        = document.getElementById("audioBlock");
const BtnControl        = document.getElementById("buttons-control");
const arrayRGB          = ["#f50505", "#0054f0", "#05ff16"];
const btnSettings       = document.getElementById("btn-settings");
const PlayList          =  document.getElementById("btn-playlist-songs");
const PlayListPanel     = document.getElementById("playlist-panel");
const btnClosePlayList  = document.getElementById("btn-close-playlist");
let  timer              = 1500;
checkBoxFirst.addEventListener("change", () => {
  if (checkBoxFirst.checked) {
    document.getElementById("buttons-control").classList.add("hideElementPlay");
    document.getElementById("file").classList.add("hideChooseFile");
    setTimeout(() => {
      audioBlock.style.marginTop = 150 + "px";
      audioBlock.style.transition = 0.3 + "s";
    }, 500);
  } else {
    document
      .getElementById("buttons-control")
      .classList.remove("hideElementPlay");
    document.getElementById("file").classList.remove("hideChooseFile");
    setTimeout(() => {
      audioBlock.style.marginTop = 50 + "px";
      audioBlock.style.transition = 0.3 + "s";
    }, 500);
  }
});

btnSettings.addEventListener("click", () => {
  document.getElementById("set-menu").classList.toggle("show");
  btnSettings.classList.toggle("active-class-btn-settings");
  btnSettings.addEventListener("mouseleave",()=>{

    setTimeout(() => {
      btnSettings.style.opacity = 0.1;
    }, timer);
  

  })
  btnSettings.addEventListener("mousemove",()=>{
    btnSettings.style.opacity = 1;

  })
});

PlayList.addEventListener("click",()=>{
  PlayListPanel.style.top = 0 + "%";
  PlayListPanel.style.visibility  = "visible";
  PlayListPanel.style.opacity = 1;
})
btnClosePlayList.addEventListener("click",()=> {
  PlayListPanel.style.top = -150 + "%"
  PlayListPanel.style.visibility  = "hidden";
  PlayListPanel.style.opacity = 0;
});

