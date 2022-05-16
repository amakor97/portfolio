"use strict";

import { createBestsellersCard } from "./fillers/bestsellers-filler.js";

const introPrevBtn = document.querySelector(".js-intro-carousel-prev-btn");
const introNextBtn = document.querySelector(".js-intro-carousel-next-btn");
const introCarousel = document.querySelector(".js-intro-carousel-inner");

let cardsNumber = 7;



const cardInnerWidth = window.innerWidth >= 768 ? 230 : 220;
const cardMargin = 30;

const introCarouselFullWidth = (cardsNumber > 0) ? cardInnerWidth + (cardInnerWidth + cardMargin)*(cardsNumber - 1) : 0;
//console.log(introCarouselFullWidth);

introCarousel.style.width = introCarouselFullWidth + "px";

const introCarouselStep = cardInnerWidth + cardMargin;
//console.log(introCarouselStep);
let introCarouselPos = 0;
let slideIndex = 0;

let leftCard = 1;

introCarousel.style.transform = `translateX(0px)`;

introNextBtn.addEventListener("click", function() {
  if (slideIndex < (cardsNumber -1)) {
    let style = introCarousel.style.transform;
    let transform = +style.match(touchIntro.trfRegExp)[0];
    transform -= introCarouselStep;
    introCarousel.style.transform = `translateX(${transform}px)`;
    leftCard++;
    slideIndex++;
    //console.log({slideIndex});
  }
})

introPrevBtn.addEventListener("click", function() {
  if (slideIndex > 0) {
    let style = introCarousel.style.transform;
    let transform = +style.match(touchIntro.trfRegExp)[0];
    transform += introCarouselStep;
    introCarousel.style.transform = `translateX(${transform}px)`;
    leftCard--;
    slideIndex--;
  }
})

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


let touchIntro = {
  carousel: introCarousel,
  allowSwipe: true,
  transition: true,
  step: introCarouselStep,
  nextTrf: 0,
  prevTrf: 0,
  posInit: 0,
  posX1: 0,
  posX2: 0,
  posY1: 0,
  posY2: 0,
  posFinal: 0,
  trfRegExp: /([-0-9.]+(?=px))/,
  isSwipe: false,
  isScroll: false,
  lastTrf: ((cardsNumber-1) * introCarouselStep),
  posThreshold: 30
}

function IntroSlider(id) {
  let _this = this;
  this.wrap = document.getElementById(id);
  this.sliderWidth = 250;
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
}

IntroSlider.prototype.swipeStart = function(e) {
  console.log("started");
  let _this = this;
  e = e || window.event;
  //e.preventDefault();
  this.startX = e.changedTouches[0].pageX;
  console.log("touched X:", this.startX);
  this.sLeft = this.wrap.style.transform ? 
  -parseInt(/\d+/.exec(this.wrap.style.transform)[0]) : 0;
  this.wrap.style.transition = "none";
}

IntroSlider.prototype.swipeMove = function(e) {
  console.log("moving");
  e = e || window.event;
  this.disX = e.changedTouches[0].pageX - this.startX;
  this.curLeft = this.disX + this.sLeft;
  console.log("disX", this.disX);
  this.wrap.style.transform = `translateX(${this.curLeft}px)`; 
}

IntroSlider.prototype.swipeEnd = function(e) {
  console.log("ending");
  console.log("disX", this.disX);
  if (this.disX > 50) {
    if (this.index !== 0) {
      this.index -= 1;
    }
  }
  if (this.disX < -50) {
    if (this.index < (cardsNumber - 1)) {
      this.index += 1;
    }
  }

  console.log("new index:", this.index);
  console.log(this.disX);
  console.log("sliderWidth:", this.sliderWidth);
  this.wrap.style.transition = "0.5s";
  let newPos = -this.index*this.sliderWidth;
  console.log("new pos:", newPos);

  this.wrap.style.transform = `translateX(${newPos}px)`;
}

window.onload = function() {
  let introSlider = new IntroSlider("intro-carousel-id");
  console.log(introSlider);
}

function blockCards(arr) {
  arr.forEach(function(obj) {
    obj.style.userSelect = "none";
    obj.style.pointerEvents = "none";
  })
}

function unblockCards(arr) {
  arr.forEach(function(obj) {
    //obj.style.userSelect = "all";
    obj.style.pointerEvents = "all";
  })
}

