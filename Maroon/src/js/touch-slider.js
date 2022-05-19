export function swipeStartFunction(e) {
  e = e || window.event;
  this.disX = 0;
  this.startX = e.changedTouches[0].pageX;
  this.sLeft = this.wrap.style.transform ? 
  -parseInt(/\d+/.exec(this.wrap.style.transform)[0]) : 0;
  this.wrap.style.transition = "none";

  this.posX1 = e.changedTouches[0].pageX;
  this.posY1 = e.changedTouches[0].pageY;
}


export function swipeMoveFunction(e) {
  this.posX2 = this.posX1 - e.changedTouches[0].pageX;
  this.posX1 = e.changedTouches[0].pageX;

  this.posY2 = this.posY1 - e.changedTouches[0].pageY;
  this.posY1 = e.changedTouches[0].pageY;

  if (!this.isSwipe && !this.isScroll) {
    let posY = Math.abs(this.posY2);
    if ((posY > 4) || (this.posX2 === 0)) {
      this.isScroll = true;
    } else if (posY < 4) {
      this.isSwipe = true;
    }
  }

  if (this.isSwipe) {
    e = e || window.event;
    this.disX = e.changedTouches[0].pageX - this.startX;
    this.curLeft = this.disX + this.sLeft;
    this.wrap.style.transform = `translateX(${this.curLeft}px)`; 
  }
}


export function swipeEndFunction() {
  this.isScroll = false;
  this.isSwipe = false;

  if (this.disX > 50) {
    if (this.index !== 0) {
      this.index -= 1;
    }
  }
  if (this.disX < -50) {
    if (this.index < (this.slidesNumber - 1)) {
      this.index += 1;
    }
  }

  this.wrap.style.transition = "0.5s";
  let newPos = -this.index*this.sliderWidth;
  this.wrap.style.transform = `translateX(${newPos}px)`;
  this.disX = 0;

  if (this.pageCounterElem !== undefined) {
    this.pageCounterElem.textContent = (this.index + 1);
  }
}


export function moveNextFunction() {
  if (this.index < (this.slidesNumber - 1)) {
    this.wrap.style.transition = "0.5s";
    this.index++;

    let newPos = -this.index*this.sliderWidth;
    this.wrap.style.transform = `translateX(${newPos}px)`;
  }

  if (this.pageCounterElem !== undefined) {
    this.pageCounterElem.textContent = (this.index + 1);
  }
}


export function movePrevFunctiion() {
  if (this.index > 0) {
    this.wrap.style.transition = "0.5s";
    this.index--;

    let newPos = -this.index*this.sliderWidth;
    this.wrap.style.transform = `translateX(${newPos}px)`;
  }

  if (this.pageCounterElem !== undefined) {
    this.pageCounterElem.textContent = (this.index + 1);
  }
}