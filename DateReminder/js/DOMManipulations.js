"use strict";

import { meaningfullDaysData } from "./app.js";
import { setItemToLocalStorage } from "./app.js";

import { calcDaysToDate } from "./nextDateCalc.js";
import { getDayOfYear } from "./nextDateCalc.js";
import { getNextDate } from "./nextDateCalc.js";

import { getMonthCode } from "./filter.js";
import { monthsEn } from "./filter.js";


export function appendNewContainer(parentNode) {
  let emptyDateContainer = createEmptyDateContainer();
  parentNode.appendChild(emptyDateContainer);
  fillEmptyDateContainer(emptyDateContainer);
}

export function appendReadyContainer(parentNode, date) {
  let emptyDateContainer = createEmptyDateContainer();
  parentNode.appendChild(emptyDateContainer);
  fillReadyContainer(emptyDateContainer, date);
}

export function createEmptyDateContainer() {
  let emptyDateContainer = document.createElement("div");
  emptyDateContainer.classList.add("containers-wrapper__date-container", 
  "date-container", "date-container_empty");
  return emptyDateContainer; 
}


export function fillEmptyDateContainer(elem) {
  let tmpAddBtn = document.createElement("button");
  tmpAddBtn.classList.add("date-container__add-btn", "btn", "btn-interactive", "js-add-btn");
  //tmpAddBtn.textContent = "Add"; //add svg

  let plusIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  plusIcon.classList.add("btn__plus-svg");
  plusIcon.setAttribute("width", "24");
  plusIcon.setAttribute("height", "24");
  plusIcon.setAttributeNS(null, "viewBox", "0 0 24 24");

  let plusIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  plusIconPath.setAttribute("d", "M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z");
  plusIcon.appendChild(plusIconPath);

  tmpAddBtn.appendChild(plusIcon);

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



let colorsEn = ["Orange", "Cyan", "Green", "Purple"];


function createAddForm(cont) {
  let tmpAddForm = document.createElement("form");
  tmpAddForm.classList.add("date-container__add-form", "add-form");

  let inputDay = document.createElement("input");
  inputDay.type = "number";
  inputDay.classList.add("add-form__input", "add-form__input_number", 
  "js-input-day");
  tmpAddForm.appendChild(inputDay);

  let selectMonth = document.createElement("select");
  selectMonth.classList.add("add-form__input", "add-form__input_select", 
  "js-input-month");
  tmpAddForm.appendChild(selectMonth);
  createAppendOptions(monthsEn, selectMonth);

  let inputText = document.createElement("input");
  inputText.type = "text";
  inputText.classList.add("add-form__input", "add-form__input_text", 
  "js-input-text");
  inputText.name = "text";
  tmpAddForm.appendChild(inputText);

  let selectColor = document.createElement("select");
  selectColor.classList.add("add-form__input", "add-form__input_select", 
  "js-input-color");
  tmpAddForm.appendChild(selectColor);
  createAppendOptions(colorsEn, selectColor);

  let submitBtn = document.createElement("button");
  submitBtn.classList.add("add-form__submit-btn", "btn", "btn-interactive");
  submitBtn.type = "button";
  submitBtn.textContent = "Add"; //add svg

  let plusIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  plusIcon.classList.add("btn__plus-svg");
  plusIcon.setAttribute("width", "24");
  plusIcon.setAttribute("height", "24");
  plusIcon.setAttributeNS(null, "viewBox", "0 0 24 24");

  let plusIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  plusIconPath.setAttribute("d", "M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z");
  plusIcon.appendChild(plusIconPath);

  submitBtn.appendChild(plusIcon);

  submitBtn.addEventListener("click", switchToReadyContainer.bind(null, cont));
  tmpAddForm.appendChild(submitBtn);

  return tmpAddForm;
}


function switchToReadyContainer(cont) {
  const wrapper = document.querySelector(".containers-wrapper");
  let dateInfo = getDataFromInputs(cont);

  removeChilds(cont);
  cont.classList.remove("date-container_edit");
  cont.classList.add("date-container_ready");

  meaningfullDaysData.push(dateInfo);
  if (meaningfullDaysData.length > 1) {
    meaningfullDaysData.sort(compareDatesId);
  }

  const filterSwitcher = document.querySelector(".js-filter-switch");
  if (filterSwitcher.checked) {
    filterSwitcher.checked = false;
  }

  getNextDate(meaningfullDaysData);
  setItemToLocalStorage();

  deleteAllContainers();
  renderAllContainers();


  if (meaningfullDaysData.length > 1) {
    if (meaningfullDaysData[meaningfullDaysData.length-1].id === dateInfo.id) {
      console.log("new item is last");
    } else {
      console.log("needs to re-render");
    }
  }

  fillReadyContainer(cont, dateInfo);

  let newCont = createEmptyDateContainer();
  fillEmptyDateContainer(newCont);
  wrapper.appendChild(newCont);
}


function getDataFromInputs(cont) {
  let tmpDateInfo = {};
  
  tmpDateInfo.day = cont.querySelector(".js-input-day").value;
  tmpDateInfo.dayStringed = getCodeAsString(tmpDateInfo.day-1);

  tmpDateInfo.month = cont.querySelector(".js-input-month").value;
  tmpDateInfo.monthCode = getMonthCode(tmpDateInfo.month);
  tmpDateInfo.monthCodeStringed = getCodeAsString(tmpDateInfo.monthCode+1);

  tmpDateInfo.daysCount = getDayOfYear(tmpDateInfo);
  tmpDateInfo.daysToDate = calcDaysToDate(tmpDateInfo);

  tmpDateInfo.text = cont.querySelector(".js-input-text").value;
  tmpDateInfo.color = cont.querySelector(".js-input-color").value;
  tmpDateInfo.id = 
  `${tmpDateInfo.monthCodeStringed}${tmpDateInfo.dayStringed}${new Date().getTime()}`;
  
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
  tmpDelBtn.classList.add("date-container__del-btn", "btn", "btn-interactive");
  //tmpDelBtn.textContent = "Del"; //add svg

  let plusIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  plusIcon.classList.add("btn__plus-svg");
  plusIcon.setAttribute("width", "24");
  plusIcon.setAttribute("height", "24");
  plusIcon.setAttribute("transform", "rotate(45)");
  plusIcon.setAttributeNS(null, "viewBox", "0 0 24 24");

  let plusIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  plusIconPath.setAttribute("d", "M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z");
  plusIcon.appendChild(plusIconPath);

  tmpDelBtn.appendChild(plusIcon);

  tmpDelBtn.addEventListener("click", function() {
    let index = getMeaningfullDayIndex(dateInfo.id);
    deleteItem(elem, index);
    setItemToLocalStorage();
    if (meaningfullDaysData.length === 0) {
      localStorage.setItem("data", []);
    }
    getNextDate(meaningfullDaysData);
  });

  applyColorToCont(elem, dateInfo.color);
  elem.appendChild(tmpDelBtn);
}


function getMeaningfullDayIndex(id) {
  let mDIndex = undefined;
  meaningfullDaysData.forEach(function(mD, index) {
    if (mD.id === id) {
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


export function deleteAllContainers() {
  const wrapper = document.querySelector(".containers-wrapper");
  while(wrapper.lastChild) {
    wrapper.removeChild(wrapper.lastChild);
  }
}


export function renderAllContainers() {
  const wrapper = document.querySelector(".containers-wrapper");
  meaningfullDaysData.forEach(function(meaningfullDay) {
    let emptyDateContainer = createEmptyDateContainer();
    wrapper.appendChild(emptyDateContainer);
    fillReadyContainer(emptyDateContainer, meaningfullDay);
  })
}



function getCodeAsString(code) {
  if (code < 10) {
    return `0${code}`;
  } else {
    return code.toString();
  }
}


function compareDatesId(a, b) {
  if (a.id < b.id) {
    return -1;
  } 
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}


function createAppendOptions(array, node) {
  for (let i = 0; i < array.length; i++) {
    let opt = document.createElement("option");
    opt.value = array[i];
    opt.textContent = array[i];
    node.appendChild(opt);
  }
}


function applyColorToCont(elem, color) {
  switch(color) {
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
      alert("color for some dates is unavailable");
      break;
    }
  }
}