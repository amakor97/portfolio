"use strict";

import { createBestsellersCard } from "./fillers/bestsellers-filler.js";
import { SliderObj } from "./touch-slider.js";

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

  let introSlider = new SliderObj(
    introCarousel, cardsNumber,
    (cardInnerWidth + cardMargin),
    introNextBtn, introPrevBtn
  )

  fillIntroCarousel(json);
});


function fillIntroCarousel(obj) {
  for (let i = 0; i < cardsNumber; i++) {
    let card = createBestsellersCard(obj[i]);
    introCarousel.appendChild(card);
  }
}
