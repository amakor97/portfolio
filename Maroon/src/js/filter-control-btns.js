"use strict";

window.addEventListener("DOMContentLoaded", btnsBlockPosHandler)
window.addEventListener("resize", btnsBlockPosHandler);

function btnsBlockPosHandler() {
  if (this.screen.width >= 1366) {
    let elemPos = getThirdFieldsetPos();
    setBtnslBlockPos(elemPos.left);
  }
}

function getThirdFieldsetPos() {
  const thirdFieldSet = document.getElementsByClassName("js-filter-fieldset")[2];
  let pos = thirdFieldSet.getBoundingClientRect();
  return pos;
}

function setBtnslBlockPos(posLeft) {
  const btnsBlock = document.querySelector(".filter__btn-block");
  btnsBlock.style.left = `${posLeft}px`;
}