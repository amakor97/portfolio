"use strict";

import { createCatalogCard } from "./fillers/catalogs-filler.js";
import { SliderObj } from "./touch-slider.js";

const prevBtn = document.querySelector(".js-catalog-carousel-prev-btn");
const nextBtn = document.querySelector(".js-catalog-carousel-next-btn");
const carousel = document.querySelector(".js-catalog-carousel-inner");
const currentPageElem = document.querySelector(".js-catalog-carousel-current-page");
const maxPageElem = document.querySelector(".js-catalog-carousel-max-page");

let catalogDataLength = 0;  
const cardsOnPage = 12;
const cardsOnRow = (window.innerWidth >= 1366) ? 4 
  : (window.innerWidth >= 768) ? 2 
  : 1;
const rowNumber = Math.ceil(cardsOnPage / cardsOnRow);
let pageNumber = 0;
let carouselFullWidth = 0;
carousel.style.transform = `translateX(0px)`;

const dataFilePath = "./data/productData.json";


fetch (dataFilePath)
.then(response => response.json())
.then(function(json) {
  catalogDataLength = json.length;
  pageNumber = Math.ceil(catalogDataLength / cardsOnPage);
  maxPageElem.textContent = pageNumber;

  carouselFullWidth = `${100*pageNumber}%`;
  carousel.style.width = carouselFullWidth;
  carousel.style.gridTemplateColumns = `repeat(${pageNumber}, 1fr)`;

  let catalogSlider = new SliderObj(
    carousel, pageNumber,
    Math.min(1400, window.innerWidth), 
    nextBtn, prevBtn, currentPageElem
  );

  fillCatalog(json);
});


function fillCatalog(obj) {
  let cardCounter = 0;

  for (let i = 0; i < pageNumber; i++) {
    let page = document.createElement("div");
    page.classList.add("catalog-carousel__page", 
      "js-catalog-carousel-page");
    page.style.gridTemplateRows = `repeat(${rowNumber}, 1fr)`

    for (let j = 0; j < cardsOnPage; j++) {
      if (cardCounter === catalogDataLength) {
        break;
      }
      let card = createCatalogCard(obj[cardCounter]);
      cardCounter++;
      page.appendChild(card);
    }

    carousel.append(page);
  }
}