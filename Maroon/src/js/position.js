"use strict"

const togglePanelBtns = document.querySelectorAll(".js-toggle-panel-btn");
console.log(togglePanelBtns);

togglePanelBtns.forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    this.classList.toggle("accordion-btn--opened");

    let panel = this.nextElementSibling;
    //console.log(panel);
    if (!panel.classList.contains("product__panel--opened")) {
      panel.classList.add("product__panel--opened");
    } else {
      panel.classList.remove("product__panel--opened");
    }
  })
})