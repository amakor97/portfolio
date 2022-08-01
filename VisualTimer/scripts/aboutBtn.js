"use strict";

import { createModalWindow } from "./modalWindow.js"; 

const aboutBtn = document.querySelector(".js-about-btn");

aboutBtn.addEventListener("click", function() {
  createModalWindow(undefined, undefined, undefined, undefined);
})