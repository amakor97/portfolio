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
  let evt = getEvent();

  if (sliderObj.allowSwipe) {
    sliderObj.transition = true;

    sliderObj.nextTrf = (slideIndex + 1) * -sliderObj.step;
    sliderObj.prevTrf = (slideIndex - 1) * -sliderObj.step;

    sliderObj.posInit = sliderObj.posX1 = evt.clientX;
    sliderObj.posY1 = evt.clientY;
    
    sliderObj.carousel.style.transition = '';
    
    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mouseup', swipeEnd);
  }
}

function swipeAction() {
  let evt = getEvent();
  let style = introCarousel.style.transform;
  let transform = +style.match(touchIntro.trfRegExp)[0];
  
  touchIntro.posX2 = touchIntro.posX1 - evt.clientX;
  touchIntro.posX1 = evt.clientX;

  touchIntro.posY2 = touchIntro.posY1 - evt.clientY;
  touchIntro.posY1 = evt.clientY;

  
  // определение действия свайп или скролл
  if (!touchIntro.isSwipe && !touchIntro.isScroll) {
    let posY = Math.abs(touchIntro.posY2);
    //console.log({touchIntro.posX2, posY});
    if (posY > 7 || touchIntro.posX2 === 0) {
      touchIntro.isScroll = true;
      touchIntro.allowSwipe = false;
    } else if (posY < 7) {
      touchIntro.isSwipe = true;
    }
  }
  //console.log({touchIntro.isSwipe, touchIntro.isScroll});
  

  if (touchIntro.isSwipe) {
    blockCards(cards);
    
    // запрет ухода влево на первом слайде
    if (slideIndex === 0) {
      if (touchIntro.posInit < touchIntro.posX1) {
        setTransform(transform, 0);
        return;
      } else {
        touchIntro.allowSwipe = true;
      }
    }

    // запрет ухода вправо на последнем слайде
    if (slideIndex === (cardsNumber -1)) {
      if (touchIntro.posInit > touchIntro.posX1) {
        setTransform(transform, touchIntro.lastTrf);
        return;
      } else {
        touchIntro.allowSwipe = true;
      }
    }
    
    // запрет протаскивания дальше одного слайда
    if (touchIntro.posInit > touchIntro.posX1 && transform < touchIntro.nextTrf 
      || touchIntro.posInit < touchIntro.posX1 && transform > touchIntro.prevTrf) {
      reachEdge();
      return;
    }

    // двигаем слайд
    introCarousel.style.transform = `translateX(${transform - touchIntro.posX2}px)`;
  }
}

function reachEdge() {
  touchIntro.transition = false;
  swipeEnd();
  touchIntro.allowSwipe = true;
}

function swipeEnd() {
  touchIntro.posFinal = touchIntro.posInit - touchIntro.posX1;

  touchIntro.isScroll = false;
  touchIntro.isSwipe = false;

  document.removeEventListener('touchmove', swipeAction);
  document.removeEventListener('mousemove', swipeAction);
  document.removeEventListener('touchend', swipeEnd);
  document.removeEventListener('mouseup', swipeEnd);

  //sliderList.classList.add('grab');
  //sliderList.classList.remove('grabbing');

  if (touchIntro.allowSwipe) {
    if (Math.abs(touchIntro.posFinal) > touchIntro.posThreshold) {
      if (touchIntro.posInit < touchIntro.posX1) {
        slideIndex--;
        leftCard--;
      } else if (touchIntro.posInit > touchIntro.posX1) {
        slideIndex++;
        leftCard++;
      }
    }

    if (touchIntro.posInit !== touchIntro.posX1) {
      touchIntro.allowSwipe = false;
      slide();
    } else {
      touchIntro.allowSwipe = true;
    }

  } else {
    touchIntro.allowSwipe = true;
  }

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
introCarousel.addEventListener('touchstart', swipeStart.bind(null, touchIntro));
introCarousel.addEventListener('mousedown', swipeStart.bind(null, touchIntro));