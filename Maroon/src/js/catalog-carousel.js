"use strict";

import { handleCarousel } from "./carouselFunctions.js";

const prevBtn = document.querySelector(".js-catalog-carousel-prev-btn");
const nextBtn = document.querySelector(".js-catalog-carousel-next-btn");

const carousel = document.querySelector(".js-catalog-carousel-inner");

//write calc function for defining carousel inners width and offset

let step = 25;
let carouselPos = 0;


//tmp 
let catalogData = 24;

let pageNumber = Math.ceil(catalogData / 12)
const maxPageElem = document.querySelector(".js-catalog-carousel-max-page");
maxPageElem.textContent = pageNumber;

console.log({pageNumber});

let carouselFullWidth = 100*pageNumber + "%";

console.log({carouselFullWidth});

carousel.style.width = carouselFullWidth;
carousel.style.gridTemplateColumns = `repeat(${pageNumber}, 1fr)`;

let testStep = 100 / (pageNumber);
step = testStep;
console.log({testStep});

let currentPage = 1;
const currentPageElem = document.querySelector(".js-catalog-carousel-current-page");



const catalogCarousel = {
  "carElem": carousel,
  "carStep": step,
  "carPos": carouselPos,
  "carPageCounter": 1,
  "carPageCounterElem": currentPageElem,
}


nextBtn.addEventListener("click", handleCarousel.bind(null, catalogCarousel, "next"));

prevBtn.addEventListener("click", handleCarousel.bind(null, catalogCarousel, "prev"));

function moveCarousel(step) {
  if(checkCarouselPos(step)) {
    changeCurrentPageNumber(step);
    carouselPos += step;
  };
  console.log({carouselPos});
  carousel.style.transform = `translateX(${carouselPos}%)`;
}

function checkCarouselPos(step) {
  let tmpPos = carouselPos + step;
  if ((tmpPos > 0) || (tmpPos <= -100)) {
    console.log("overflow");
    return false;
  }
  return true;
}

function changeCurrentPageNumber(step) {
  if (step > 0) {
    currentPage--;
  } else {
    currentPage++;
  }
  currentPageElem.textContent = currentPage;
  console.log({currentPage});
}



///////////////
let pageCounterElem = 5;

/*
const catalogCarousel = [
  carousel,
  step,
  carouselPos,
  pageCounterElem
]*/



//console.log(catalogCarousel);

//handleCarousel(catalogCarousel);
//console.log(catalogCarousel.carPos);
/*
function handleCarousel(carArray) {
  const carElem = carArray[0];
  let carStep = carArray[1];
  let carPos = carArray[2];
  let carPageCounter = carArray[3];

  console.log({carElem, carStep, carPos, carPageCounter});
}
*/

//handleCarousel(catalogCarousel);