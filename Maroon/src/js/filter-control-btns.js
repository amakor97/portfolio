"use strict";

window.addEventListener("DOMContentLoaded", btnsBlockPosHandler)
window.addEventListener("resize", btnsBlockPosHandler);

function btnsBlockPosHandler() {
  if (this.screen.width >= 1630) {
    let fieldsetPos = getThirdFieldsetPos();
    let formPos = getFilterContentPos();
    let elemPos = fieldsetPos.left - formPos.left;
    console.log("fieldPos", fieldsetPos.left);
    console.log("formPos", formPos.left);

    let formObj = document.querySelector(".js-filter-content");
    let formSyleObj = window.getComputedStyle(formObj);
    console.log("margin left", formSyleObj.marginLeft);

    console.log({elemPos});
    elemPos += parseInt(formSyleObj.marginLeft);
    console.log({elemPos});
    setBtnslBlockPos(elemPos);
    return;
  }
  if (this.screen.width >= 1366) {
    let fieldsetPos = getThirdFieldsetPos();
    let formPos = getFilterContentPos();
    let elemPos = fieldsetPos.left - formPos.left;
    console.log("fieldPos", fieldsetPos.left);
    console.log("formPos", formPos.left);
    console.log(elemPos);
    setBtnslBlockPos(fieldsetPos.left);
  }
}

function getThirdFieldsetPos() {
  const thirdFieldSet = document.getElementsByClassName("js-filter-fieldset")[2];
  let pos = thirdFieldSet.getBoundingClientRect();
  console.log(pos.left);
  return pos;
}

function getFilterContentPos() {
  const filterContent = document.querySelector(".js-filter-content");
  let pos = filterContent.getBoundingClientRect();
  return pos;
}

function setBtnslBlockPos(posLeft) {
  const btnsBlock = document.querySelector(".filter__btn-block");
  btnsBlock.style.left = `${posLeft}px`;
}