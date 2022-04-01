"use strict";

import { meaningfullDaysData } from "./app.js";


const MS_IN_SEC = 1000;
const MS_IN_MIN = MS_IN_SEC*60;
const MS_IN_HOUR = MS_IN_MIN*60;
const MS_IN_DAY = MS_IN_HOUR*24;

const DAYS_NUMBER_YEAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function changeFebDays() {
  let year = new Date().getFullYear();
  if ((year % 4) === 0) {
    DAYS_NUMBER_YEAR[1] = 29;
  }
}

changeFebDays();


export function calcMSToDate(dateInfo) {
  let msToDay = 0;
  for (let i = 0; i < dateInfo.monthCode; i++) {
    msToDay += MS_IN_DAY*DAYS_NUMBER_YEAR[i];
  }
}

export function calcDaysToDate(dateInfo) {
  let currentDay = getCurrentDayOfYear();
  let daysToDate = dateInfo.daysCount - currentDay;
  return daysToDate;
}

export function getCurrentDayOfYear() {
  let currentDay = 0;
  let month = new Date().getMonth();
  let day = new Date().getDate();

  for (let i = 0; i < month; i++) {
      currentDay += DAYS_NUMBER_YEAR[i];
  }

  for (let i = 0; i < day; i++) {
    currentDay++;
  }

  console.log({currentDay});
  return currentDay;
}

getCurrentDayOfYear();


export function getDayOfYear(dateInfo) {
  let dayCount = 0;

  for (let i = 0; i < dateInfo.monthCode; i++) {
    dayCount += DAYS_NUMBER_YEAR[i];
  }

  for (let i = 0; i < dateInfo.day; i++) {
    dayCount++;
  }
  console.log({dayCount});
  return dayCount;
}


export function checkLeapYear() {
  return !((new Date().getFullYear()) % 4);
}


export function getNextDate() {
  if (meaningfullDaysData.length === 0) {
    alertText.textContent = "";
    return;
  }

  let currentDay = getCurrentDayOfYear();

  for (let i = 0; i < meaningfullDaysData.length; i++) {
    if (currentDay === meaningfullDaysData[i].daysCount) {
      alertText.textContent = "today";
      return;
    }
  }

  const nextDates = meaningfullDaysData.filter(checkNext);
  if (nextDates.length === 0) {
    
    if (meaningfullDaysData[0].daysCount === currentDay) {
      alertText.textContent = "The next date is today!";
      return;
    }

    let totalDays = undefined;
    if (checkLeapYear() === false) {
      totalDays = 365;
    } else {
      totalDays = 366; //?
    }
    
    let daysToNextPrev = totalDays - currentDay + 
    meaningfullDaysData[0].daysCount;
    displayAlert(daysToNextPrev);

  } else {
    
    nextDates.sort(compareDatesDays);
    displayAlert(nextDates[0].daysToDate);
  }
}

setTimeout(getNextDate, 100);


function checkNext(dateInfo) {
  if (dateInfo.daysToDate > 0) {
    return dateInfo;
  }
}


function compareDatesDays(a, b) {
  if (a.daysToDate < b.daysToDate) {
    return -1;
  } 
  if (a.daysToDate > b.daysToDate) {
    return 1;
  }
  return 0;
}


/* alert displaying */

const alertBox = document.querySelector(".date-alert");
const alertText = document.querySelector(".date-alert__text");

function displayAlert(days) {
  alertText.textContent = `Before next date: ${days}`;
}