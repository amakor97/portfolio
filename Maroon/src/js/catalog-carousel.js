"use strict";

import { handleCarousel } from "./carouselFunctions.js";

const prevBtn = document.querySelector(".js-catalog-carousel-prev-btn");
const nextBtn = document.querySelector(".js-catalog-carousel-next-btn");
const carousel = document.querySelector(".js-catalog-carousel-inner");
const currentPageElem = document.querySelector(".js-catalog-carousel-current-page");
const maxPageElem = document.querySelector(".js-catalog-carousel-max-page");
 
let catalogData = 24;  //length of array of objects
let displayedCards = 12;  
let pageNumber = Math.ceil(catalogData / displayedCards);
maxPageElem.textContent = pageNumber;

let carouselFullWidth = 100*pageNumber + "%";
carousel.style.width = carouselFullWidth;
carousel.style.gridTemplateColumns = `repeat(${pageNumber}, 1fr)`;


let step = 100 / pageNumber;
let carouselPos = 0;

const catalogCarousel = {
  "carElem": carousel,
  "carStep": step,
  "carPos": carouselPos,
  "carPageCounter": 1,
  "carPageCounterElem": currentPageElem,
}

nextBtn.addEventListener("click", 
handleCarousel.bind(null, catalogCarousel, "next"));
prevBtn.addEventListener("click", 
handleCarousel.bind(null, catalogCarousel, "prev"));
