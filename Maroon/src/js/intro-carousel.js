"use strict";

import { createBestsellersCard } from "./fillers/bestsellers-filler.js";

import { swipeStartFunction } from "./touch-slider.js";
import { swipeMoveFunction } from "./touch-slider.js";
import { swipeEndFunction } from "./touch-slider.js";
import { moveNextFunction } from "./touch-slider.js";
import { movePrevFunctiion } from "./touch-slider.js";

const introPrevBtn = document.querySelector(".js-intro-carousel-prev-btn");
const introNextBtn = document.querySelector(".js-intro-carousel-next-btn");
const introCarousel = document.querySelector(".js-intro-carousel-inner");

let cardsNumber = 7;


const cardInnerWidth = window.innerWidth >= 768 ? 230 : 220;
const cardMargin = 30;

const introCarouselFullWidth = (cardsNumber > 0) ? cardInnerWidth + 
(cardInnerWidth + cardMargin)*(cardsNumber - 1) : 0;

introCarousel.style.width = introCarouselFullWidth + "px";

const introCarouselStep = cardInnerWidth + cardMargin;

introCarousel.style.transform = `translateX(0px)`;


let cards = [];

let dataFile = "./data/productData.json";
let dataObj = undefined;

fetch (dataFile)
.then(response => response.json())
.then( function(json) {
  dataObj = json;
  //console.log(dataObj);
  const main = document.querySelector(".main");
  for (let i = 0; i < cardsNumber; i++) {
    let card = createBestsellersCard(dataObj[i]);
    main.appendChild(card);
    introCarousel.appendChild(card);
  }
  cards = document.querySelectorAll(".intro-card");
});



/// touch
function IntroSlider() {
  let _this = this;
  this.wrap = introCarousel;
  this.slidesNumber = 7;
  this.sliderWidth = window.innerWidth >= 768 ? 260 : 250;
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

  this.trfRegExp = /([-0-9.]+(?=px))/;
  this.nextBtn = introNextBtn;
  this.nextBtn.addEventListener("click", 
  _this.moveNext.bind(this), false);
 
  this.prevBtn = introPrevBtn;
  this.prevBtn.addEventListener("click",
  _this.movePrev.bind(this), false);
}


IntroSlider.prototype.swipeStart = swipeStartFunction;
IntroSlider.prototype.swipeMove = swipeMoveFunction;
IntroSlider.prototype.swipeEnd = swipeEndFunction;
IntroSlider.prototype.moveNext = moveNextFunction;
IntroSlider.prototype.movePrev = movePrevFunctiion;

window.onload = function() {
  let introSlider = new IntroSlider();
  console.log(introSlider);
}

