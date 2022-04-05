"use strict";


import { removeChilds } from "./DOMManipulations.js";
import { renderAllContainers } from "./DOMManipulations.js";
import { appendReadyContainer } from "./DOMManipulations.js";
import { appendNewContainer } from "./DOMManipulations.js";

import { getNextDate } from "./nextDateCalc.js";

import { meaningfullDaysData } from "./app.js";



export const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 
  "Sep", "Oct", "Nov", "Dec"];


const filterContainer = document.querySelector(".js-filter-container");
//filterContainer.classList.remove("filter-container_hidden");


/* main functions */

function applyContstraints(parentNode, dates) {
  removeChilds(parentNode);

  let filteredData = dates.filter(filterData);
  filteredData.forEach(function(date) {
    appendReadyContainer(parentNode, date);
  })

  getNextDate(filteredData);
  appendNewContainer(parentNode);
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

 
  if ((item.monthCode >= startMonth) && (item.monthCode <= endMonth)){

    switch(item.color) {
      case "Orange": {
        if (orange) {
          return item;
        } 
        break;
      }
      case "Cyan": {
        if (cyan) {
          return item;
        } 
        break;
      }
      case "Green": {
        if (green) {
          return item;
        } 
        break;
      }
      case "Purple": {
        if (purple) {
          return item;
        } 
        break;
      }
    }

  }
}


const filterInputs = document.querySelectorAll(".js-filter-input");
filterInputs.forEach(function(input) {
  const filterSwitcher = document.querySelector(".js-filter-switch");
  const wrapper = document.querySelector(".containers-wrapper");

  input.addEventListener("change", function() {
    if (filterSwitcher.checked) {
      applyContstraints(wrapper, meaningfullDaysData);
    }
  })
})


const filterSwitcher = document.querySelector(".js-filter-switch");
filterSwitcher.addEventListener("change", function() {
  const wrapper = document.querySelector(".containers-wrapper");
  
  if (filterSwitcher.checked) {
    applyContstraints(wrapper, meaningfullDaysData);
  } else {
    removeChilds(wrapper);
    renderAllContainers();
    getNextDate(meaningfullDaysData);
    appendNewContainer(wrapper);
  }
})


export function getMonthCode(value) {
  for (let i = 0; i < monthsEn.length; i++) {
    if (value == monthsEn[i]) {
      return i;
    }
  }
}


const filterShowBtn = document.querySelector(".js-filter-show");
filterShowBtn.addEventListener("click", function() {
  filterContainer.classList.toggle("filter-container_hidden");
})