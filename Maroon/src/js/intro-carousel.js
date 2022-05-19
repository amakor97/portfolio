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

let cardsNumber = 0;
const cardInnerWidth = window.innerWidth >= 768 ? 230 : 220;
const cardMargin = 30;
let introCarouselFullWidth = 0;
introCarousel.style.transform = `translateX(0px)`;

const dataFilePath = "./data/productData.json";

fetch (dataFilePath)
.then(response => response.json())
.then(function(json) {
  cardsNumber = 7;
  introCarouselFullWidth = (cardsNumber > 0) ? cardInnerWidth + 
  (cardInnerWidth + cardMargin)*(cardsNumber - 1) : 0;
  introCarousel.style.width = `${introCarouselFullWidth}px`;

  let introSlider = new IntroSlider();
  fillIntroCarousel(json);
});


function fillIntroCarousel(obj) {
  for (let i = 0; i < cardsNumber; i++) {
    let card = createBestsellersCard(obj[i]);
    introCarousel.appendChild(card);
  }
}


function IntroSlider() {
  this.wrap = introCarousel;
  this.slidesNumber = cardsNumber;
  this.sliderWidth = cardInnerWidth + cardMargin;

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

  this.nextBtn = introNextBtn;
  this.nextBtn.addEventListener("click", this.moveNext.bind(this));
  this.prevBtn = introPrevBtn;
  this.prevBtn.addEventListener("click", this.movePrev.bind(this));
}

IntroSlider.prototype.swipeStart = swipeStartFunction;
IntroSlider.prototype.swipeMove = swipeMoveFunction;
IntroSlider.prototype.swipeEnd = swipeEndFunction;
IntroSlider.prototype.moveNext = moveNextFunction;
IntroSlider.prototype.movePrev = movePrevFunctiion;
