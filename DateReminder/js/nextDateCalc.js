"use strict";

import { meaningfullDaysData } from "./app.js";



const MS_IN_SEC = 1000;
const MS_IN_MIN = MS_IN_SEC*60;
const MS_IN_HOUR = MS_IN_MIN*60;
const MS_IN_DAY = MS_IN_HOUR*24;

console.log(MS_IN_MIN);
console.log({MS_IN_DAY});

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
    console.log({msToDay});
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
      
      console.log(DAYS_NUMBER_YEAR[i]);
  }
  for (let i = 0; i < day; i++) {
    currentDay++;
  }
   console.log({currentDay});
   return currentDay;
}
//let currentDay = 0;
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
  console.log(nextDates);
  if (nextDates.length === 0) {
    console.log("there are no next dates");
    console.log(meaningfullDaysData[0].daysCount);

    
    
    if (meaningfullDaysData[0].daysCount === currentDay) {
      alertText.textContent = "today";
      return;
    }

    let totalDays = undefined;
    console.log(checkLeapYear());
    if (checkLeapYear() === false) {
      totalDays = 365;
    } else {
      totalDays = 366; //?
      //
    }
    
    console.log({totalDays, currentDay});
    
    let daysToNextPrev = totalDays - currentDay + meaningfullDaysData[0].daysCount;
    console.log({daysToNextPrev});
    displayAlert(daysToNextPrev);

    
  } else {
    console.log("there are some next dates");
    nextDates.sort(compareDateInfoDays);
    console.log(nextDates);
    displayAlert(nextDates[0].daysToDate);
  }
}

function getCurrDayOfYear() {
  let cDay = 0; 

  let month = new Date().getMonth();
  let day = new Date().getDate();

  
  for (let i = 0; i < month; i++) {
      cDay += DAYS_NUMBER_YEAR[i];
  }
  for (let i = 0; i < day; i++) {
    cDay++;
  }
   console.log({cDay});
   return cDay;
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

function displayAlert(day) {
  alertText.textContent = `Before next date: ${day}`;
}