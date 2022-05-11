"use strict";

import { createBestsellersCard } from "./fillers/bestsellers-filler.js";

const introPrevBtn = document.querySelector(".js-intro-carousel-prev-btn");
const introNextBtn = document.querySelector(".js-intro-carousel-next-btn");
const introCarousel = document.querySelector(".js-intro-carousel-inner");

let cardsNumber = 7;

const cardInnerWidth = 230;
const cardMargin = 30;

const introCarouselFullWidth = (cardsNumber > 0) ? cardInnerWidth + (cardInnerWidth + cardMargin)*(cardsNumber - 1) : 0;
console.log(introCarouselFullWidth);

introCarousel.style.width = introCarouselFullWidth + "px";

const introCarouselStep = cardInnerWidth + cardMargin;
console.log(introCarouselStep);
let introCarouselPos = 0;

let leftCard = 1;

introNextBtn.addEventListener("click", function() {
  if (leftCard < cardsNumber) {
    introCarouselPos -= introCarouselStep;
    introCarousel.style.transform = `translateX(${introCarouselPos}px)`;
    leftCard++;
  }
})

introPrevBtn.addEventListener("click", function() {
  if (leftCard > 1) {
    introCarouselPos += introCarouselStep;
    introCarousel.style.transform = `translateX(${introCarouselPos}px)`;
    leftCard--;
  }
})



let dataFile = "./data/productData.json";
let dataObj = undefined;

fetch (dataFile)
.then(response => response.json())
.then( function(json) {
  dataObj = json;
  console.log(dataObj);
  const main = document.querySelector(".main");
  for (let i = 0; i < cardsNumber; i++) {
    let card = createBestsellersCard(dataObj[i]);
    main.appendChild(card);
    introCarousel.appendChild(card);
  }
});

