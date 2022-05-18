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

let fullScreenWidth = window.innerWidth;
console.log({fullScreenWidth});

console.log(fullScreenWidth >= 768);

let watchedData = 0;  //length of array of objects
let watchedDisplayedCards = (fullScreenWidth >= 768) ? 4 : 1;
let watchedPageNumber = 0;

let watchedCarouselFullWidth = 0;
watchedCarousel.style.gridTemplateColumns = `repeat(${watchedPageNumber}, 1fr)`;


let dataFile = "./data/productData.json";
let dataObj = undefined;

fetch (dataFile)
.then(response => response.json())
.then(function(json) {
  dataObj = json;
  //console.log(dataObj);
  console.log("watched json length:", json.length);
  watchedData = 8; // = json.length;
  console.log("watched cards to render:", watchedData);

  watchedPageNumber = Math.ceil(watchedData / watchedDisplayedCards);

  watchedCarouselFullWidth = 100*watchedPageNumber + "%";
  watchedCarousel.style.width = watchedCarouselFullWidth;
  watchedCarousel.style.gridTemplateColumns = `repeat(${watchedPageNumber}, 1fr)`;
  watchedMaxPageElem.textContent = watchedPageNumber;

  let watchedSlider = new WatchedSlider();
  console.log(watchedSlider);

  fillWatchedCarousel(json);
});

function fillWatchedCarousel(obj) {
  dataObj = obj;
  let cardCounter = 0;

  for (let i = 0; i < watchedPageNumber; i++) {
    let page = document.createElement("div");
    page.classList.add("sub-carousel__page", 
    "js-sub-carousel-page");

    for (let j = 0; j < watchedDisplayedCards; j++) {
      if (cardCounter === watchedData) {
        break;
      }
      let card = createCatalogCard(dataObj[cardCounter]);
      cardCounter++;
      page.appendChild(card);
    }

    watchedCarousel.append(page);
  }  
}

function WatchedSlider() {
  let _this = this;
  this.wrap = watchedCarousel;
  this.slidesNumber = watchedPageNumber;
  this.sliderWidth = Math.min(1400, window.innerWidth);
  
  this.startX = 0;
  this.sLeft = 0;
  this.index = 0;
  this.curLeft = 0;
  this.disX = 0;

  this.wrap.addEventListener("touchstart", function() {
    _this.swipeStart();
  }, false);
  document.addEventListener("touchmove", 
  _this.swipeMove.bind(this), false);
  document.addEventListener("touchend",
  _this.swipeEnd.bind(this), false);

  this.isSwipe = false;
  this.isScroll = false;
  this.posX1 = 0;
  this.posX2 = 0;
  this.posY1 = 0;
  this.posY2 = 0;

  this.nextBtn = watchedNextBtn;
  this.nextBtn.addEventListener("click", 
  _this.moveNext.bind(this), false);

  this.prevBtn = watchedPrevBtn;
  this.prevBtn.addEventListener("click",
  _this.movePrev.bind(this), false);

  this.pageCounterElem = watchedCurrentPageElem; 
}

WatchedSlider.prototype.swipeStart = swipeStartFunction;
WatchedSlider.prototype.swipeMove = swipeMoveFunction;
WatchedSlider.prototype.swipeEnd = swipeEndFunction;
WatchedSlider.prototype.moveNext = moveNextFunction;
WatchedSlider.prototype.movePrev = movePrevFunctiion;

window.addEventListener("load", function() {
  //let watchedSlider = new WatchedSlider();
  //console.log(watchedSlider);
});