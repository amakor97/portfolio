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