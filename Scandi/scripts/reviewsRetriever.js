"use strict";



//retrieve reviews from "remote" sourse and display them

let reviewsData = undefined;

function getReviewsData() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    reviewsData = JSON.parse(this.responseText);
    prepareReviewTexts();
    fillReview(currentReview)
  }
  xhr.open("GET", "./data/reviewsData.json", true);
  xhr.send();
}

getReviewsData();

function prepareReviewTexts() {
  reviewsData.forEach(function(review) {
    review.text = "«" + review.text.replace(/\n/g, "<br /><br />") + "»";
  })
}


const author = document.querySelector(".js-review-author");
const text = document.querySelector(".js-review-text");
const pic1 = document.querySelector(".js-review-pic1");
const pic2 = document.querySelector(".js-review-pic2");

const review = document.querySelector(".review");
const prevBtn = document.querySelector(".js-reviews-prev-btn");
const nextBtn = document.querySelector(".js-reviews-next-btn");

let currentReview = 0;

//window.addEventListener("DOMContentLoaded", fillReview(currentReview));

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
  
  review.classList.add("review_hidden");
  setTimeout(function() {
    fillReview(currentReview);
    review.classList.remove("review_hidden");
  }, 500);
})

prevBtn.addEventListener("click", function() {
  currentReview--;
  if (currentReview < 0) {
    currentReview = reviewsData.length - 1;
  }

  review.classList.add("review_hidden");
  setTimeout(function() {
    fillReview(currentReview);
    review.classList.remove("review_hidden");
  }, 500);
})