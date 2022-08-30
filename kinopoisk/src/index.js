import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './layout/Header/Header';
import Main from './layout/Main/Main';
import Footer from './layout/Footer/Footer';


let pageIter = 1;
let pagesToFetch = 3;
let pageTotalCount = 0;

let mainId = "main-id";

const root = ReactDOM.createRoot(document.getElementById('root'));


fetch(
  `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1`,
  //'./localBase.json',
  {
    method: "GET",
    headers: {
      "X-API-KEY": "109fecb7-71a1-4a6e-a355-a26f2cd3cd52",
      "Content-Type": "application/json",
    },
  }
)
.then((response) => {
  return response.json();
})
.then((actualData) => {
  pageTotalCount = actualData.pagesCount;
  let filmsToRender = actualData.films;
  
  //delete this line; its needed for preventing huge requests amount
  //pageTotalCount =  5;

  root.render(
    <>
      <Header />
      <Main pageIter={pageIter} pagesToFetch={pagesToFetch} filmsToRender={filmsToRender}>
      </Main>
      <Footer />
    </>
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
          <Header />
          <Main pageIter={pageIter} pagesToFetch={pagesToFetch} />
          <Footer />
        </>
      );
    }
    this.setTimeout(function() {
      isRendered = false;
    }, 100);
  }
})
