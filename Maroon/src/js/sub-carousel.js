"use strict";

const subPrevBtn = document.querySelector(".js-watched-carousel-prev-btn");
const subNextBtn = document.querySelector(".js-watched-carousel-next-btn");

const subCarousel = document.querySelector(".js-watched-carousel-inner");

let watchedData = 4;
let displayedCards = 1;

let subPageNumber = Math.ceil(watchedData / displayedCards);
console.log({subPageNumber});

const subCarouselFullWidth = 100*subPageNumber + "%";
console.log({subCarouselFullWidth});

subCarousel.style.width = subCarouselFullWidth;
subCarousel.style.gridTemplateColumns = `repeat(${subPageNumber}, 1fr)`;

let subStep = 100 / subPageNumber;
console.log({subStep});


subNextBtn.addEventListener("click", function() {
  moveSubCarousel(-subStep);
})

subPrevBtn.addEventListener("click", function() {
  moveSubCarousel(subStep);
});

let subCarouselPos = 0;

function moveSubCarousel(step) {
  if (checkSubCarouselPos(step)) {
    subChangeCurrentPageNumber(step);
    subCarouselPos += step;
  }
  
  subCarousel.style.transform = `translateX(${subCarouselPos}%)`;
}

function checkSubCarouselPos(step) {
  console.log({step});
  let tmpPos = subCarouselPos + step;
  if ((tmpPos > 0) || (tmpPos <= -100)) {
    console.log("overflow sub");
    return false;
  }
  return true;
}

let subCurrentPage = 1;
const subCurrentPageElem = document.querySelector(".js-watched-carousel-current-page");


function subChangeCurrentPageNumber(step) {
  if (step > 0) {
    subCurrentPage--;
  } else {
    subCurrentPage++;
  }
  subCurrentPageElem.textContent = subCurrentPage;
  console.log({subCurrentPage});
}