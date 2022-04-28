export function handleCarousel(carObj, dir) {
  if(checkCarouselPos(carObj, dir)) {
    moveCarousel(carObj, dir);
    console.log("needs to change page counter");
    changeCurrentPageNumber(carObj, dir);
  };
}


function changeCurrentPageNumber(carObj, dir) {
  if (dir === "next") {
    carObj.carPageCounter++;
  } else if (dir === "prev") {
    carObj.carPageCounter--;
  }
  console.log(carObj.carPageCounter);
  carObj.carPageCounterElem.textContent = carObj.carPageCounter;
}


function checkCarouselPos(carObj, dir) {
  console.log("pos", carObj.carPos);
  let tmpPos = undefined;
  if (dir === "next") {
    tmpPos = carObj.carPos - carObj.carStep;
  } else if (dir === "prev") {
    tmpPos = carObj.carPos + carObj.carStep;
  }
  
  console.log("nextPos", tmpPos);
  if ((tmpPos > 0) || (tmpPos <= -100)) {
    console.log("overflow");
    return false;
  }
  return true;
}


function moveCarousel(carObj, dir) {
  console.log(carObj.carPos);
  console.log(carObj.carStep);

  if (dir === "next") {
    carObj.carPos -= carObj.carStep;
  } else if (dir === "prev") {
    carObj.carPos += carObj.carStep;
  }
  
  console.log("current", carObj.carPos);
  carObj.carElem.style.transform = `translateX(${carObj.carPos}%)`;
}