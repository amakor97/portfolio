import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Card from './components/Card/Card';
import CardsContainer from "./components/CardsContainer/CardsContainer"

import reportWebVitals from './reportWebVitals';


let pageIter = 1;
let pagesToFetch = 3;
let pageTotalCount = 0;


const root = ReactDOM.createRoot(document.getElementById('root'));

fetch(
  `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1`,
  {
    method: "GET",
    headers: {
      "X-API-KEY": "109fecb7-71a1-4a6e-a355-a26f2cd3cd52",
      "Content-Type": "application/json",
    },
  }
)
.then((response) => response.json())
.then((actualData) => {
  pageTotalCount = actualData.pagesCount;
  console.log({pageTotalCount});

  let filmsToRender = actualData.films;
  console.log(filmsToRender);

  
  //delete this line; its needed for preventing huge amount of requests
  pageTotalCount =  5;

  root.render(
    <CardsContainer pageIter={pageIter} pagesToFetch={pagesToFetch}
    filmsToRender={filmsToRender}/>
  );

  pageIter = 3;
  pagesToFetch = 1;
});


let isRendered = false;

window.addEventListener("scroll", function() {
  if (this.window.innerHeight + this.window.scrollY 
    >= (this.document.body.scrollHeight - 200)) {
    console.log("bottom!");
    if ((pageIter < pageTotalCount) && !isRendered) {
      pageIter++;
      isRendered = true;
      root.render(
        <>
          <CardsContainer pageIter={pageIter} pagesToFetch={pagesToFetch}/>
        </>
      );
    }
    this.setTimeout(function() {
      isRendered = false;
    }, 100);
  }
})


reportWebVitals();
