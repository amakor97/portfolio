"use strict";

import { handleCarousel } from "./carouselFunctions.js";
import { createCatalogCard } from "./fillers/catalogs-filler.js";

const alsoPrevBtn = document.querySelector(".js-also-carousel-prev-btn");
const alsoNextBtn = document.querySelector(".js-also-carousel-next-btn");
const alsoCarousel = document.querySelector(".js-also-carousel-inner");
const alsoCurrentPageElem = document.querySelector(".js-also-carousel-current-page");
const alsoMaxPageElem = document.querySelector(".js-also-carousel-max-page");

let fullScreenWidth = window.innerWidth;
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


let dataFile = "../../data/productData.json";
let dataObj = undefined;

fetch (dataFile)
.then(response => response.json())
.then(function(json) {
  dataObj = json;
  console.log(dataObj);
  const main = document.querySelector(".main");

  let cardCounter = 0;

  let cardsToRender = alsoData;
  for (let i = 0; i < alsoPageNumber; i++) {
    let page = document.createElement("div");
    page.classList.add("sub-carousel__page", 
    "js-sub-carousel-page");

    for (let j = 0; j < alsoDisplayedCards; j++) {
      //console.log({cardCounter});
      //console.log({watchedData});
      if (cardCounter === alsoData) {
        break;
      }
      let card = createCatalogCard(dataObj[cardCounter]);
      cardCounter++;
      page.appendChild(card);
    }

    alsoCarousel.append(page);
  }
});