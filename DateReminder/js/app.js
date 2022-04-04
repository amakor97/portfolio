"use strict";

import { createEmptyDateContainer } from "./DOMManipulations.js";
import { fillEmptyDateContainer } from "./DOMManipulations.js";
import { fillReadyContainer } from "./DOMManipulations.js";
import { calcDaysToDate } from "./nextDateCalc.js";
import { getNextDate } from "./nextDateCalc.js";

import { deleteAllContainers } from "./DOMManipulations.js";
import { renderAllContainers } from "./DOMManipulations.js";

import { appendNewContainer, appendReadyContainer } from "./DOMManipulations.js";

export let meaningfullDaysData = [];

const wrapper = document.querySelector(".containers-wrapper");


/* localStorage functions*/
window.onload = function() {
  let fromLocalStorage = JSON.parse(localStorage.getItem("data"));
  if ((fromLocalStorage) && (fromLocalStorage.length > 0)) {
    meaningfullDaysData = [...fromLocalStorage];
  } else {
    meaningfullDaysData = [];
  }

  if (meaningfullDaysData.length > 0) {
    meaningfullDaysData.forEach(function(meaningfullDay) {
      meaningfullDay.daysToDate = calcDaysToDate(meaningfullDay);
      let emptyDateContainer = createEmptyDateContainer();
      wrapper.appendChild(emptyDateContainer);
      fillReadyContainer(emptyDateContainer, meaningfullDay);
    })
    getNextDate(meaningfullDaysData);
  }
}

window.onbeforeunload = setItemToLocalStorage;

export function setItemToLocalStorage() {
  let dateKey = "data";
  let toLocalStorage = JSON.stringify(meaningfullDaysData);
  localStorage.setItem(dateKey, toLocalStorage);
}


/* create first empty container when page loaded */
window.addEventListener("load", function() {
  let tmpDateContainer = createEmptyDateContainer();
  fillEmptyDateContainer(tmpDateContainer);
  wrapper.appendChild(tmpDateContainer);
})

