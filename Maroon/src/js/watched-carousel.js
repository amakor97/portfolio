"use strict";

import { handleCarousel } from "./carouselFunctions.js";
import { createCatalogCard } from "./fillers/catalogs-filler.js";

const watchedPrevBtn = document.querySelector(".js-watched-carousel-prev-btn");
const watchedNextBtn = document.querySelector(".js-watched-carousel-next-btn");
const watchedCarousel = document.querySelector(".js-watched-carousel-inner");
const watchedCurrentPageElem = document.querySelector(".js-watched-carousel-current-page");
const watchedMaxPageElem = document.querySelector(".js-watched-carousel-max-page");

let fullScreenWidth = window.innerWidth;
console.log({fullScreenWidth});

console.log(fullScreenWidth >= 768);

let watchedData = 8;  //length of array of objects
let watchedDisplayedCards = (fullScreenWidth >= 768) ? 4 : 1;
let watchedPageNumber = Math.ceil(watchedData / watchedDisplayedCards);
watchedMaxPageElem.textContent = watchedPageNumber;
console.log({watchedDisplayedCards});
console.log({watchedPageNumber});

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


let dataFile = "./data/productData.json";
let dataObj = undefined;

fetch (dataFile)
.then(response => response.json())
.then(function(json) {
  dataObj = json;
  //console.log(dataObj);
  const main = document.querySelector(".main");

  let cardCounter = 0;

  let cardsToRender = watchedData;
  for (let i = 0; i < watchedPageNumber; i++) {
    let page = document.createElement("div");
    page.classList.add("sub-carousel__page", 
    "js-sub-carousel-page");

    for (let j = 0; j < watchedDisplayedCards; j++) {
      //console.log({cardCounter});
      //console.log({watchedData});
      if (cardCounter === watchedData) {
        break;
      }
      let card = createCatalogCard(dataObj[cardCounter]);
      cardCounter++;
      page.appendChild(card);
    }

    watchedCarousel.append(page);
  }
});