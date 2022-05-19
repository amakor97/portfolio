"use strict"

const toggleFilterBtns = document.querySelectorAll(".js-toggle-filter-btn");
const filterBody = document.querySelector(".js-filter");

toggleFilterBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    filterBody.classList.toggle("filter--showed");
  })
})


const toggleFieldsetsBtns = 
  document.querySelectorAll(".js-toggle-fieldset-btn");

toggleFieldsetsBtns.forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    this.classList.toggle("accordion-btn--opened");
    let panel = this.nextElementSibling;

    panel.classList.toggle("filter__fieldset--opened", 
    !panel.classList.contains("filter__fieldset--opened"));
  })
})


const applyBtn = document.querySelector(".js-apply-filter");
const filterCheckboxes = document.querySelectorAll(".js-filter-checkbox");

applyBtn.addEventListener("click", function(e) {
  e.preventDefault();
  filterCheckboxes.forEach(function(input) {
    if (input.checked === true) {
      console.log(input.name);
    }
  })
})


const filterFieldsets = document.querySelectorAll(".js-filter-fieldset");

window.addEventListener("resize", function() {
  if (this.screen.width >= 768) {
    for (let i = 0; i < filterFieldsets.length; i++) {
      toggleFieldsetsBtns[i].classList.remove("accordion-btn--opened");
      filterFieldsets[i].classList.remove("filter__fieldset--opened");
    }
  }
})
