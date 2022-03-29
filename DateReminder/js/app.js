"use strict";

import { createEmptyDateContainer } from "./DOMManipulations.js";
import { fillEmptyDateContainer } from "./DOMManipulations.js";
import { fillReadyContainer } from "./DOMManipulations.js";

export let meaningfullDaysData = [];


const main = document.querySelector(".main");




/* localStorage */
window.onload = function() {
  let testValue = JSON.parse(localStorage.getItem("data"));
  if ((testValue) && (testValue.length > 0)) {
    meaningfullDaysData = [...testValue];
  } else {
    meaningfullDaysData = [];
  }
  console.log(meaningfullDaysData);

  if (meaningfullDaysData.length > 0) {
    meaningfullDaysData.forEach(function(meaningfullDay) {
      let emptyDateContainer = createEmptyDateContainer();
      main.appendChild(emptyDateContainer);
      fillReadyContainer(emptyDateContainer, meaningfullDay);
    })
  }
}

window.addEventListener("load", function() {
  let mainContainer = document.querySelector(".main");
  let tmpDateContainer = createEmptyDateContainer();
  fillEmptyDateContainer(tmpDateContainer);
  mainContainer.appendChild(tmpDateContainer);
})

window.onbeforeunload = function(){
  let dateKey = "data";
  let dateValue = JSON.stringify(meaningfullDaysData);
  localStorage.setItem(dateKey, dateValue)
};


setTimeout(function() {
  console.log(meaningfullDaysData);
}, 10000);