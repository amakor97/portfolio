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

const review = document.querySelector(".review");
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
  
  review.classList.add("review_hidden");
  setTimeout(function() {
    fillReview(currentReview);
    review.classList.remove("review_hidden");
  }, 250);
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
  }, 250);
})



//make background and height for header at defined scroll height

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");

window.addEventListener("DOMContentLoaded", scrollClassHandle);
window.addEventListener("scroll", scrollClassHandle);

function scrollClassHandle() {
  setTimeout(function() {
    if (window.scrollY > window.innerHeight/4) {
      header.classList.add("header_backgrounded");
      setTimeout(function() {
        nav.classList.add("nav_small-height");
    }, 650);
  } else {
      if (!isVerticalMenuShowed) {
        setTimeout(function() {
          if (window.scrollY < window.innerHeight/4) {
          header.classList.remove("header_backgrounded");
          }
        }, 500);
        
        setTimeout(function() {
          nav.classList.remove("nav_small-height");
          }, 650);
        }
      }
    }, 50);
}



//scroll handler

const breakpointWidth = 768; //really need?

const links = document.querySelectorAll(".js-section-link");
const fakeHeader = document.querySelector(".header-fake");

links.forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    let href = e.currentTarget.getAttribute("href");
    let targetSection = document.getElementById(href.slice(1));
    let posY = targetSection.offsetTop;

    let headerHeight = fakeHeader.offsetHeight;
    if (!header.classList.contains("header_backgrounded")) {
      header.classList.add("header_backgrounded");
      setTimeout(function() {
        window.scrollTo({
          left: 0, top: posY - headerHeight
        });
      }, 200);
    } else {
      window.scrollTo({
        left: 0, top: posY - headerHeight
      });
    }
  })
})



//mobile menu

const menuSwitcher = document.querySelector("#toggle-menu-btn");
const verticalMenu = document.querySelector("#verticalMenuId");
const verticalLinks = document.querySelectorAll(".js-vertical-nav-link");

let isVerticalMenuShowed = false;

menuSwitcher.addEventListener("click", function() {
  isVerticalMenuShowed = !isVerticalMenuShowed;
  if (isVerticalMenuShowed) {
    header.classList.add("header_backgrounded");
  } else if (window.scrollY < window.innerHeight/4) {
    setTimeout(function() {
      header.classList.remove("header_backgrounded");
    }, 500);
  }

  
/*
  if (!header.classList.contains("header_backgrounded")) {
    header.classList.add("header_backgrounded");
  } else if (window.scrollY < window.innerHeight/4) {
    setTimeout(function() {
      header.classList.remove("header_backgrounded");
    }, 500);
  }
  */
  
  nav.classList.toggle("nav_vertical-showed");
  verticalMenu.classList.toggle("nav-vertical_showed");
})


verticalLinks.forEach(function(link) {
  link.addEventListener("click", function() {
    
  isVerticalMenuShowed = false;
    setTimeout(function() {
      
      nav.classList.remove("nav_vertical-showed");
    }, 700);

    setTimeout(function() {
      verticalMenu.classList.remove("nav-vertical_showed");
    }, 600);
  })
})


window.addEventListener("resize", function() {
  if (this.innerWidth >= 900) {
    if ((window.scrollY < window.innerHeight/4) && (header.classList.contains("header_backgrounded"))) {
      setTimeout(function() {
      header.classList.remove("header_backgrounded");
      nav.classList.remove("nav_vertical-showed");
      verticalMenu.classList.remove("nav-vertical_showed");
    }, 500);
  }
  } else {
    if (nav.classList.contains("nav_vertical-showed")) {
      header.classList.add("header_backgrounded");
    }
  }
})



//clickable images

const main = document.querySelector(".main");

let images = document.querySelectorAll(".js-clickable-img");
images.forEach(function(img) {
  img.addEventListener("click", function() {
    createModalImage(this.src);
  })
})

let imageWorks = document.querySelectorAll(".js-clickable-work");
imageWorks.forEach(function(imageWork) {
  imageWork.addEventListener("click", function() {
    let image = imageWork.querySelector(".js-clickable-img-work");
    createModalImage(image.src);
  })
})


function createModalImage(src) {
  let modalContainer = document.createElement("div");
  modalContainer.classList.add("modal");
  modalContainer.addEventListener("click", function() {
    main.removeChild(modalContainer);
  })
  main.appendChild(modalContainer);

  let modalImg = document.createElement("img");
  modalImg.classList.add("modal__img");
  modalImg.src = src;
  modalContainer.appendChild(modalImg);
}



