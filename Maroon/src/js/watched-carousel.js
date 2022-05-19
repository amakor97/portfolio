"use strict";

import { createCatalogCard } from "./fillers/catalogs-filler.js";

import { swipeStartFunction } from "./touch-slider.js";
import { swipeMoveFunction } from "./touch-slider.js";
import { swipeEndFunction } from "./touch-slider.js";
import { moveNextFunction } from "./touch-slider.js";
import { movePrevFunctiion } from "./touch-slider.js";

const watchedPrevBtn = document.querySelector(".js-watched-carousel-prev-btn");
const watchedNextBtn = document.querySelector(".js-watched-carousel-next-btn");
const watchedCarousel = document.querySelector(".js-watched-carousel-inner");
const watchedCurrentPageElem = document.querySelector(".js-watched-carousel-current-page");
const watchedMaxPageElem = document.querySelector(".js-watched-carousel-max-page");

let watchedData = 0;  
let watchedCardsOnPage = (window.innerWidth >= 768) ? 4 : 1;
let watchedPageNumber = 0;

let watchedCarouselFullWidth = 0;

let watchedDataFilePath = "./data/productData.json";

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

  let watchedSlider = new WatchedSlider();

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

function WatchedSlider() {
  this.wrap = watchedCarousel;
  this.slidesNumber = watchedPageNumber;
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

  this.nextBtn = watchedNextBtn;
  this.nextBtn.addEventListener("click", this.moveNext.bind(this));
  this.prevBtn = watchedPrevBtn;
  this.prevBtn.addEventListener("click", this.movePrev.bind(this));

  this.pageCounterElem = watchedCurrentPageElem; 
}

WatchedSlider.prototype.swipeStart = swipeStartFunction;
WatchedSlider.prototype.swipeMove = swipeMoveFunction;
WatchedSlider.prototype.swipeEnd = swipeEndFunction;
WatchedSlider.prototype.moveNext = moveNextFunction;
WatchedSlider.prototype.movePrev = movePrevFunctiion;
