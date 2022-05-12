"use strict";

import { createBestsellersCard } from "./fillers/bestsellers-filler.js";

const introPrevBtn = document.querySelector(".js-intro-carousel-prev-btn");
const introNextBtn = document.querySelector(".js-intro-carousel-next-btn");
const introCarousel = document.querySelector(".js-intro-carousel-inner");

let cardsNumber = 7;



const cardInnerWidth = window.innerWidth >= 768 ? 230 : 220;
const cardMargin = 30;

const introCarouselFullWidth = (cardsNumber > 0) ? cardInnerWidth + (cardInnerWidth + cardMargin)*(cardsNumber - 1) : 0;
console.log(introCarouselFullWidth);

introCarousel.style.width = introCarouselFullWidth + "px";

const introCarouselStep = cardInnerWidth + cardMargin;
console.log(introCarouselStep);
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
    console.log({slideIndex});
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
  console.log(dataObj);
  const main = document.querySelector(".main");
  for (let i = 0; i < cardsNumber; i++) {
    let card = createBestsellersCard(dataObj[i]);
    main.appendChild(card);
    introCarousel.appendChild(card);
  }

  cards = document.querySelectorAll(".intro-card");
  console.log(cards);
  
  cards.forEach(function(card) {
    //card.e.preventDefault();
  })

});



/// touch

function getEvent() {
  console.log(event);
  return (event.type.search('touch') !== -1) ? event.touches[0] : event;
}

let touchIntro = {
  allowSwipe: true,
  transition: true,
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

function swipeStart() {
  let evt = getEvent();
  console.log(touchIntro.allowSwipe);

  if (touchIntro.allowSwipe) {

    touchIntro.transition = true;

    touchIntro.nextTrf = (slideIndex + 1) * -introCarouselStep;
    touchIntro.prevTrf = (slideIndex - 1) * -introCarouselStep;

    touchIntro.posInit = touchIntro.posX1 = evt.clientX;
    touchIntro.posY1 = evt.clientY;
    //console.log({touchIntro.posInit, posX1, touchIntro.posY1});

    
    introCarousel.style.transition = '';

    
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
  console.log({transform});
  
  touchIntro.posX2 = touchIntro.posX1 - evt.clientX;
  touchIntro.posX1 = evt.clientX;

  touchIntro.posY2 = touchIntro.posY1 - evt.clientY;
  touchIntro.posY1 = evt.clientY;
  //console.log({touchIntro.posX2, touchIntro.posY2});

  
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
    console.log({cardsNumber});
    // запрет ухода вправо на последнем слайде
    if (slideIndex === (cardsNumber -1)) {
      console.log({cardsNumber});
      console.log({slideIndex});
      if (touchIntro.posInit > touchIntro.posX1) {
        setTransform(transform, touchIntro.lastTrf);
        return;
      } else {
        touchIntro.allowSwipe = true;
      }
    }
    
    
    // запрет протаскивания дальше одного слайда
    if (touchIntro.posInit > touchIntro.posX1 && transform < touchIntro.nextTrf || touchIntro.posInit < touchIntro.posX1 && transform > touchIntro.prevTrf) {
      reachEdge();
      return;
    }

    // двигаем слайд
    introCarousel.style.transform = `translateX(${transform - touchIntro.posX2}px)`;
  }
  //console.log({touchIntro.allowSwipe});
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

  //prev.classList.toggle('disabled', slideIndex === 0);
  //next.classList.toggle('disabled', slideIndex === --slides.length);
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
introCarousel.addEventListener('touchstart', swipeStart);
introCarousel.addEventListener('mousedown', swipeStart);