"use strict";

import { createCatalogCard } from "./fillers/catalogs-filler.js";

import { swipeStartFunction } from "./touch-slider.js";
import { swipeMoveFunction } from "./touch-slider.js";
import { swipeEndFunction } from "./touch-slider.js";
import { moveNextFunction } from "./touch-slider.js";
import { movePrevFunctiion } from "./touch-slider.js";

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

  let alsoSlider = new AlsoSlider();
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

function AlsoSlider() {
  let _this = this;
  this.wrap = alsoCarousel;
  this.slidesNumber = alsoPageNumber;
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

  this.nextBtn = alsoNextBtn;
  this.nextBtn.addEventListener("click", 
  _this.moveNext.bind(this), false);

  this.prevBtn = alsoPrevBtn;
  this.prevBtn.addEventListener("click",
  _this.movePrev.bind(this), false);

  this.pageCounterElem = alsoCurrentPageElem;
}

AlsoSlider.prototype.swipeStart = swipeStartFunction;
AlsoSlider.prototype.swipeMove = swipeMoveFunction;
AlsoSlider.prototype.swipeEnd = swipeEndFunction;
AlsoSlider.prototype.moveNext = moveNextFunction;
AlsoSlider.prototype.movePrev = movePrevFunctiion;
