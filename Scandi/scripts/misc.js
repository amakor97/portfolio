"use strict";



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
  modalImg.addEventListener("keydown", function(e) {
    console.log(e.key);
    if ((e.key == "Enter") || (e.key == " ")) {
    main.removeChild(modalContainer);
    }
  })
  
  modalImg.src = src;
  modalImg.tabIndex = "5";
  modalContainer.appendChild(modalImg);
}



window.addEventListener("DOMContentLoaded", function() {
  const heroBgColor = document.querySelector(".intro__background-color");
  heroBgColor.classList.add("intro__background-color_hidden");
  setTimeout(function() {
    heroBgColor.style.zIndex = "0";
  }, 250)
})


