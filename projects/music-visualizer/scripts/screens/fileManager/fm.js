export const initFM = ()=>{

    const dropArea = document.querySelector(".drag-n-drop > i");

    const active = () => dropArea.classList.add("active-dnd")
    
    const inactive = () => dropArea.classList.remove("active-dnd")

    const prevents = e => e.preventDefault();

    ["dragenter","dragover","dragleave","drop"].forEach(eName =>{
        dropArea.addEventListener(eName,prevents);
    });

    ["dragenter","dragover"].forEach(eName=>{
        dropArea.addEventListener(eName,active);
    });
    ["dragleave","drop"].forEach(eName=>{
        dropArea.addEventListener(eName,inactive);
    });
    dropArea.addEventListener("drop",handleDrop)
}


const handleDrop = e =>{
    const dt = e.dataTransfer;
    const file = dt.files;
    console.log(file[0].type)
    if(!file.type === "audio/mpeg") return
    const fileArray = [...file];
    console.log(fileArray)
}
