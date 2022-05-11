"use strict";

import { handleCarousel } from "./carouselFunctions.js";
import { createCatalogCard } from "./fillers/catalogs-filler.js";

const prevBtn = document.querySelector(".js-catalog-carousel-prev-btn");
const nextBtn = document.querySelector(".js-catalog-carousel-next-btn");
const carousel = document.querySelector(".js-catalog-carousel-inner");
const currentPageElem = document.querySelector(".js-catalog-carousel-current-page");
const maxPageElem = document.querySelector(".js-catalog-carousel-max-page");
const carouselPages = document.querySelectorAll(".js-catalog-carousel-page");
console.log(carouselPages);


let catalogData = 24;  //length of array of objects
let displayedCards = 12;  
let pageNumber = Math.ceil(catalogData / displayedCards);
maxPageElem.textContent = pageNumber;

let carouselFullWidth = 100*pageNumber + "%";
carousel.style.width = carouselFullWidth;
carousel.style.gridTemplateColumns = `repeat(${pageNumber}, 1fr)`;


let step = 100 / pageNumber;
let carouselPos = 0;

const catalogCarousel = {
  "carElem": carousel,
  "carStep": step,
  "carPos": carouselPos,
  "carPageCounter": 1,
  "carPageCounterElem": currentPageElem,
}

nextBtn.addEventListener("click", 
handleCarousel.bind(null, catalogCarousel, "next"));
prevBtn.addEventListener("click", 
handleCarousel.bind(null, catalogCarousel, "prev"));



let fullscreenWidth = screen.width;
console.log(fullscreenWidth);


let dataFile = "./data/productData.json";
let dataObj = undefined;

fetch (dataFile)
.then(response => response.json())
.then( function(json) {
  fillCatalog(json);
});


function fillCatalog(obj) {
  dataObj = obj;
  //console.log(dataObj);

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