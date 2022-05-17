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
const carouselPages = document.querySelectorAll(".js-catalog-carousel-page");
console.log(carouselPages);


let catalogData = 0;  //length of array of objects
let displayedCards = 12;  
let pageNumber = 0;

let carouselFullWidth = 0;
carousel.style.gridTemplateColumns = `repeat(${pageNumber}, 1fr)`;

let fullscreenWidth = screen.width;
console.log(fullscreenWidth);

let dataFile = "./data/productData.json";
let dataObj = undefined;

fetch (dataFile)
.then(response => response.json())
.then(function(json) {
  console.log("data length:", json.length);
  catalogData = json.length;
  console.log("cards to render:", catalogData);

  pageNumber = Math.ceil(catalogData / displayedCards);
  carouselFullWidth = 100*pageNumber + "%";
  carousel.style.width = carouselFullWidth;
  carousel.style.gridTemplateColumns = `repeat(${pageNumber}, 1fr)`;
  maxPageElem.textContent = pageNumber;

  fillCatalog(json);
});


function fillCatalog(obj) {
  dataObj = obj;

  let cardCounter = 0;

  for (let i = 0; i < pageNumber; i++) {
    let page = document.createElement("div");
    page.classList.add("catalog-carousel__page", 
    "js-catalog-carousel-page");

    for (let j = 0; j < displayedCards; j++) {
      if (cardCounter === catalogData) {
        break;
      }
      let card = createCatalogCard(dataObj[cardCounter]);
      cardCounter++;
      page.appendChild(card);
    }

    carousel.append(page);
  }
}

carousel.style.transform = `translateX(0px)`;

function CatalogSlider() {
  let _this = this;
  this.wrap = carousel;
  this.slidesNumber = pageNumber;
  this.sliderWidth = window.innerWidth;
  
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

  this.nextBtn = nextBtn;
  this.nextBtn.addEventListener("click", 
  _this.moveNext.bind(this), false);

  this.prevBtn = prevBtn;
  this.prevBtn.addEventListener("click",
  _this.movePrev.bind(this), false);

  this.pageCounterElem = currentPageElem; 
}

CatalogSlider.prototype.swipeStart = swipeStartFunction;
CatalogSlider.prototype.swipeMove = swipeMoveFunction;
CatalogSlider.prototype.swipeEnd = swipeEndFunction;
CatalogSlider.prototype.moveNext = moveNextFunction;
CatalogSlider.prototype.movePrev = movePrevFunctiion;

window.addEventListener("load", function() {
  let catalogSlider = new CatalogSlider();
  console.log(catalogSlider);
});