"use strict";

const prevBtn = document.querySelector(".js-catalog-carousel-prev-btn");
const nextBtn = document.querySelector(".js-catalog-carousel-next-btn");

const carousel = document.querySelector(".js-catalog-carousel-inner");

//write calc function for defining carousel inners width and offset

let step = 25;
let carouselPos = 0;


//tmp 
let catalogData = 14;

let pageNumber = Math.ceil(catalogData / 12)

console.log({pageNumber});

let carouselFullWidth = 100*pageNumber + "%";

console.log({carouselFullWidth});

carousel.style.width = carouselFullWidth;
carousel.style.gridTemplateColumns = `repeat(${pageNumber}, 1fr)`;

let testStep = 100 / (pageNumber);
step = testStep;
console.log({testStep});

let currentPage = 1;
const currentPageElem = document.querySelector(".js-catalog-carousel-current-page");

nextBtn.addEventListener("click", moveCarousel.bind(null, -step))
prevBtn.addEventListener("click", moveCarousel.bind(null, step))

function moveCarousel(step) {
  if(checkCarouselPos(step)) {
    changeCurrentPageNumber(step);
    carouselPos += step;
  };
  console.log({carouselPos});
  carousel.style.transform = `translateX(${carouselPos}%)`;
}

function checkCarouselPos(step) {
  let tmpPos = carouselPos + step;
  if ((tmpPos > 0) || (tmpPos <= -100)) {
    console.log("overflow");
    return false;
  }
  return true;
}

function changeCurrentPageNumber(step) {
  if (step > 0) {
    currentPage--;
  } else {
    currentPage++;
  }
  currentPageElem.textContent = currentPage;
  console.log({currentPage});
}

