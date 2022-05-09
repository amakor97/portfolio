"use strict";

import { handleCarousel } from "./carouselFunctions.js";

const alsoPrevBtn = document.querySelector(".js-also-carousel-prev-btn");
const alsoNextBtn = document.querySelector(".js-also-carousel-next-btn");
const alsoCarousel = document.querySelector(".js-also-carousel-inner");
const alsoCurrentPageElem = document.querySelector(".js-also-carousel-current-page");
const alsoMaxPageElem = document.querySelector(".js-also-carousel-max-page");

let fullScreenWidth = screen.width;
console.log({fullScreenWidth});

let alsoData = 8; //length of array of objects
let alsoDisplayedCards = (fullScreenWidth >= 768) ? 4 : 1;
let alsoPageNumber = Math.ceil(alsoData / alsoDisplayedCards);
alsoMaxPageElem.textContent = alsoPageNumber;

const alsoCarouselFullWidth = 100*alsoPageNumber + "%";
alsoCarousel.style.width = alsoCarouselFullWidth;
alsoCarousel.style.gridTemplateColumns = `repeat(${alsoPageNumber}, 1fr)`;


let alsoStep = 100 / alsoPageNumber;
let alsoCarouselPos = 0;

const subCarousel = {
  "carElem": alsoCarousel,
  "carStep": alsoStep,
  "carPos": alsoCarouselPos,
  "carPageCounter": 1,
  "carPageCounterElem": alsoCurrentPageElem,
}

alsoNextBtn.addEventListener("click",
handleCarousel.bind(null, subCarousel, "next"));
alsoPrevBtn.addEventListener("click",
handleCarousel.bind(null, subCarousel, "prev"));