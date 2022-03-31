"use strict";

import { createEmptyDateContainer } from "./DOMManipulations.js";
import { fillEmptyDateContainer } from "./DOMManipulations.js";
import { fillReadyContainer } from "./DOMManipulations.js";
import { checkLeapYear } from "./nextDateCalc.js";

export let meaningfullDaysData = [];


const wrapper = document.querySelector(".containers-wrapper");




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
      wrapper.appendChild(emptyDateContainer);
      fillReadyContainer(emptyDateContainer, meaningfullDay);
    })
  }
}

window.addEventListener("load", function() {
  let wrapperContainer = document.querySelector(".containers-wrapper");
  let tmpDateContainer = createEmptyDateContainer();
  fillEmptyDateContainer(tmpDateContainer);
  wrapperContainer.appendChild(tmpDateContainer);
})

window.onbeforeunload = function(){
  let dateKey = "data";
  let dateValue = JSON.stringify(meaningfullDaysData);
  localStorage.setItem(dateKey, dateValue);
};


setTimeout(function() {
  console.log(meaningfullDaysData);
}, 10000);




