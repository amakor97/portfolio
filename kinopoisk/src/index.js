import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Card from './components/Card/Card';
import CardsContainer from "./components/CardsContainer/CardsContainer"

import reportWebVitals from './reportWebVitals';


let pageIter = 1;
let pagesToFetch = 3;
let pageTotalCount = 0;


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
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CardsContainer pageIter={pageIter} pagesToFetch={pagesToFetch}/>
  </React.StrictMode>
);


pageIter = 3;
pagesToFetch = 1;

window.addEventListener("scroll", function() {
  if (this.window.innerHeight + this.window.scrollY 
    >= this.document.body.scrollHeight) {
    console.log("bottom!");
    if (pageIter < pageTotalCount) {
      pageIter++;
      root.render(
        <>
          <CardsContainer pageIter={pageIter} pagesToFetch={pagesToFetch}/>
        </>
      );
    }
  }
})


reportWebVitals();
