"use strict"

const togglePanelBtns = document.querySelectorAll(".js-toggle-panel-btn");

togglePanelBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    this.classList.toggle("accordion-btn--opened");

    let panel = this.nextElementSibling;
    panel.classList.toggle("product__panel--opened", 
    !panel.classList.contains("product__panel--opened"));
  })
})