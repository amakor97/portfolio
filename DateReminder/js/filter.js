"use strict";

import { createEmptyDateContainer } from "./DOMManipulations.js";
import { fillEmptyDateContainer } from "./DOMManipulations.js";
import { fillReadyContainer } from "./DOMManipulations.js";
import { deleteAllContainers } from "./DOMManipulations.js";

import { meaningfullDaysData } from "./app.js";
import { getMonthCode } from "./DOMManipulations.js"



function applyContstraints() {
  const wrapper = document.querySelector(".containers-wrapper");
  deleteAllContainers();

  let filteredData = meaningfullDaysData.filter(filterData);
  console.log("result:", filteredData);

  filteredData.forEach(function(date) {
      let emptyDateContainer = createEmptyDateContainer();
      wrapper.appendChild(emptyDateContainer);
      fillReadyContainer(emptyDateContainer, date);
  })

  let emptyDateContainer = createEmptyDateContainer();
  wrapper.appendChild(emptyDateContainer);
  fillEmptyDateContainer(emptyDateContainer);
}

function filterData(item) {
  const selectStart = document.querySelector(".js-filter-start");
  const startMonth = getMonthCode(selectStart.value);
  
  const selectFinish = document.querySelector(".js-filter-end");
  const endMonth = getMonthCode(selectFinish.value);

  const orange = document.querySelector(".js-filter-orange").checked;
  const cyan = document.querySelector(".js-filter-cyan").checked;
  const green = document.querySelector(".js-filter-green").checked;
  const purple = document.querySelector(".js-filter-purple").checked;

  console.log({startMonth, endMonth});
  console.log({orange, cyan, green, purple});
 
  if ((item.monthCode >= startMonth) && (item.monthCode <= endMonth)){

    console.log(item.color);
    switch(item.color) {
      case "Orange": {
        if (orange) {
          return item;
        } else {
          break;
        }
      }
      case "Cyan": {
        if (cyan) {
          return item;
        } else {
          break;
        }
      }
      case "Green": {
        if (green) {
          return item;
        } else {
          break;
        }
      }
      case "Purple": {
        if (purple) {
          return item;
        } else {
          break;
        }
      }
    }

  }
}

let filterInputs = document.querySelectorAll(".js-filter-input");
filterInputs.forEach(function(input) {
  input.addEventListener("change", applyContstraints);
})

//setTimeout(applyContstraints, 200);