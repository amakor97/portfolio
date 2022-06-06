import { useState, useEffect } from "react";

import Card from "../Card/Card";

import "./_cardsContainer.sass";

function CardsContainer(props) {
  let [filmsArray, setFilmsArray] = useState([]);
  
  console.log("page iter: ", props.pageIter);
  console.log("to fetch: ", props.pagesToFetch);

  let inter = 100;
  let tmpArray = [];
  
  useEffect(() => {
    let pgIter = props.pageIter;
    console.log({pgIter});
    for (let i = pgIter; i < pgIter + props.pagesToFetch; i++) {
      let tmpTimeout = setTimeout(async function() {
        const response = await fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${i}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": "109fecb7-71a1-4a6e-a355-a26f2cd3cd52",
              "Content-Type": "application/json",
            },
          }
        );
        const json = await response.json();
        console.log(json);
        tmpArray = tmpArray.concat(filmsArray, json.films);
        console.log(tmpArray);
        setFilmsArray(tmpArray);
        console.log({pgIter});
      }, inter);
      inter += 100;
    }
  }, [props.pageIter])


  return (
    <div className="CardsContainer">
      {
        filmsArray && filmsArray.map(function(film) {
          return (
            <Card key={film.nameRu} nameRu={film.nameRu} />
          )
        })
      }
    </div>
  )
}

export default CardsContainer;