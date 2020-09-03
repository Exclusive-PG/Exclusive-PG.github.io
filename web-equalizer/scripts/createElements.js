const createElementsPlay = (id, placeEnd, innerHTML = "", typeBlock) => {
    let divContent = document.createElement(typeBlock);
    divContent.setAttribute("id", id);
    divContent.innerHTML = innerHTML;
    placeEnd.append(divContent);
  };
  
  export default createElementsPlay;