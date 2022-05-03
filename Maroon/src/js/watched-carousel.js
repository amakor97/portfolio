"use strict";

import { handleCarousel } from "./carouselFunctions.js";

const watchedPrevBtn = document.querySelector(".js-watched-carousel-prev-btn");
const watchedNextBtn = document.querySelector(".js-watched-carousel-next-btn");
const watchedCarousel = document.querySelector(".js-watched-carousel-inner");
const watchedCurrentPageElem = document.querySelector(".js-watched-carousel-current-page");
const watchedMaxPageElem = document.querySelector(".js-watched-carousel-max-page");

let watchedData = 8;  //length of array of objects
let watchedDisplayedCards = 1;
let watchedPageNumber = Math.ceil(watchedData / watchedDisplayedCards);
watchedMaxPageElem.textContent = watchedPageNumber;

const watchedCarouselFullWidth = 100*watchedPageNumber + "%";
watchedCarousel.style.width = watchedCarouselFullWidth;
watchedCarousel.style.gridTemplateColumns = `repeat(${watchedPageNumber}, 1fr)`;


let watchedStep = 100 / watchedPageNumber;
let watchedCarouselPos = 0;

const subCarousel = {
  "carElem": watchedCarousel,
  "carStep": watchedStep,
  "carPos": watchedCarouselPos,
  "carPageCounter": 1,
  "carPageCounterElem": watchedCurrentPageElem,
}

watchedNextBtn.addEventListener("click", 
handleCarousel.bind(null, subCarousel, "next"));
watchedPrevBtn.addEventListener("click", 
handleCarousel.bind(null, subCarousel, "prev"));