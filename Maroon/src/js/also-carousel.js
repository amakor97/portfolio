"use strict";

import { createCatalogCard } from "./fillers/catalogs-filler.js";
import { SliderObj } from "./touch-slider.js";

const alsoPrevBtn = document.querySelector(".js-also-carousel-prev-btn");
const alsoNextBtn = document.querySelector(".js-also-carousel-next-btn");
const alsoCarousel = document.querySelector(".js-also-carousel-inner");
const alsoCurrentPageElem = document.querySelector(".js-also-carousel-current-page");
const alsoMaxPageElem = document.querySelector(".js-also-carousel-max-page");

let alsoData = 0;
const alsoDisplayedCards = (window.innerWidth >= 768) ? 4 : 1;
let alsoPageNumber = 0;
let alsoCarouselFullWidth = 0;
let dataFile = "../data/productData.json";


fetch (dataFile)
.then(response => response.json())
.then(function(json) {
  alsoData = 8;
  alsoPageNumber = Math.ceil(alsoData / alsoDisplayedCards);
  alsoMaxPageElem.textContent = alsoPageNumber;

  alsoCarouselFullWidth = 100*alsoPageNumber + "%";
  alsoCarousel.style.width = alsoCarouselFullWidth;
  alsoCarousel.style.gridTemplateColumns = `repeat(${alsoPageNumber}, 1fr)`;

  let alsoSlider = new SliderObj(
    alsoCarousel, alsoPageNumber,
    Math.min(1400, window.innerWidth),
    alsoNextBtn, alsoPrevBtn, alsoCurrentPageElem
  )

  fillAlsoCarousel(json);
});


function fillAlsoCarousel(obj) {
  let cardCounter = 0;
  
  for (let i = 0; i < alsoPageNumber; i++) {
    let page = document.createElement("div");
    page.classList.add("sub-carousel__page", 
      "js-sub-carousel-page");

    for (let j = 0; j < alsoDisplayedCards; j++) {
      if (cardCounter === alsoData) {
        break;
      }
      let card = createCatalogCard(obj[cardCounter], true);
      cardCounter++;
      page.appendChild(card);
    }

    alsoCarousel.append(page);
  }
}