"use strict"

const toggleFilterBtns = document.querySelectorAll(".js-toggle-filter-btn");
const filterBody = document.querySelector(".js-filter");

toggleFilterBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    filterBody.classList.toggle("filter--showed");
  })
})


const toggleFieldsetsBtns = document.querySelectorAll(".js-toggle-fieldset-btn");

toggleFieldsetsBtns.forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    this.classList.toggle("accordion-btn--opened");

    let panel = this.nextElementSibling;
    //console.log(panel);
    if (!panel.classList.contains("filter__fieldset--opened")) {
      panel.classList.add("filter__fieldset--opened");
    } else {
      panel.classList.remove("filter__fieldset--opened");
    }
  })
})



const applyBtn = document.querySelector(".js-apply-filter");
const filterCheckboxes = document.querySelectorAll(".js-filter-checkbox");
applyBtn.addEventListener("click", function() {
  filterCheckboxes.forEach(function(input) {
    if (input.checked === true) {
      console.log(input);
    }
  })
})