export function handleCarousel(carObj, dir) {
  if(checkCarouselPos(carObj, dir)) {
    moveCarousel(carObj, dir);
    changeCurrentPageNumber(carObj, dir);
  };
}


function changeCurrentPageNumber(carObj, dir) {
  carObj.carPageCounter = 
  (dir === "next") ? ++carObj.carPageCounter : 
  (dir === "prev") ? --carObj.carPageCounter :
  carObj.carPageCounter; 

  carObj.carPageCounterElem.textContent = carObj.carPageCounter;
}


function checkCarouselPos(carObj, dir) {
  let tmpPos = 
  (dir === "next") ? carObj.carPos - carObj.carStep : 
  (dir === "prev") ? carObj.carPos + carObj.carStep : 
  carObj.carPos;
  
  if ((tmpPos > 0) || (tmpPos <= -100)) {
    return false;
  }
  return true;
}


function moveCarousel(carObj, dir) {
  carObj.carPos = 
  (dir === "next") ? carObj.carPos -= carObj.carStep : 
  (dir === "prev") ? carObj.carPos += carObj.carStep : 
  carObj.carPos;
  
  carObj.carElem.style.transform = `translateX(${carObj.carPos}%)`;
}