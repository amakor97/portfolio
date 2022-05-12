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
    let transform = +style.match(trfRegExp)[0];
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
    let transform = +style.match(trfRegExp)[0];
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
  console.log({allowSwipe});

  if (allowSwipe) {

    transition = true;

    nextTrf = (slideIndex + 1) * -introCarouselStep;
    prevTrf = (slideIndex - 1) * -introCarouselStep;
    //console.log({nextTrf});
    //console.log({prevTrf});

    posInit = posX1 = evt.clientX;
    posY1 = evt.clientY;
    console.log({posInit, posX1, posY1});

    
    introCarousel.style.transition = '';

    
    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mouseup', swipeEnd);
 
    /*
    sliderList.classList.remove('grab');
    sliderList.classList.add('grabbing');*/
  }
}

function swipeAction() {

  let evt = getEvent();
  let style = introCarousel.style.transform;
  let transform = +style.match(trfRegExp)[0];
  console.log({transform});
  
  posX2 = posX1 - evt.clientX;
  posX1 = evt.clientX;

  posY2 = posY1 - evt.clientY;
  posY1 = evt.clientY;
  //console.log({posX2, posY2});

  
  // определение действия свайп или скролл
  if (!isSwipe && !isScroll) {
    let posY = Math.abs(posY2);
    console.log({posX2, posY});
    if (posY > 7 || posX2 === 0) {
      isScroll = true;
      allowSwipe = false;
    } else if (posY < 7) {
      isSwipe = true;
    }
  }
  console.log({isSwipe, isScroll});
  

  if (isSwipe) {
    blockCards(cards);
    
    // запрет ухода влево на первом слайде
    
    if (slideIndex === 0) {
      if (posInit < posX1) {
        setTransform(transform, 0);
        return;
      } else {
        allowSwipe = true;
      }
    }
    console.log({cardsNumber});
    // запрет ухода вправо на последнем слайде
    if (slideIndex === (cardsNumber -1)) {
      console.log({cardsNumber});
      console.log({slideIndex});
      if (posInit > posX1) {
        setTransform(transform, lastTrf);
        return;
      } else {
        allowSwipe = true;
      }
    }
    
    
    // запрет протаскивания дальше одного слайда
    if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
      reachEdge();
      return;
    }

    // двигаем слайд
    introCarousel.style.transform = `translateX(${transform - posX2}px)`;
  }
  //console.log({allowSwipe});
}

function reachEdge() {
  transition = false;
  swipeEnd();
  allowSwipe = true;
}

function swipeEnd() {
  posFinal = posInit - posX1;

  isScroll = false;
  isSwipe = false;

  document.removeEventListener('touchmove', swipeAction);
  document.removeEventListener('mousemove', swipeAction);
  document.removeEventListener('touchend', swipeEnd);
  document.removeEventListener('mouseup', swipeEnd);

  //sliderList.classList.add('grab');
  //sliderList.classList.remove('grabbing');

  if (allowSwipe) {
    if (Math.abs(posFinal) > posThreshold) {
      if (posInit < posX1) {
        slideIndex--;
        leftCard--;
      } else if (posInit > posX1) {
        slideIndex++;
        leftCard++;
      }
    }

    if (posInit !== posX1) {
      allowSwipe = false;
      slide();
    } else {
      allowSwipe = true;
    }

  } else {
    allowSwipe = true;
  }

}

function slide() {
  if (transition) {
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
  allowSwipe = false;
}

introCarousel.addEventListener('transitionend', function() {
  unblockCards(cards);
  allowSwipe = true
});
introCarousel.addEventListener('touchstart', swipeStart);
introCarousel.addEventListener('mousedown', swipeStart);