"use strict";

import { createEmptyDateContainer } from "./DOMManipulations.js";
import { fillEmptyDateContainer } from "./DOMManipulations.js";
import { fillReadyContainer } from "./DOMManipulations.js";

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
  localStorage.setItem(dateKey, dateValue)
};


setTimeout(function() {
  console.log(meaningfullDaysData);
}, 10000);




function getNextDate() {
  const nextDates = meaningfullDaysData.filter(checkNext);
  console.log(nextDates);
  nextDates.sort(compareDateInfoDays);
  console.log(nextDates);

  displayAlert(nextDates);
}

setTimeout(getNextDate, 500);

function checkNext(dateInfo) {
  if (dateInfo.daysToDate > 0) {
    return dateInfo;
  }
}

function compareDateInfoDays(a, b) {
  console.log(a);
  if (a.daysToDate < b.daysToDate) {
    return -1;
  } 
  if (a.daysToDate > b.daysToDate) {
    return 1;
  }
  return 0;
}

const alertBox = document.querySelector(".date-alert");
const alertText = document.querySelector(".date-alert__text");

function displayAlert(dates) {
  alertText.textContent = `Before next date: ${dates[0].daysToDate}`;
}