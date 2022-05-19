"use strict";

import { createCatalogCard } from "./fillers/catalogs-filler.js";
import { SliderObj } from "./touch-slider.js";

const watchedPrevBtn = document.querySelector(".js-watched-carousel-prev-btn");
const watchedNextBtn = document.querySelector(".js-watched-carousel-next-btn");
const watchedCarousel = document.querySelector(".js-watched-carousel-inner");
const watchedCurrentPageElem = document.querySelector(".js-watched-carousel-current-page");
const watchedMaxPageElem = document.querySelector(".js-watched-carousel-max-page");

let watchedData = 0;  
const watchedCardsOnPage = (window.innerWidth >= 768) ? 4 : 1;
let watchedPageNumber = 0;
let watchedCarouselFullWidth = 0;
const watchedDataFilePath = "./data/productData.json";


fetch (watchedDataFilePath)
.then(response => response.json())
.then(function(json) {
  watchedData = 8;
  watchedPageNumber = Math.ceil(watchedData / watchedCardsOnPage);
  watchedMaxPageElem.textContent = watchedPageNumber;

  watchedCarouselFullWidth = 100*watchedPageNumber + "%";
  watchedCarousel.style.width = watchedCarouselFullWidth;
  watchedCarousel.style.gridTemplateColumns = 
    `repeat(${watchedPageNumber}, 1fr)`;

  let watchedSlider = new SliderObj(
    watchedCarousel, watchedPageNumber,
    Math.min(1400, window.innerWidth),
    watchedNextBtn, watchedPrevBtn, 
    watchedCurrentPageElem
  )

  fillWatchedCarousel(json);
});


function fillWatchedCarousel(obj) {
  let cardCounter = 0;

  for (let i = 0; i < watchedPageNumber; i++) {
    let page = document.createElement("div");
    page.classList.add("sub-carousel__page", 
      "js-sub-carousel-page");

    for (let j = 0; j < watchedCardsOnPage; j++) {
      if (cardCounter === watchedData) {
        break;
      }
      let card = createCatalogCard(obj[cardCounter]);
      cardCounter++;
      page.appendChild(card);
    }

    watchedCarousel.append(page);
  }  
}