"use strict";


import { isVerticalMenuShowed } from "./mobileMenu.js";


//make background and height for header at defined scroll height

const nav = document.querySelector(".nav");

window.addEventListener("DOMContentLoaded", scrollClassHandle);
window.addEventListener("scroll", scrollClassHandle);

function scrollClassHandle() {
  const header = document.querySelector(".header");
  setTimeout(function() {
    if (window.scrollY > window.innerHeight/6) {
      header.classList.add("header_backgrounded");
      setTimeout(function() {
        nav.classList.add("nav_small-height");
      }, 650);
    } else {
      if (!isVerticalMenuShowed) {
        setTimeout(function() {
          if ((window.scrollY < window.innerHeight/4) && (!isVerticalMenuShowed)){
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


const links = document.querySelectorAll(".js-section-link");
const fakeHeader = document.querySelector(".header-fake");

links.forEach(function(link) {
  const header = document.querySelector(".header");
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