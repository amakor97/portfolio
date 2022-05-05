"use strict";

const menuToggleBtn = document.querySelector(".js-menu-toggle-btn");
const header = document.querySelector(".header");
const menu = document.querySelector(".menu");
const menuLinnks = document.querySelectorAll(".js-menu-link");
const headerDivider = document.querySelector(".js-header-divider");

menuToggleBtn.addEventListener("click", function() {
  if (menu.classList.contains("menu--showed")) {
    menu.classList.remove("menu--showed");
    if (window.scrollY === 0) {
      setTimeout(
        function() {
          header.classList.remove("header--backgrounded");
          headerDivider.classList.remove("header__divider--showed");
        }, 1000
      )
    }
    
  } else {
    header.classList.add("header--backgrounded")
    headerDivider.classList.add("header__divider--showed");
    setTimeout(
      function() {
        menu.classList.add("menu--showed");
      }, 500
    )
    
  }
})


window.addEventListener("scroll", headerBackgrounder)


menuLinnks.forEach(function(menuLink) {
  menuLink.addEventListener("click", function(e) {
    //e.preventDefault();
    menu.classList.remove("menu--showed");
  })
})


window.addEventListener("load", headerBackgrounder)


function headerBackgrounder() {
  if (this.scrollY > 0) {
    header.classList.add("header--backgrounded");
    headerDivider.classList.add("header__divider--showed");
  } else {
    if (!menu.classList.contains("menu--showed"))
    header.classList.remove("header--backgrounded");
    headerDivider.classList.remove("header__divider--showed");
  }
}