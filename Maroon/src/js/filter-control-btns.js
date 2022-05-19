"use strict";

window.addEventListener("resize", btnsBlockPosHandler);
window.addEventListener("load", btnsBlockPosHandler);


function btnsBlockPosHandler() {
  const fieldsetPos = getElemPosByClass("js-filter-fieldset-third");
  const formPos = getElemPosByClass("js-filter-content");
  let elemPos = fieldsetPos.left - formPos.left;

  const formObj = document.querySelector(".js-filter-content");
  const formSyleObj = window.getComputedStyle(formObj);

  elemPos += parseInt(formSyleObj.marginLeft);
  setBtnslBlockPos(elemPos);
}


function getElemPosByClass(className) {
  const elem = document.querySelector(`.${className}`);
  let pos = elem.getBoundingClientRect();
  return pos;
}


function setBtnslBlockPos(posLeft) {
  const btnsBlock = document.querySelector(".filter__btn-block");
  btnsBlock.style.left = `${posLeft}px`;
}