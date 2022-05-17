"use strict";

let debugMode = false;

export function swipeStartFunction(e) {
  if (debugMode) {
    console.log("__________");
    console.log("touch start");
  }

  let _this = this;
  e = e || window.event;
  this.disX = 0;
  //e.preventDefault();
  this.startX = e.changedTouches[0].pageX;
  if (debugMode) {
    console.log("touched X:", this.startX);
  }

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

    if (debugMode) {
      console.log(this.isScroll, this.isSwipe);
    }
  }


  if (this.isSwipe) {
    if (debugMode) {
      console.log("moving");
    }
   
    e = e || window.event;
    this.disX = e.changedTouches[0].pageX - this.startX;
    this.curLeft = this.disX + this.sLeft;
    this.wrap.style.transform = `translateX(${this.curLeft}px)`; 
  } else {
    if (debugMode) {
      console.log("scrolling");
    }
  }
}

export function swipeEndFunction(e) {
  if (debugMode) {
    console.log("__________");
    console.log("touch ending");
    console.log("index before:", this.index);
  }


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

  if (debugMode) {
    console.log("transform after:", newPos);
    console.log("__________");
  }
}

export function moveNextFunction(e) {
  if (debugMode) {
    console.log("__________");
    console.log("moving next, called from module");
    console.log("index before:", this.index);
  }

  if (this.index < (this.slidesNumber - 1)) {
    let style = this.wrap.style.transform;
    let transform = +style.match(this.trfRegExp)[0];
    if (debugMode) {
      console.log("transform before:", transform);
    }

    transform -= this.sliderWidth;
    if (debugMode) {
      console.log("transform after:", transform);
    }

    this.wrap.style.transition = "0.5s";
    this.wrap.style.transform = `translateX(${transform}px)`;
    this.index++;

    if (debugMode) {
      console.log("index after:", this.index);
    }

  }
  if (debugMode) {
    console.log("__________");
  }

}

export function movePrevFunctiion(e) {
  if (debugMode) {
    console.log("__________");
    console.log("moving prev, called from module");
    console.log("index before:", this.index);
  }

  if (this.index > 0) {
    let style = this.wrap.style.transform;
    let transform = +style.match(this.trfRegExp)[0];
    if (debugMode) {
      console.log("transform before:", transform);
    }

    transform += this.sliderWidth;
    if (debugMode) {
      console.log("transform after:", transform);
    }

    this.wrap.style.transition = "0.5s";
    this.wrap.style.transform = `translateX(${transform}px)`;
    this.index--;
    if (debugMode) {
      console.log("index after:", this.index);
    }

  }
  if (debugMode) {
    console.log("__________");
  }
}