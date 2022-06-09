import { useState, useEffect, useRef } from "react";

import Card from "../Card/Card";

import "./_cardsContainer.sass";

function CardsContainer(props) {
  let [filmsArray, setFilmsArray] = useState([]);

  console.log(props);

  const renderedPages = useRef(0);
  //const renderedCards = useRef(0);

  let renderedCards = 0;

  //let inter = 100;
  //let inter = 0;
  
  useEffect(() => {
    let tmpArray = [];
    let inter = 0;

    let pgIter = props.pageIter;
    for (let i = pgIter; i < pgIter + props.pagesToFetch; i++) {
      
      renderedPages.current = renderedPages.current + 1;
      console.log("RENDERED TIMES:", renderedPages.current);

      if ((renderedPages.current === 1) && (props.filmsToRender)) {
        tmpArray = tmpArray.concat(filmsArray, props.filmsToRender);
        setFilmsArray(tmpArray);
      } else {
        setTimeout(async function() {
          fetch(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${i}`,
            {
              method: "GET",
              headers: {
                "X-API-KEY": "109fecb7-71a1-4a6e-a355-a26f2cd3cd52",
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => response.json())
          .then((json) => {
            tmpArray = tmpArray.concat(filmsArray, json.films);
            setFilmsArray(tmpArray);
          })
        }, inter);
      }
      inter += 100;
    }
  }, [props.pageIter])


  return (
    <div className="CardsContainer">
      {
        filmsArray && filmsArray.map(function(film) {
          renderedCards = renderedCards + 1;
          console.log("cards", renderedCards.current);

          return (
            <Card key={film.nameRu} nameRu={film.nameRu} 
            posterUrlPreview={film.posterUrlPreview} filmId={film.filmId} cardNumber={renderedCards}
            />
          )
        })
      }
    </div>
  )
}

export default CardsContainer;