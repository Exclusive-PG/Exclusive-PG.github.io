export const createPlaylist = (
  typeBlock,
  nameAttribute,
  typeAttribute,
  data,
  dataInfo,
  durationSong = null,
  placeEnd,
  innerHTML = "",
  nameSong
) => {
  let WrapperContent = document.createElement(typeBlock);
  WrapperContent.setAttribute(typeAttribute, nameAttribute);
  WrapperContent.setAttribute(data, dataInfo);

  if (durationSong !== null) {
    let WrapperName = document.createElement(typeBlock);
    placeEnd.append(WrapperContent);
    WrapperName.className = nameSong;
    WrapperName.innerHTML = innerHTML;
    WrapperContent.append(WrapperName);
    let durContent = document.createElement(typeBlock);
    durContent.innerHTML = durationSong;
    durContent.className = "time-song";
    WrapperContent.append(durContent);
    let effectPlayContent = document.createElement(typeBlock);
    effectPlayContent.className = "music-effect-play";
    WrapperContent.append(effectPlayContent);
    effectPlayContent.insertAdjacentHTML('afterBegin', '<div class="line"></div><div class="line1"></div><div class="line2"></div>');
  }
};
export default createPlaylist;

// export const createDurationTimeSong = (typeBlock,nameAttribute,typeAttribute,placeEnd, innerHTML = "", ) =>{

//   let WrapperContent = document.createElement(typeBlock);
//   WrapperContent.setAttribute(typeAttribute , nameAttribute);
//   WrapperContent.innerHTML = innerHTML;
//   placeEnd.append(WrapperContent);
// }
// export const createPlaylist = (
//   typeBlock,
//   nameAttribute,
//   typeAttribute,
//   data,
//   dataInfo,
//   durationSong = null,
//   placeEnd,
//   innerHTML = "",
//   nameSong,
//   typeSong,
// ) => {
//   let WrapperContent = document.createElement(typeBlock);
//   WrapperContent.setAttribute(typeAttribute, nameAttribute);
//   WrapperContent.setAttribute(data, dataInfo);

//   if (durationSong !== null) {
//     let WrapperName = document.createElement(typeBlock);
//     placeEnd.append(WrapperContent);
//     WrapperName.innerHTML = innerHTML;
//     WrapperName.setAttribute(typeSong,nameSong)
//     WrapperContent.append(WrapperName);
//     let durContent = document.createElement(typeBlock);
//     durContent.innerHTML = durationSong;
//     WrapperContent.append(durContent);
//   }
// };
