"use strict";

import { meaningfullDaysData } from "./app.js";
import { calcDaysToDate, calcMSToDate } from "./nextDateCalc.js";
import { getDayOfYear } from "./nextDateCalc.js";
import { getNextDate } from "./nextDateCalc.js";

export function createEmptyDateContainer() {
  let emptyDateContainer = document.createElement("div");
  emptyDateContainer.classList.add("containers-wrapper__date-container", "date-container", 
  "date-container_empty");
  
  

  return emptyDateContainer; 
}

export function fillEmptyDateContainer(elem) {
  let tmpAddBtn = document.createElement("button");
  tmpAddBtn.classList.add("date-container__add-btn", "btn", "js-add-btn");
  tmpAddBtn.textContent = "Add";

  tmpAddBtn.addEventListener("click", switchToAddForm.bind(null, elem));

  elem.appendChild(tmpAddBtn);
}

function switchToAddForm(elem) {
  elem.classList.remove("date-container_empty");
  elem.classList.add("date-container_edit");

  removeChilds(elem);

  let tmpAddForm = createAddForm(elem);
  elem.appendChild(tmpAddForm);
}

function removeChilds(elem) {
  while (elem.lastElementChild) {
    elem.removeChild(elem.lastElementChild);
  }
}

let monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 
  "Sep", "Oct", "Nov", "Dec"];

function createAddForm(cont) {
  let tmpAddForm = document.createElement("form");
  tmpAddForm.classList.add("date-container__add-form", "add-form");

  let inputDay = document.createElement("input");
  inputDay.type = "number";
  inputDay.classList.add("add-form__input", "add-form__input_number", "js-input-day");
  inputDay.name = "day";
  tmpAddForm.appendChild(inputDay);


  

  let selectMonth = document.createElement("select");
  selectMonth.classList.add("add-form__input", "add-form__input_select", "js-input-month");
  let selectMonthId = new Date().getTime();
  selectMonth.id = selectMonthId;
  tmpAddForm.appendChild(selectMonth);

  for (let i = 0; i < monthsEn.length; i++) {
    let opt = document.createElement("option");
    opt.value = monthsEn[i];
    opt.textContent = monthsEn[i]; 
    selectMonth.appendChild(opt);
  }

  let inputText = document.createElement("input");
  inputText.type = "text";
  inputText.classList.add("add-form__input", "add-form__input_text", "js-input-text");
  inputText.name = "text";
  tmpAddForm.appendChild(inputText);

  let colorsEn = ["Orange", "Cyan", "Green", "Purple"];

  let selectColor = document.createElement("select");
  selectColor.classList.add("add-form__input", "add-form__input_select", "js-input-color");
  let selectColorId = new Date().getTime();
  selectColor.id = selectColorId;
  tmpAddForm.appendChild(selectColor);

  for (let i = 0; i < colorsEn.length; i++) {
    let opt = document.createElement("option");
    opt.value = colorsEn[i];
    opt.textContent = colorsEn[i];
    selectColor.appendChild(opt);
  }

  let submitBtn = document.createElement("button");
  submitBtn.classList.add("add-form__submit-btn", "btn");
  submitBtn.type = "button";
  submitBtn.textContent = "Add";

  submitBtn.addEventListener("click", switchToReadyContainer.bind(null, cont));

  tmpAddForm.appendChild(submitBtn);

  return tmpAddForm;
}

function switchToReadyContainer(cont) {
  let dateInfo = getDataFromInputs(cont);

  
  console.log(meaningfullDaysData);

  removeChilds(cont);
  cont.classList.remove("date-container_edit");
  cont.classList.add("date-container_ready");

  meaningfullDaysData.push(dateInfo);
  if (meaningfullDaysData.length > 1) {
    meaningfullDaysData.sort(compareDateInfoItems);
  }

  getNextDate();

  let dateKey = "data";
  let dateValue = JSON.stringify(meaningfullDaysData);
  localStorage.setItem(dateKey, dateValue);
  

  if (meaningfullDaysData.length > 1) {
    if (meaningfullDaysData[meaningfullDaysData.length-1].id === dateInfo.id) {
      console.log("new item is last");
    } else {
      console.log("needs to re-render");
      deleteAllContainers();
      renderAllContainers();
    }
  }

  console.log(meaningfullDaysData);
  fillReadyContainer(cont, dateInfo);

  let newCont = createEmptyDateContainer();
  fillEmptyDateContainer(newCont);
  const wrapper = document.querySelector(".containers-wrapper");
  wrapper.appendChild(newCont);
}


function getDataFromInputs(cont) {
  let tmpDateInfo = {};
  
  tmpDateInfo.day = cont.querySelector(".js-input-day").value;

  tmpDateInfo.dayStringed = getCodeAsString(tmpDateInfo.day-1);

  tmpDateInfo.month = cont.querySelector(".js-input-month").value;
  tmpDateInfo.monthCode = getMonthCode(tmpDateInfo.month);
  console.log(tmpDateInfo.monthCode);
  tmpDateInfo.monthCodeStringed = getCodeAsString(tmpDateInfo.monthCode+1);
  console.log(tmpDateInfo.monthCodeStringed);

  tmpDateInfo.daysCount = getDayOfYear(tmpDateInfo);
  tmpDateInfo.daysToDate = calcDaysToDate(tmpDateInfo);


  tmpDateInfo.text = cont.querySelector(".js-input-text").value;
  tmpDateInfo.color = cont.querySelector(".js-input-color").value;
  tmpDateInfo.id = `${tmpDateInfo.monthCodeStringed}${tmpDateInfo.dayStringed}${new Date().getTime()}`;
  
  
  return tmpDateInfo;
}

export function fillReadyContainer(elem, dateInfo) {
  

  let tmpDayMonth = document.createElement("p");
  tmpDayMonth.classList.add("date-container__day-month");
  tmpDayMonth.textContent = `${dateInfo.month}, ${dateInfo.day}`;
  elem.appendChild(tmpDayMonth);

  let tmpText = document.createElement("p");
  tmpText.classList.add("date-container__text");
  tmpText.textContent = dateInfo.text;
  elem.appendChild(tmpText);

  let tmpDelBtn = document.createElement("button");
  tmpDelBtn.classList.add("date-container__del-btn", "btn");
  tmpDelBtn.textContent = "Del";

  tmpDelBtn.addEventListener("click", function() {
    let wrapper = document.querySelector(".containers-wrapper");
    let index = getMeaningfullDayIndex(dateInfo.id);
    deleteItem(elem, index);
    console.log(dateInfo.id);
    if (meaningfullDaysData.length === 0) {
      localStorage.setItem("data", []);
    }

    getNextDate();

  });

  switch(dateInfo.color) {
    case "Orange": {
      elem.classList.add("date-container_orange");
      break;
    }
    case "Cyan": {
      elem.classList.add("date-container_cyan");
      break;
    }
    case "Green": {
      elem.classList.add("date-container_green");
      break;
    }
    case "Purple": {
      elem.classList.add("date-container_purple");
      break;
    }
    default: {
      alert("smth went wrong");
      break;
    }
  }

  elem.appendChild(tmpDelBtn);
}

function getMeaningfullDayIndex(id) {
  let mDIndex = undefined;
  meaningfullDaysData.forEach(function(md, index) {
    if (md.id === id) {
      mDIndex = index;
    }
  })
  return mDIndex;
}

function deleteItem(meaningfullDay, index) {
  const wrapper = document.querySelector(".containers-wrapper");
  wrapper.removeChild(meaningfullDay);
  meaningfullDaysData.splice(index, 1);
}

function deleteAllContainers() {
  const wrapper = document.querySelector(".containers-wrapper");
  while(wrapper.lastChild) {
    wrapper.removeChild(wrapper.lastChild);
  }
}

function renderAllContainers() {
  const wrapper = document.querySelector(".containers-wrapper");
  meaningfullDaysData.forEach(function(meaningfullDay) {
    let emptyDateContainer = createEmptyDateContainer();
    wrapper.appendChild(emptyDateContainer);
    fillReadyContainer(emptyDateContainer, meaningfullDay);
  })
}

function getMonthCode(value) {
  for (let i = 0; i < monthsEn.length; i++) {
    if (value == monthsEn[i]) {
      return i;
    }
  }
  console.log("month code is not defined");
}

function getCodeAsString(code) {
  if (code < 10) {
    return `0${code}`;
  } else {
    return code.toString();
  }
}

function compareDateInfoItems(a, b) {
  console.log(a);
  if (a.id < b.id) {
    return -1;
  } 
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

