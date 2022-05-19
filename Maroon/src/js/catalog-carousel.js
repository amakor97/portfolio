"use strict";

import { createCatalogCard } from "./fillers/catalogs-filler.js";

import { swipeStartFunction } from "./touch-slider.js";
import { swipeMoveFunction } from "./touch-slider.js";
import { swipeEndFunction } from "./touch-slider.js";
import { moveNextFunction } from "./touch-slider.js";
import { movePrevFunctiion } from "./touch-slider.js";

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

let dataFilePath = "./data/productData.json";


fetch (dataFilePath)
.then(response => response.json())
.then(function(json) {
  catalogDataLength = json.length;
  pageNumber = Math.ceil(catalogDataLength / cardsOnPage);
  maxPageElem.textContent = pageNumber;

  carouselFullWidth = `${100*pageNumber}%`;
  carousel.style.width = carouselFullWidth;
  carousel.style.gridTemplateColumns = `repeat(${pageNumber}, 1fr)`;

  let catalogSlider = new CatalogSlider();
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


function CatalogSlider() {
  this.wrap = carousel;
  this.slidesNumber = pageNumber;
  this.sliderWidth = Math.min(1400, window.innerWidth);
  
  this.startX = 0;
  this.sLeft = 0;
  this.index = 0;
  this.curLeft = 0;
  this.disX = 0;

  this.wrap.addEventListener("touchstart", this.swipeStart.bind(this));
  document.addEventListener("touchmove", this.swipeMove.bind(this));
  document.addEventListener("touchend", this.swipeEnd.bind(this));

  this.isSwipe = false;
  this.isScroll = false;
  this.posX1 = 0;
  this.posX2 = 0;
  this.posY1 = 0;
  this.posY2 = 0;

  this.nextBtn = nextBtn;
  this.nextBtn.addEventListener("click", this.moveNext.bind(this));
  this.prevBtn = prevBtn;
  this.prevBtn.addEventListener("click", this.movePrev.bind(this));

  this.pageCounterElem = currentPageElem; 
}

CatalogSlider.prototype.swipeStart = swipeStartFunction;
CatalogSlider.prototype.swipeMove = swipeMoveFunction;
CatalogSlider.prototype.swipeEnd = swipeEndFunction;
CatalogSlider.prototype.moveNext = moveNextFunction;
CatalogSlider.prototype.movePrev = movePrevFunctiion;
