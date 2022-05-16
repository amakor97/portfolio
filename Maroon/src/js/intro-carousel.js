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

  //blocking swipe or scroll
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

IntroSlider.prototype.moveNext = function() {
  let _this = this;
  console.log("clicked, current index:", _this.index);
  if (_this.index < (cardsNumber - 1)) {
    let style = _this.wrap.style.transform;
    let transform = +style.match(_this.trfRegExp)[0];
    transform -= _this.sliderWidth;
    _this.wrap.style.transform = `translateX(${transform}px)`;
    _this.index++;
  }
}

IntroSlider.prototype.movePrev = function() {
  let _this = this;
  console.log("clicked, current index:", _this.index); 
  if (_this.index > 0) {
    let style = _this.wrap.style.transform;
    let transform = +style.match(_this.trfRegExp)[0];
    transform += _this.sliderWidth;
    _this.wrap.style.transform = `translateX(${transform}px)`;
    _this.index--;
  }
}


IntroSlider.prototype.swipeStart = swipeStartFunction;
IntroSlider.prototype.swipeMove = swipeMoveFunction;
IntroSlider.prototype.swipeEnd = swipeEndFunction;

window.onload = function() {
  let introSlider = new IntroSlider();
  console.log(introSlider);
}



function swipeStartFunction(e) {
  console.log("started function");
  let _this = this;
  e = e || window.event;
  this.disX = 0;
  //e.preventDefault();
  this.startX = e.changedTouches[0].pageX;
  console.log("touched X:", this.startX);
  this.sLeft = this.wrap.style.transform ? 
  -parseInt(/\d+/.exec(this.wrap.style.transform)[0]) : 0;
  this.wrap.style.transition = "none";

  this.posX1 = e.changedTouches[0].pageX;
  this.posY1 = e.changedTouches[0].pageY;
}

function swipeMoveFunction(e) {
  this.posX2 = this.posX1 - e.changedTouches[0].pageX;
  this.posX1 = e.changedTouches[0].pageX;

  this.posY2 = this.posY1 - e.changedTouches[0].pageY;
  this.posY1 = e.changedTouches[0].pageY;

  if (!this.isSwipe && !this.isScroll) {
  
    let posY = Math.abs(this.posY2);
    if ((posY > 4) || (this.posX2 === 0)) {
      this.isScroll = true;
    } else if (posY < 4) {
      this.isSwipe = true;
    }

    console.log(this.isScroll, this.isSwipe);
  }


  if (this.isSwipe) {
    console.log("moving");
    e = e || window.event;
    this.disX = e.changedTouches[0].pageX - this.startX;
    this.curLeft = this.disX + this.sLeft;
    this.wrap.style.transform = `translateX(${this.curLeft}px)`; 
  } else {
    console.log("scrolling");
  }
}

function swipeEndFunction(e) {
  console.log("ending");

  this.isScroll = false;
  this.isSwipe = false;

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

  this.wrap.style.transition = "0.5s";
  let newPos = -this.index*this.sliderWidth;

  this.wrap.style.transform = `translateX(${newPos}px)`;
}