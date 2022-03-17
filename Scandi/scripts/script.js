"use strict";



//setting up overlays on hovers events over works containers

let workWrappers = document.querySelectorAll(".js-work-wrapper");

workWrappers.forEach(function(wrapper) {
  let overlay = wrapper.querySelector(".js-wrapper-overlay");
  
  if (overlay) {
    wrapper.addEventListener("mouseover", function() {
      overlay.classList.add("works__img-overlay_visible");
    })
    wrapper.addEventListener("mouseleave", function() {
      overlay.classList.remove("works__img-overlay_visible");
    })
  }
})



//change review arrows color on hover

let arrowBtns = document.querySelectorAll(".reviews__arrow");

arrowBtns.forEach(function(btn) {
  let svgArrow = btn.querySelector(".reviews__arrow-svg");
  
  if (svgArrow) {
    btn.addEventListener("mouseover", function() {
      svgArrow.classList.add("reviews__arrow-svg_hover");
    })
    btn.addEventListener("mouseleave", function() {
      svgArrow.classList.remove("reviews__arrow-svg_hover");
    })
  }
})



// calculating reviews section margin for setting exactly the same
// margin-left on application section

const reviewsContainer = document.querySelector(".reviews__container");
const reviewsContainerStyle = getComputedStyle(reviewsContainer);
const applicationContainer = document.querySelector(".application__container");


function applicationMarginHandle() {
  let reviewsContainerLeftMargin = reviewsContainerStyle.marginLeft;
  applicationContainer.style.marginLeft = reviewsContainerLeftMargin;
}


window.addEventListener("resize", applicationMarginHandle);
window.addEventListener("load", applicationMarginHandle);



//retrieve reviews from "remote" sourse and display them

let reviewsData = undefined;

function getReviewsData() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    reviewsData = JSON.parse(this.responseText);
  }
  xhr.open("GET", "./data/reviewsData.json", false);
  xhr.send();
}

getReviewsData();

reviewsData.forEach(function(review) {
  review.text = "«" + review.text.replace(/\n/g, "<br /><br />") + "»";
})


const author = document.querySelector(".js-review-author");
const text = document.querySelector(".js-review-text");
const pic1 = document.querySelector(".js-review-pic1");
const pic2 = document.querySelector(".js-review-pic2");

const prevBtn = document.querySelector(".js-reviews-prev-btn");
const nextBtn = document.querySelector(".js-reviews-next-btn");

let currentReview = 0;

window.addEventListener("DOMContentLoaded", fillReview(currentReview));

function fillReview(number) {
  const review = reviewsData[number];
  pic1.src = review.pic1;
  pic2.src = review.pic2;
  text.innerHTML = review.text;
  author.textContent = review.name;
}


nextBtn.addEventListener("click", function() {
  currentReview++;
  if (currentReview > reviewsData.length - 1) {
    currentReview = 0;
  }
  fillReview(currentReview);
})

prevBtn.addEventListener("click", function() {
  currentReview--;
  if (currentReview < 0) {
    currentReview = reviewsData.length - 1;
  }
  fillReview(currentReview);
})
