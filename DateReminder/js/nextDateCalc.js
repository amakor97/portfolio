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
  if ((year % 4) != 0) {
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
  /*let daysToDate = 0;
  for (let i = 0; i < dateInfo.monthCode; i++) {
    daysToDate += DAYS_NUMBER_YEAR[i];
  }
  
  for (let i = 0; i < dateInfo.day; i++) {
    daysToDate++;
  }
  
  console.log({daysToDate});*/

  let daysToDate = dateInfo.daysCount - currentDay;

  return daysToDate;
}

function getCurrentDayOfYear() {
  let month = new Date().getMonth();
  let day = new Date().getDate();

  
  for (let i = 0; i < month; i++) {
      currentDay += DAYS_NUMBER_YEAR[i];
  }
  for (let i = 0; i < day; i++) {
    currentDay++;
  }
   console.log({currentDay});
}
let currentDay = 0;
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


