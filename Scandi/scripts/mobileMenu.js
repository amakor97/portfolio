"use strict";



//mobile menu

const menuSwitcher = document.querySelector("#toggle-menu-btn");
const verticalMenu = document.querySelector("#verticalMenuId");
const verticalLinks = document.querySelectorAll(".js-vertical-nav-link");

export let isVerticalMenuShowed = false;

menuSwitcher.addEventListener("click", function() {
  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav");

  isVerticalMenuShowed = !isVerticalMenuShowed;
  if (isVerticalMenuShowed) {
    header.classList.add("header_backgrounded");
    nav.classList.add("nav_vertical-showed");
    verticalMenu.classList.add("nav-vertical_showed");
  } else {
    verticalMenu.classList.remove("nav-vertical_showed");
    setTimeout(function() {
      nav.classList.remove("nav_vertical-showed");
    }, 100);

    if (window.scrollY < window.innerHeight/4) {
      setTimeout(function() {
        header.classList.remove("header_backgrounded");
      }, 500);
    }
  }
})



//close vertical nav after clicking on one of vertical links; delay should be
//enough for page scrolling stops

verticalLinks.forEach(function(link) {
  const nav = document.querySelector(".nav");
  
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



//close vertical nav if window width is bigger then breakpoint
const breakpointWidth = 900;


window.addEventListener("resize", function() {
  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav");

  if (this.innerWidth >= breakpointWidth) {
    if ((window.scrollY < window.innerHeight/4) && (isVerticalMenuShowed)) {
      isVerticalMenuShowed = !isVerticalMenuShowed;
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