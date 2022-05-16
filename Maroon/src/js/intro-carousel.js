"use strict";

import { createBestsellersCard } from "./fillers/bestsellers-filler.js";

const introPrevBtn = document.querySelector(".js-intro-carousel-prev-btn");
const introNextBtn = document.querySelector(".js-intro-carousel-next-btn");
const introCarousel = document.querySelector(".js-intro-carousel-inner");

let cardsNumber = 7;



const cardInnerWidth = window.innerWidth >= 768 ? 230 : 220;
const cardMargin = 30;

const introCarouselFullWidth = (cardsNumber > 0) ? cardInnerWidth + (cardInnerWidth + cardMargin)*(cardsNumber - 1) : 0;
//console.log(introCarouselFullWidth);

introCarousel.style.width = introCarouselFullWidth + "px";

const introCarouselStep = cardInnerWidth + cardMargin;
//console.log(introCarouselStep);
let introCarouselPos = 0;
let slideIndex = 0;

let leftCard = 1;

introCarousel.style.transform = `translateX(0px)`;

introNextBtn.addEventListener("click", function() {
  if (slideIndex < (cardsNumber -1)) {
    let style = introCarousel.style.transform;
    let transform = +style.match(touchIntro.trfRegExp)[0];
    transform -= introCarouselStep;
    introCarousel.style.transform = `translateX(${transform}px)`;
    leftCard++;
    slideIndex++;
    //console.log({slideIndex});
  }
})

introPrevBtn.addEventListener("click", function() {
  if (slideIndex > 0) {
    let style = introCarousel.style.transform;
    let transform = +style.match(touchIntro.trfRegExp)[0];
    transform += introCarouselStep;
    introCarousel.style.transform = `translateX(${transform}px)`;
    leftCard--;
    slideIndex--;
  }
})

let cards = [];

let dataFile = "./data/productData.json";
let dataObj = undefined;

fetch (dataFile)
.then(response => response.json())
.then( function(json) {
  dataObj = json;
  //console.log(dataObj);
  const main = document.querySelector(".main");
  for (let i = 0; i < cardsNumber; i++) {
    let card = createBestsellersCard(dataObj[i]);
    main.appendChild(card);
    introCarousel.appendChild(card);
  }
  cards = document.querySelectorAll(".intro-card");
});



/// touch

function getEvent() {
  return (event.type.search('touch') !== -1) ? event.touches[0] : event;
}

let touchIntro = {
  carousel: introCarousel,
  allowSwipe: true,
  transition: true,
  step: introCarouselStep,
  nextTrf: 0,
  prevTrf: 0,
  posInit: 0,
  posX1: 0,
  posX2: 0,
  posY1: 0,
  posY2: 0,
  posFinal: 0,
  trfRegExp: /([-0-9.]+(?=px))/,
  isSwipe: false,
  isScroll: false,
  lastTrf: ((cardsNumber-1) * introCarouselStep),
  posThreshold: 30
}

/*
let allowSwipe = true;
let transition = true;
let nextTrf = 0;
let prevTrf = 0;
let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posY1 = 0;
let posY2 = 0;
let posFinal = 0;
let trfRegExp = /([-0-9.]+(?=px))/;
let isSwipe = false;
let isScroll = false;
let lastTrf = (6 * introCarouselStep);
let posThreshold = 30;
*/

function blockCards(arr) {
  arr.forEach(function(obj) {
    obj.style.userSelect = "none";
    obj.style.pointerEvents = "none";
  })
}

function unblockCards(arr) {
  arr.forEach(function(obj) {
    //obj.style.userSelect = "all";
    obj.style.pointerEvents = "all";
  })
}

function swipeStart(sliderObj) {
  console.log("started");
  let evt = getEvent();

  if (sliderObj.allowSwipe) {
    sliderObj.transition = true;

    console.log(touchIntro.prevTrf, touchIntro.nextTrf);
    console.log(sliderObj.prevTrf, sliderObj.nextTrf);

    sliderObj.nextTrf = (slideIndex + 1) * -sliderObj.step;
    sliderObj.prevTrf = (slideIndex - 1) * -sliderObj.step;

    console.log("after:"),
    console.log(touchIntro.prevTrf, touchIntro.nextTrf);
    console.log(sliderObj.prevTrf, sliderObj.nextTrf);

    sliderObj.posInit = sliderObj.posX1 = evt.clientX;
    sliderObj.posY1 = evt.clientY;
    
    sliderObj.carousel.style.transition = '';
    
    document.addEventListener('touchmove', function(){
      swipeAction(sliderObj);
    });
    //document.addEventListener('mousemove', swipeAction); 
    //document.addEventListener("touchend", swipeEnd.bind(null, sliderObj));

    



    document.addEventListener("touchend", function() {
      //swipeEnd();
    })
    
    //document.addEventListener("touchend", swipeEnd);

    //document.addEventListener("touchend", swipeEnd.bind(evt));

    document.addEventListener('touchend', function() {
      swipeEnd(sliderObj); 
    });


    //document.addEventListener('mouseup', swipeEnd);
  }
}

function swipeAction(sliderObj) {
  let evt = getEvent();
  let style = sliderObj.carousel.style.transform;
  let transform = +style.match(sliderObj.trfRegExp)[0];
  
  sliderObj.posX2 = sliderObj.posX1 - evt.clientX;
  sliderObj.posX1 = evt.clientX;

  sliderObj.posY2 = sliderObj.posY1 - evt.clientY;
  sliderObj.posY1 = evt.clientY;

  
  // определение действия свайп или скролл
  if (!sliderObj.isSwipe && !sliderObj.isScroll) {
    let posY = Math.abs(sliderObj.posY2);
    if (posY > 7 || sliderObj.posX2 === 0) {
      sliderObj.isScroll = true;
      sliderObj.allowSwipe = false;
    } else if (posY < 7) {
      sliderObj.isSwipe = true;
    }
  }
  

  if (sliderObj.isSwipe) {
    blockCards(cards);
    
    // запрет ухода влево на первом слайде
    if (slideIndex === 0) {
      if (sliderObj.posInit < sliderObj.posX1) {
        setTransform(transform, 0);
        return;
      } else {
        sliderObj.allowSwipe = true;
      }
    }

    // запрет ухода вправо на последнем слайде
    if (slideIndex === (cardsNumber -1)) {
      if (sliderObj.posInit > sliderObj.posX1) {
        setTransform(transform, sliderObj.lastTrf);
        return;
      } else {
        sliderObj.allowSwipe = true;
      }
    }
    
    // запрет протаскивания дальше одного слайда
    if ((sliderObj.posInit > sliderObj.posX1 && transform < sliderObj.nextTrf) 
      || (sliderObj.posInit < sliderObj.posX1 && transform > sliderObj.prevTrf)) {
      reachEdge(sliderObj);
      return;
    }

    // двигаем слайд
    sliderObj.carousel.style.transform = `translateX(${transform - sliderObj.posX2}px)`;
  }
  console.log("action ending");
  console.log(touchIntro);
  console.log(sliderObj);
  console.log("action ended");
}

function reachEdge(sliderObj) {
  sliderObj.transition = false;
  swipeEnd(sliderObj);
  sliderObj.allowSwipe = true;
}

function swipeEnd(sliderObj) { //delete param
  //let sliderObj = touchIntro;  //comment
  console.log("__", slideIndex);
  console.log("ending starting");
  console.log(touchIntro);
  console.log(sliderObj);
  console.log("ending started");

  console.log("before", sliderObj);

  sliderObj.posFinal = sliderObj.posInit - sliderObj.posX1;

  sliderObj.isScroll = false;
  sliderObj.isSwipe = false;

  console.log(sliderObj.posFinal, sliderObj.isScroll, sliderObj.isSwipe);

  document.removeEventListener('touchmove', swipeAction);
  document.removeEventListener('touchend', swipeEnd);
  //document.removeEventListener('mousemove', swipeAction);
  //document.removeEventListener('mouseup', swipeEnd);

  //sliderList.classList.add('grab');
  //sliderList.classList.remove('grabbing');

  console.log(sliderObj.allowSwipe);

  if (sliderObj.allowSwipe) {
    if (Math.abs(sliderObj.posFinal) > sliderObj.posThreshold) {
      if (sliderObj.posInit < sliderObj.posX1) {
        slideIndex--;
        //leftCard--;
      } else if (sliderObj.posInit > sliderObj.posX1) {
        slideIndex++;
        //leftCard++;
      }
    }

    if (sliderObj.posInit !== sliderObj.posX1) {
      sliderObj.allowSwipe = false;
      slide();
    } else {
      sliderObj.allowSwipe = true;
    }

  } else {
    sliderObj.allowSwipe = true;
  }

  console.log(touchIntro);
  console.log(sliderObj);
}

function slide() {
  if (touchIntro.transition) {
    introCarousel.style.transition = 'transform .5s';
  }
  introCarousel.style.transform = `translateX(-${slideIndex * introCarouselStep}px)`;
}

function setTransform(transform, compareTransform) {
  if (transform >= compareTransform) {
    if (transform > compareTransform) {
      introCarousel.style.transform = `translateX(${compareTransform}px)`;
    }
  }
  touchIntro.allowSwipe = false;
}

introCarousel.addEventListener('transitionend', function() {
  unblockCards(cards);
  touchIntro.allowSwipe = true
});
introCarousel.addEventListener('touchstart', function() {
  swipeStart(touchIntro);
})
//introCarousel.addEventListener('mousedown', swipeStart.bind(null, touchIntro));